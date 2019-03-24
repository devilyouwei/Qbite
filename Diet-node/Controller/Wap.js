const db = require('./DB.js');

class Wap{
    // 鎖定桌
    static async sit(req,res){
        let sid = parseInt(req.body.sid) // 店鋪id
        let did = parseInt(req.body.did) // 餐桌id
        let oid = parseInt(req.body.oid) // 訂單id
        let order = JSON.parse(req.body.order) // 餐品內容json
        if(!sid) return res.json({status:0,msg:'選擇門店'})
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})
        //如果用戶存在訂單
        if(oid){
            let order = (await db.query('select * from orders_desk where id=? and endtime=?',[oid,0]))[0]
            if(order) return res.json({status:1,msg:'訂單鎖定中',data:order})
            else return res.json({status:0,msg:'查不到訂單，訂單已經結束'})
        }
        // 鎖桌
        let flag = (await db.query('update desk set sit=1 where id=? and sid=?',[did,sid]))['affectedRows']
        let price = 0 // 訂單總價
        let num = 0 // 訂單總數
        for(let i in order){
            price+=order[i].price*order[i].count
            num+=order[i].count
        }
        // 創建訂單
        let data = {
            sid:sid,
            did:did,
            content:JSON.stringify(order),
            num:num,
            price:price,
            createtime: Date.parse(new Date())/1000, //訂單創建時間
            endtime:0
        }
        flag = await db.insert('orders',data)
        if(flag>0){
            let order = (await db.query('select * from orders_desk where id=?',[flag]))[0]
            return res.json({status:1,msg:'訂單鎖定',data:order})
        }
        else return res.json({status:0,msg:'訂單生成失敗'})
    }

    // 首頁點菜
    static async index(req,res){
        let sid = parseInt(req.body.sid)
        let did = parseInt(req.body.did)
        if(!sid) return res.json({status:0,msg:'選擇門店，掃描餐桌二維碼'})
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})

        //選擇全部的分類和食物，店鋪信息
        let data = await db.query('select * from type where sid=?',[sid])
        let data2 = await db.query('select * from food where sid=? and is_effect=1',[sid])
        let data3 = await db.query('select * from shop where id=?',[sid])
        return res.json({status:1,data:{type:data,food:data2,shop:data3[0]},msg:'全部列出'})
    }
}
module.exports=Wap
