let best_charge = require('../src/best-charge');
let bestCharge = best_charge.bestCharge;
let getBuyItemsList = best_charge.getBuyItemsList;
let countPromotionPrice = best_charge.countPromotionPrice;
let loadAllItems = require('../src/items');
let loadPromotions = require('../src/promotions');

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});

describe('Take out food', function () {

  it('getBuyItemsList(buyItemsIdNum, allItems) testing', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = getBuyItemsList(inputs, loadAllItems());
    let expected = `[{"id":"ITEM0001","name":"黄焖鸡","price":18,"num":1},{"id":"ITEM0013","name":"肉夹馍","price":6,"num":2},{"id":"ITEM0022","name":"凉皮","price":8,"num":1}]`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

  it('getBuyItemsList(buyItemsIdNum, allItems) testing', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = getBuyItemsList(inputs, loadAllItems());
    let expected = `[{"id":"ITEM0013","name":"肉夹馍","price":6,"num":4},{"id":"ITEM0022","name":"凉皮","price":8,"num":1}]`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

  it('getBuyItemsList(buyItemsIdNum, allItems) testing', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = getBuyItemsList(inputs, loadAllItems());
    let expected = `[{"id":"ITEM0013","name":"肉夹馍","price":6,"num":4}]`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

});

describe('Take out food', function () {

  it('countPromotionPrice(buyItemsList, promotions) testing', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = countPromotionPrice(getBuyItemsList(inputs, loadAllItems()),loadPromotions());
    let expected = `{"promotion":"指定菜品半价(黄焖鸡，凉皮)","savedprice":13,"finalprice":25}`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

  it('countPromotionPrice(buyItemsList, promotions) testing', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = countPromotionPrice(getBuyItemsList(inputs, loadAllItems()),loadPromotions());
    let expected = `{"promotion":"满30减6元","savedprice":6,"finalprice":26}`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

  it('countPromotionPrice(buyItemsList, promotions) testing', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = countPromotionPrice(getBuyItemsList(inputs, loadAllItems()),loadPromotions());
    let expected = `{"promotion":"","savedprice":0,"finalprice":24}`.trim()
    expect(JSON.stringify(summary)).toEqual(expected)
  });

});