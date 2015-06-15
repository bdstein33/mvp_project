// xlsx = require('xlsx');

// var data = xlsx.readFile('data.csv');
// console.log(data);

var fs = require('fs');
var parse = require('csv-parse');
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
var User = require('mongoose').model('User');

var results = []
var first_name_col = 1;
var last_name_col = 3;
var email_col = 5;
var company_col = 29;
var job_title_col = 31

var parser = parse({delimiter: ','}, function(err, data) {
  var obj = {};

  for (var i = 1; i < data.length - 1; i++) {
    var searchText = ["linkedin"];
    searchText.push(data[i][first_name_col]);
    searchText.push(data[i][last_name_col]);
    // searchText.push(data[i][email_col]);
    searchText.push(data[i][company_col]);
    searchText.push(data[i][job_title_col]);
    console.log(searchText.join(" "));
  }
  
});

fs.createReadStream(__dirname + '/data.csv').pipe(parser);

User.findOne({firstName: 'Ben'}, function(err,obj) { console.log(obj); });