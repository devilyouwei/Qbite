const db = require('./DB.js');

class Wap{
    // 鎖定桌
    static async sit(req,res){

    }
    // 首頁點菜
    static async listType(req,res){
        let sid = parseInt(req.body.sid)
        let did = parseInt(req.body.did)
        if(!sid) return res.json({status:0,msg:'選擇門店'})
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})
        let data = await db.query('select * from type where sid=?',[sid])
        return res.json({status:1,data:data,msg:'全部列出'})
    }
    static async listFood(req,res){
        let sid = parseInt(req.body.sid)
        let did = parseInt(req.body.did)
        if(!sid) return res.json({status:0,msg:'選擇門店'})
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})

        let tid = parseInt(req.body.id)
        if(!tid) return res.json({status:0,msg:'請選擇食物分類'})
        let data = await db.query('select * from food where tid=? and is_effect=1',[tid])
        return res.json({status:1,data:data,msg:'全部列出'})
    }
}
module.exports=Wap
