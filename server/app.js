var express = require("express");
var bodyParser = require("body-parser");
var { db } = require("./db/db.json");
var app = express();
// 模拟已有用户和密码
// 创建中间键
var jsonParser = bodyParser.json();
// 登陆接口
app.post("/login", jsonParser, function(req, res) {
  var username = req.body.username.toString();
  var password = req.body.password.toString();
  var basetoken = "";
  var rolesRights = [];
  var passName = '';
  var info = db.find(item => {
    var { name, word } = item;
    return username == name && password == word;
  });
  console.log(info);
  if (info) {
    var { name, token, rights } = info;
    basetoken = token;
    rolesRights = rights;
    passName = name;
    //   登陆成功
    return res.send({
      status: 200,
      message: "欢迎登陆索莱宝后台",
      token: basetoken,
      rights: rolesRights,
      name:passName
    });
  } else {
    // 登陆失败
    res.send({
      status: 400,
      message: "用户名或密码错误"
    });
  }
});
app.use(express.static("./data"));
app.listen(3000, function() {
  console.log("端口号3000，连接上了");
});
