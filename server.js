var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res) {
  res.send('Welcome from web scrapper. Go to /scrape route for scrapping content');
})

app.get('/scrape', function(req, res) {
  var url = "http://www.charleskeith.com/catalog/shoes";

  request(url, function(error, response, html){
    if(error) {
      res.send('error');
      return;
    }
    var $ = cheerio.load(html);
    var items = $('.products-grid .item');
    var result = [];
    for(var i = 0 , len = items.length ; i < len ; i++) {
      var currentEle = $(items[i]);
      var product = {
        productUrl: currentEle.children('.product-image').attr('href'),
        productImage: currentEle.find('img').attr('src'),
        productAttribute: currentEle.find('.product-attribute-label').text(),
        productName: currentEle.find('.product-name').children('a').text(),
      }
      result.push(product);
    }
    res.json(result);
    //res.send(html);
  })
})

app.listen('8081');

console.log('server listen')

exports = module.exports = app;
