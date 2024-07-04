const Purchase = require("../../models/purchases/purchase.model");


async function getPurchases(req, res, next) {
    try {
      const data = req.body;
  
      const result = await Purchase.getPurchases(data.userId);
  
      res.status(200).json({ result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
  
      next(err);
    }
  }
  
  async function makePurchase(req, res, next) {
    try {
      const data = req.body;
  
      await Purchase.makePurchase(data.itemId, data.userId);
  
      res.sendStatus(200);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.send("no effecient amount !!")
    }
  }

  module.exports = {
    getPurchases,
    makePurchase
  };