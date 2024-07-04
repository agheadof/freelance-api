const express = require("express");
const itemsController = require("./items.controller");
const { uploadFiles } = require("../../utils/upload_files");

const router = express.Router();

router.post("/getItems", itemsController.getItems);

router.post("/getFreelancerItems", itemsController.getFreelancerItems);

router.post(
  "/addItem",
  uploadFiles("Items").single("itemImage"),
  itemsController.addItem
);

router.post(
  "/editItem/:itemId",
  uploadFiles("Items").single("itemImage"),
  itemsController.editItem
);

router.post("/deleteItem/:itemId", itemsController.deleteItem);

module.exports = router;
