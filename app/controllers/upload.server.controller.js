var fs = require('fs');
var parse = require('csv-parse');
var User = require('mongoose').model('User');

exports.render = function(req, res) {
  res.render('upload', {
    title: 'Upload Contacts',
  });
};

exports.acceptData = function(req, res) {
  req.pipe(req.busboy);
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

  



  req.busboy.on('file', function(fieldname, file, filename) {
    fs.createReadStream(filename).pipe(parser);
  });
  res.render('upload', {
    title: 'Upload Contacts',
  });
};