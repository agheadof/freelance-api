const User = require("../users/user.model");
const User_m = require("../users/user.mongo");
const Item = require("../items/item.mongo");
const Purchase = require("./purchase.mongo");

async function getPurchases(userId) {
  const filter = {
    user: userId,
  },
    empty = {};

  const purchases = await Purchase.find(filter, empty, empty).sort({ _id: -1 });

  return {
    purchases: purchases,
  };
}

async function makePurchase(itemId, userId) {
  const filter = {
    _id: itemId,
  },
    empty = {};
  let user = await User_m.findOne({ _id: userId }, empty, empty);
  let item = await Item.findOne(filter, empty, empty);


  let userBalance = user.balance;
  let freelancerId = item.user;
  let name = item.name;
  let prise = item.prise;

  if (userBalance > prise) {
    try {
      let userBalance = await User.updateBalance(userId, prise, "-");
      let flBalance = await User.updateBalance(freelancerId, prise, "+");

      const purchaseData = { name, prise, user: userId };

      const purchase = new Purchase(purchaseData);

      const result = await purchase.save();

      return {
        newPurchase: result,
        userBalance: userBalance,
        flBalance: flBalance
      };
    }
    catch {

      return Error
    }
  }

}

module.exports = { getPurchases, makePurchase };
