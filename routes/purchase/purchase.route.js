const express = require("express");
const purchaseController = require("./purchase.controller");

const router = express.Router();

router.post("/getPurchases", purchaseController.getPurchases);

router.post("/makePurchase", purchaseController.makePurchase);

module.exports = router;
