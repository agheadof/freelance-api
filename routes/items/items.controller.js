const Item = require("../../models/items/item.model");

async function getItems(req, res, next) {
  try {
    const result = await Item.getItems();

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function getFreelancerItems(req, res, next) {
  try {
    const data = req.body;

    const result = await Item.getFreelancerItems(data.userId);

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const data = req.body;
    const image = req.file.path;

    await Item.addItem(data.name, image, data.description, data.prise, data.userId);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function editItem(req, res, next) {
  try {
    const data = req.body;
    let image;

    if (req.file) {
      image = req.file.path;
    }

    await Item.editItem(
      req.params.itemId,
      data.name,
      image,
      data.description,
      data.prise,
      data.userId
    );

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    await Item.deleteItem(req.params.itemId);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

module.exports = {
  getItems,
  getFreelancerItems,
  addItem,
  editItem,
  deleteItem,
};
