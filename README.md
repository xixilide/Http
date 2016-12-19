
# HTTP form表单

浏览器中发 POST 请求，地址栏是无法做到的，通常有两种方式可以：一种就是用 html 的 form ，另外一种是 HTTP 客户端，例如 axios/fetch 。介绍 form 的这种 形式以供学习参考。



首先此项目是在React 框架基础上完成的，首先填写表单（用户名 xixilide），点 submit 按钮，发出一个 POST 请求，可以在 chrome 开发者工具的 Network 标签下看到，请求的头部（ Headers ） 中包含
```
Content-Type: application/x-www-form-urlencoded
```
表示发送的数据，的内容类型是 application/x-www-form-urlencoded。

### 请求的主体

同样，在 chrome 的 Network 标签下，也可以看到，请求主体
```
username=xixilide
```
### 请求行

请求头的第一行叫做请求行，打开 chrome 开发者工具，点开相应请求， 看到我们这次请求的请求行如下：
```
POST /login
```

请求是由 form 发出的，对照代码我们会发现，action='/login'对应这里请求行的/login链接 这一部分，method='post'对应了请求行中的POST，也就是请求方法为 post 。

同时，前台的请求方法和链接，要跟后台 express api 中的方法和链接对应上，才能正确触发后台的对应 api 所以，后台处理这次请求的 api 应该写成：
```js
app.post('/login',function(){...})
```

可以这样说，form 的 action 和 method 的值，就决定了，点 submit 按钮的时候，form 发出的请求是
```
POST /login
```
而，前台请求的格式，就决定了，后台 api 的匹配格式，就是
```js
app.post('/login', ...)
```
### 后台 api 的实现


后台 api 中，我们想要做的，就是打印出前台表单提交的信息（例如 xixilide）。所以代码直观上 我们可以写成这样
```js
app.post('/login', function(req, res){

console.log(req.body.username);

});
```
但是上面的代码，在前台请求，会报错：
```
TypeError: Cannot read property 'username' of undefined
```
意思很明确，就是req.body为空。

### 解决 req.body 为空的问题

express 默认是不能得到请求的主体（ body ）的，所以上面的错误就不难理解了。那么如何 解决这个问题呢？

安装 body-parser 就可以了，body 是主体的意思，parser 解析器。

第一步装包：
```
npm install --save body-parser
```
第二步导入：
```
const bodyParser = require('body-parser');
```
第三步使用：

body-parser 是一个中间件，用 app.use() 加载一下即可。
```
app.use(bodyParser.urlencoded());
```
然后，重启node index.js前台再次发出请求，req.body 就定义了， 后台 console 中可以打印出用户名了。

from 数据已经成功提交到了后台，下一步的操作就应该是把数据保存的 mongodb 数据库了。
