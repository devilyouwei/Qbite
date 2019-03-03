let express = require('express');
//const cookieParser = require('cookie-parser');
//const session = require("express-session");
let init = require('./Init');
let app = express();
let fs = require('fs');
let path = require('path');
const https = require('https');


//根据项目的路径导入生成的证书文件
let privatekey = fs.readFileSync('./Crt/privkey.pem', 'utf8');
let certificate = fs.readFileSync('./Crt/cert.pem', 'utf8');
var credentials = {key: privatekey, cert: certificate};
 
//可以根据
init.controller(app);
var httpsServer = https.createServer(credentials, app);
 
//创建https服务器
httpsServer.listen(443, function() {
    console.log('HTTPS Server is running on: https://www.devil.ren');
});
