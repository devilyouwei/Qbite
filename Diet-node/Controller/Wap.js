const db = require('./private/DB.js');

class Wap{
    // 鎖定桌
    static async order(req,res){
        let did = parseInt(req.body.did) // 餐桌id
        let oid = parseInt(req.body.oid) // 訂單id
        let order = JSON.parse(req.body.order) // 餐品內容json

        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})

        //如果用戶存在訂單
        if(oid){
            let order = (await db.query('select * from orders_desk where id=? and is_del=0',[oid]))[0]
            if(order) {
                if(order.endtime==0) return res.json({status:1,msg:'訂單进行中',data:order})
                else return res.json({status:0,msg:'訂單已結束'})
            }
            else return res.json({status:0,msg:'查不到訂單'})
        }

        // 檢查餐桌
        let flag = await db.query('select id from desk where id=? and is_del=0',[did])
        if(!flag || !flag.length) return res.json({status:0,msg:'找不到該餐桌，請掃描其他二維碼或咨詢店家'})

        let price = 0 // 訂單總價
        let num = 0 // 訂單總數
        for(let i in order){
            price+=order[i].price*order[i].count
            num+=order[i].count
        }
        // 創建訂單
        let data = {
            did:did,
            content:JSON.stringify(order),
            num:num,
            price:price,
            createtime: Date.parse(new Date())/1000, //訂單創建時間
            endtime:0
        }
        flag = await db.insert('orders',data)
        if(flag){
            let order = (await db.query('select * from orders_desk where id=?',[flag]))[0]
            return res.json({status:1,msg:'訂單鎖定',data:order})
        }
        else return res.json({status:0,msg:'訂單生成失敗'})
    }

    // 首頁點菜
    static async index(req,res){
        // 改良，只需傳入桌號，從桌找到對應的店
        let did = parseInt(req.body.did)
        if(!did) return res.json({status:0,msg:'選擇餐桌，掃描餐桌二維碼'})

        // 根據桌號獲得店ID
        let data = await db.query('select sid from desk where id=? and is_del=0',[did])
        if(!data || !data.length) return res.json({status:0,msg:'查無此餐桌，請咨詢店家或掃描其他二維碼！'})
        let sid = data[0]['sid']

        // 店鋪信息
        let data3 = await db.query('select * from shop where id=?',[sid])
        if(!data3 || !data3.length) return res.json({status:0,msg:'查無餐廳，餐廳或已關閉！'})

        //選擇全部的分類和食物
        let data1 = await db.query('select * from type where sid=? order by rank asc',[sid])
        let data2 = await db.query('select * from food where sid=? and is_effect=1 order by rank asc',[sid])

        return res.json({status:1,data:{type:data1,food:data2,shop:data3[0]},msg:'全部列出'})
    }
}
module.exports=Wap
