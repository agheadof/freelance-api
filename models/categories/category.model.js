const Category = require("./category.mongo");

async function getCategories() {
  const filter = {},
    empty = {};

  const categories = await Category.find(filter, empty, empty).sort({
    _id: -1,
  });

  return {
    categories: categories,
  };
}

async function addCategory(name, image) {
  const categoryData = { name, image };

  const category = new Category(categoryData);

  const result = await category.save();

  return {
    newCategory: result,
  };
}

async function editCategory(categoryId, name, image) {
  const filter = {
      _id: categoryId,
    },
    empty = {},
    newData = {};

  if (name) {
    newData.name = name;
  }

  if (image) {
    newData.image = image;
  }

  await Category.updateOne(filter, newData, empty);
}

async function deleteCategory(categoryId) {
  const filter = {
      _id: categoryId,
    },
    empty = {};

  await Category.deleteOne(filter, empty);
}

module.exports = {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
