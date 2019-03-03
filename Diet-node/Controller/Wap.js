const db = require('./DB.js');

class Wap{
    // 鎖定桌
    static async sit(req,res){

    }
    // 首頁點菜
    static async index(req,res){
        let sid = parseInt(req.body.sid)
        let did = parseInt(req.body.did)
        if(!sid) return res.json({status:0,msg:'選擇門店'})
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})

        //選擇全部的分類和食物
        let data = await db.query('select * from type where sid=?',[sid])
        let data2 = await db.query('select * from food where sid=? and is_effect=1',[sid])
        return res.json({status:1,data:{type:data,food:data2},msg:'全部列出'})
    }
}
module.exports=Wap
