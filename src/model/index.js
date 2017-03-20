var db = require('../db/index.js');

module.exports = {

  results: {
    get: function (parms, callback) {
      // expect pars to be [maintitle: '']
      // var queryStr = 'select * from resultsItems where maintitle = ? ;';
      // db.dbConnection.query(queryStr, params, function(err, results){
      //   callback(err, results);
      // });
    },
    post: function (params, callback) {
      // post google api results into results table
      // expect params to be [maintitle: '', title: '', link: '', pubdate: '', description: '']
      var queryStr = 'insert into resultsItems(maintitle, title, link, pubdate, description) \
                      values (?, ?, ?, ?, ?)';
      db.dbConnection.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },

  messages: {
    get: function (params, callback) {
      // fetch all messages
      // id , userid, msgtext, msgtime
      console.log("params", params)

      var queryStr = 'select messages.id, users.name, messages.msgtext, messages.msgtime \
                      from messages left outer join users on (messages.userid = users.id) \
                      where messages.maintitle = ? order by messages.id desc;';
      db.dbConnection.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      // create a message for a user id based on the given username
      // expect params to be {maintitle: '', name(from users): '', msgtext: ''}
      var queryStr = 'insert into messages(userid, maintitle, msgtext, msgtime) \
                      values ((select id from users where name = ? limit 1), ?, ?, now())';
      db.dbConnection.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },
  users: {
    get: function (callback) {
      // fetch all users
      //id, googleid, name, email, img
      var queryStr = 'select * from users';
      db.dbConnection.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      // create a user
      // expect params to be {googleid: '', name: '', email: '', img: ''}
      var queryStr = 'insert into users(googleid, name, email, img) values (?, ?, ?, ?)';
      db.dbConnection.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },

  trends: {
    get: function(callback) {
      var queryStr = 'SELECT * FROM trends';
      db.dbConnection.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      var queryStr = 'INSERT INTO trends (trend) VALUES (?)'
      db.dbConnection.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }

  }

  };
