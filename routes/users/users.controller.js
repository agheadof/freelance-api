const User = require("../../models/users/user.model");
const bcrypt = require("bcryptjs")


async function login(req, res, next) {
  try {
    const data = req.body;

    const result = await User.login(data.phoneNumber, data.password);

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const data = req.body;

    const result = await User.getUsers(data.category);

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function signUp(req, res, next) {

  const data = req.body;
  
  let name = data.name
  let phoneNumber = data.phoneNumber
  let password = data.password
  let type = data.type
  let category = data.category

  // Hashing the password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
  try {
    
    const result = await User.signUp(
      name,
      phoneNumber,
      hashedPassword,
      type,
      category
    );

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const data = req.body;

  let name = data.name
  let phoneNumber = data.phoneNumber
  let password = data.password
  let type = data.type
  let category = data.category

    if(password){
      // Hashing the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      password = hashedPassword
    }
    

    const result = await User.editUser(
      req.params.userId,
      name,
      phoneNumber,
      password,
      type,
      category
    );


    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function rateUser(req, res, next) {
  try {
    const data = req.body;

    const result = await User.rateUser(req.params.userId, data.rating);

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await User.deleteUser(req.params.userId);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function updateBalance(req, res, next) {
  try {
    const data = req.body;

    const result = await User.updateBalance(req.params.userId, data.balance);

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

module.exports = {
  login,
  getUsers,
  editUser,
  signUp,
  rateUser,
  deleteUser,
  updateBalance,
};
