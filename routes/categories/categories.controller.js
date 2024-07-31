const Category = require("../../models/categories/category.model");

async function getCategories(req, res, next) {
  try {
    const result = await Category.getCategories();

    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function addCategory(req, res, next) {
  try {
    const data = req.body;
    const image = req.file.path.replace(/\\/g, '/');

    await Category.addCategory(data.name, image);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function editCategory(req, res, next) {
  try {
    const data = req.body;
    let image;

    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }

    await Category.editCategory(req.params.categoryId, data.name, image);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await Category.deleteCategory(req.params.categoryId);

    res.sendStatus(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
}

module.exports = {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
