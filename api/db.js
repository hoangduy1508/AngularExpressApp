"use strict";
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_api",
});

//Tiến hàng kết nối
db.connect(function(err) {
  if (err) ;
  //Kết nôi thành công
  console.log("Connected!");


});

module.exports = db;
