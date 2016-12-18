const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());//用form　表单提交时
//app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
})

app.post('/login', function(req, res){
  console.log('login api...');
  console.log(req.body.username);//获取表单提交的用户名
  console.log(req.body.userPwd);
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
