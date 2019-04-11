const db = require('./private/DB.js');
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
            let data = await db.query('select * from login_view where username=? and password=? and email=?',[username,password,email])
            if(data && data.length>0) {
                if(data[0]['is_del']==1) return res.json({status:0,msg:'店鋪被禁用，請聯繫管理員'})
                const token = md5(Date.parse(new Date()) + data[0].username + data[0].password)
                let flag = (await db.query('update user set token = ? where id = ?', [token, data[0]['id']])).changedRows
                if(flag) {
                    data[0].token = token
                    delete data[0]['password'] // 密码不返回
                    return res.json({status:1, msg:'登錄成功', data:data[0]})
                } else return res.json({status:0,msg:'登錄記錄寫入失敗'})
            } else return res.json({status:0,msg:'登錄信息錯誤'})
        } else return res.json({status:0,msg:'輸入用戶名或者密碼'})
    }

}
module.exports=User
