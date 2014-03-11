'use strict';

var User = require('../models/User');

exports.collection = function(req, res){
  res.setHeader('Content-type', 'application/json');
  User.find({}, function(err, users){
    if(err){
      res.writeHead(500);
      res.send({'error': err});
    }else{
      res.send(users);
    }
  });
};

exports.createUser = function(req, res){
  res.setHeader('Content-type', 'application/json');
  var user = new User(req.body);
  user.save(function(err, resUser){
    if(err){
      res.writeHead(500);
      res.send({'error':err});
    }else{
      res.send(resUser);
    }
  });
};
