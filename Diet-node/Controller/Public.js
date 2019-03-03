const db = require('./DB.js');

class Public{
    // 驗證用戶登錄狀態，可傳入對象或者json字符串
    static async auth(user){
        try {
            if(typeof user !== 'object') user = JSON.parse(user)
            if(user.id && user.token && user.sid) {
                let data = await db.query('select * from user where id=? and token=? and sid=?', [user.id,user.token,user.sid])
                if(data.length>0) return data[0] // 用戶存在
                else return false
            } else return false
        } catch(e) {
            return false
            throw e
        }
    }
    static date2stamp(date=new Date()){
        return Date.parse(date) / 1000
    }
}
module.exports=Public
