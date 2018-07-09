let loadAllItems = require('../src/items');
let loadPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
  let buyItemsList = getBuyItemsList(selectedItems, loadAllItems());
  let promotionPrice = countPromotionPrice(buyItemsList, loadPromotions());
  return makeReceipt(buyItemsList, promotionPrice);
}

function getBuyItemsList(buyItemsIdNums, allItems) {
  return buyItemsIdNums.map(buyItemsIdNum => {
    let item = allItems.find(allItem => buyItemsIdNum.split(' x ')[0] === allItem.id);
    item.num = parseInt(buyItemsIdNum.split(' x ')[1]);
    return item;
  });
}

function countPromotionPrice(buyItemsList, promotions) {
  let promotionPrice = {promotion:'', savedprice:0, finalprice:0};
  let second = false;
  for (let i of buyItemsList) {
    promotionPrice.finalprice += i.price * i.num;
    for (let j of promotions[1].items) {
      if (i.id === j) {
        second = true;
        promotionPrice.promotion += i.name + '，';
        promotionPrice.savedprice += i.price * i.num / 2;
        break;
      }
    }
  }
  if (second) {
    promotionPrice.promotion = promotionPrice.promotion.slice(0,promotionPrice.promotion.length - 1);
    promotionPrice.promotion = '指定菜品半价(' + promotionPrice.promotion + ')';
  }
  if (promotionPrice.finalprice >= 30 && promotionPrice.savedprice < 6) {
    promotionPrice.promotion = promotions[0].type;
    promotionPrice.savedprice = 6;
  }
  promotionPrice.finalprice -= promotionPrice.savedprice;
  return promotionPrice;
}

function makeReceipt(buyItemsList, promotionPrice) {
  let receipt = '============= 订餐明细 =============\n';
  for (let i of buyItemsList) {
    receipt += i.name + ' x ' + i.num + ' = ' + i.price * i.num + '元\n';
  }
  receipt += '-----------------------------------\n';
  if (promotionPrice.savedprice != 0) {
    receipt += '使用优惠:\n';
    receipt += promotionPrice.promotion + '，省' + promotionPrice.savedprice + '元\n';
    receipt += '-----------------------------------\n';
  }
  receipt += '总计：' + promotionPrice.finalprice + '元\n';
  receipt += '===================================';
  return receipt;
}

module.exports = {
  bestCharge,
  getBuyItemsList,
  countPromotionPrice,
  makeReceipt
}