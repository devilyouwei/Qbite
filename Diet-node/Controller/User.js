const db = require('./DB.js');
const trim = require('trim')
const md5 = require('md5')
class User{
    // 登陆
    static async login(req,res){
        let username = trim(req.body.username) // 用戶名
        let email = trim(req.body.email) // 郵箱
        let password = md5(req.body.password) // 密碼

        // 開始登陸過程
        if(username && email && password){
            let data = await db.query('select * from user_shop where username=? and password=? and email=?',[username,password,email])
            if(data.length>0) {
                await db.query('update user set token = ? where id = ?', [md5(Date.parse(new Date()) + req.body.username + req.body.password), data[0]['id']])
                data = await db.query('select * from user where id=?', [data[0]['id']])
                // 所屬店鋪
                let shop = await db.query('select title from shop where id=?', [data[0]['sid']])
                // 職位
                let position = await db.query('select title from position where id=?', [data[0]['pid']])
                data[0]['shop'] = shop[0]['title']
                data[0]['position'] = position[0]['title']
                delete data[0]['password'] // 密码不返回
                return res.json({status:1, msg:'登錄成功', data:data[0]})
            }
            else return res.json({status:0,msg:'用戶名或密碼錯誤'})
        }else return res.json({status:0,msg:'輸入用戶名或者密碼'})
    }

}
module.exports=User
