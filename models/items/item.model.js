const Item = require("./item.mongo");

async function getItems() {

  const items = await Item.find();

  return {
    items: items,
  };
}

async function getFreelancerItems(userId) {
  const filter = {
      user: userId,
    },
    empty = {};

  const items = await Item.find(filter, empty, empty).sort({ _id: -1 });

  return {
    items: items,
  };
}

async function addItem(name, image, description, prise, user) {
  const itemData = { name, image, description, prise, user };

  const item = new Item(itemData);

  const result = await item.save();

  return {
    newItem: result,
  };
}

async function editItem(itemId, name, image, description, prise) {
  const filter = {
      _id: itemId,
    },
    empty = {},
    newData = {};

  if (name) {
    newData.name = name;
  }

  if (image) {
    newData.image = image;
  }

  if (description) {
    newData.description = description;
  }

  if (prise) {
    newData.prise = prise;
  }

  await Item.updateOne(filter, newData, empty);
}

async function deleteItem(itemId) {
  const filter = {
      _id: itemId,
    },
    empty = {};

  await Item.deleteOne(filter, empty);
}

module.exports = {
  getItems,
  getFreelancerItems,
  addItem,
  editItem,
  deleteItem,
};
