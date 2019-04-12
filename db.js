const Mock = require('mockjs');
const _ = require('lodash');

module.exports = function () {
  return {
    product: _.times(6, function (n) { // 一个接口,可以放多个
      return {
        id: n,
        count:0,
        name: Mock.Random.cname(),
        img: Mock.Random.image('200x200', Mock.Random.color()),
        text: Mock.Random.cparagraph(),
        time: Mock.Random.date('yyyy-MM-dd'),
        price: Mock.mock({
          'number|1-100': 100
        })
      }
    }),
    bannerlist: _.times(5, function (n) { // 一个接口,可以放多个
      return {
        id: n,
        name: Mock.Random.cname(),
        img: Mock.Random.image('700x300', Mock.Random.color()),
        text: Mock.Random.cparagraph(),
        time: Mock.Random.date('yyyy-MM-dd'),
      }
    })
  }
}