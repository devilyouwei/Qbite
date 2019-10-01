const db = require('./private/DB.js')
const $ = require('./private/Public.js')

class Main{
    // list all the cooperation shops
    static async shopList(req,res){
        let data = await db.query('select id,email,title,time,img,background,description from shop where is_del=0 and is_top=1 order by time asc')
        return res.json({status:1,msg:'list all',data:data})
    }

    // list the top 10 food
    static async foodList(req,res){
        let data = await db.query('select id,title,time,thumb,intro from food where is_effect=1')
        return res.json({status:1,msg:'list all',data:data})
    }
}
module.exports=Main
