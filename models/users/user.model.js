const User = require("./user.mongo");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken")


async function login(phoneNumber, password) {
  const filter = {
    phoneNumber: phoneNumber,
  };

  const user = await User.findOne(filter, {}, {});

  if (!user) {
    const error = new Error("No Account Found");
    error.statusCode = 401;

    throw error;
  }

  const areEqual = await bcrypt.compare(password.toString(), user.password);

  if (!areEqual) {
    const error = new Error("Wrong Password");
    error.statusCode = 401;

    throw error;
  }

  const payload = {
    ...user._doc,
  };

  delete payload.password;
  delete user.password;
  delete payload.__v;
  delete payload.createdAt;
  delete payload.updatedAt;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "30d",
  });

  return {
    token: token,
    user: user,
  };
}

async function getUsers(category) {
  const filter = { type: "FREELANCER", category },
    empty = {};

  const users = await User.find(filter, empty, empty).sort({ _id: -1 });

  return {
    users: users,
  };
}

async function signUp(name, phoneNumber, password, type, category) {
  const userData = { name, phoneNumber, password, type, category };

  const user = new User(userData);

  const result = await user.save();

  return {
    newUser: result,
  };
}

async function editUser(userId, name, phoneNumber, password, type, category) {
  const filter = {
    _id: userId,
  },
    empty = {},
    newData = {};

  if (name) {
    newData.name = name;
  }

  if (phoneNumber) {
    newData.phoneNumber = phoneNumber;
  }

  if (password) {
    newData.password = password;
  }

  if (type) {
    newData.type = type;
  }

  if (category) {
    newData.category = type;
  }

  await User.updateOne(filter, newData, empty);
}

async function rateUser(userId, rating) {
  const filter = {
    _id: userId,
  },
    empty = {};

  const user = await User.find(filter, {}, {});

  if (!user.rating) {
    user.rating = 0;
  }

  const newRating = (user.rating + rating) / 2;

  const newData = {
    rating: newRating,
  };

  await User.updateOne(filter, newData, empty);
}

async function deleteUser(userId) {
  const filter = {
    _id: userId,
  },
    empty = {};

  await User.deleteOne(filter, empty);
}

async function updateBalance(userId, balance, operation) {
  const filter = {
    _id: userId,
  },
    empty = {};

  const user = await User.findOne(filter, {}, {});
  let newBalance = user.balance

  if (operation === '+' || !operation) {
    newBalance = (user.balance + Number(balance));
  }

  else if (operation === '-') {
    newBalance = (user.balance - Number(balance));
  }


  const newData = {
    balance: newBalance,
  };
  await User.updateOne(filter, newData, empty);
  return newBalance
}



module.exports = {
  getUsers,
  rateUser,
  signUp,
  login,
  editUser,
  deleteUser,
  updateBalance,

};
