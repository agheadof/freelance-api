const express = require("express");
const categoriesController = require("./categories.controller");
const { uploadFiles } = require("../../utils/upload_files");

const router = express.Router();

router.post("/getCategories", categoriesController.getCategories);

router.post(
  "/addCategory",
  uploadFiles("Categories").single("categoryImage"),
  categoriesController.addCategory
);

router.post(
  "/editCategory/:categoryId",
  uploadFiles("Categories").single("categoryImage"),
  categoriesController.editCategory
);

router.post("/deleteCategory/:categoryId", categoriesController.deleteCategory);

module.exports = router;
