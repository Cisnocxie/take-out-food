function bestCharge(selectedItems) {

  return /*TODO*/;
}

function getBuyItemsList(buyItemsIdNum, allItems) {
  let buyItemsList = [];
  let allItemsCopy = JSON.parse(JSON.stringify(allItems));
  for (let i of buyItemsIdNum) {
    for (let j of allItemsCopy) {
      if (i.slice(0,8) === j.id) {
        j.num = parseInt(i.slice(11));
        buyItemsList.push(j);
        break;
      }
    }
  }
  return buyItemsList;
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

module.exports = {
  bestCharge,
  getBuyItemsList,
  countPromotionPrice
}