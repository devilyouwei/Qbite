const db = require('./private/DB.js')
const $ = require('./private/Public.js')
const trim = require('trim')

const PID = 2 // 廚師職位ID
class Cooker{
    static async deskList(req,res){
        let user = await $.auth(req.body.user)
        if(!user || user.pid!=PID) return res.json({status:-1,msg:'登錄權限錯誤'})
        // 左連接查詢
        const sql = 
        `select id,title,sid,IFNULL(orderNum,0) orderNum from desk d
        left join
        (select count(*) as orderNum,did from orders where endtime=0 and state=0 group by did) o
        on d.id=o.did where d.sid=? and d.is_del=0 and orderNum>0`
        let data = await db.query(sql,[user.sid])
        return res.json({status:1,data:data,msg:'全部列出'})
    }
    static async foodList(req,res){
        let user = await $.auth(req.body.user)
        if(!user || user.pid!=PID) return res.json({status:-1,msg:'登錄權限錯誤'})
        let id = parseInt(req.body.id)
        if(!id) return res.json({status:0,msg:'給出桌ID'})
        let data = await db.query('select id,content,createtime,state from orders_desk where sid=? and did=? and state=0 and endtime=0',[user.sid,id])
        return res.json({status:1,msg:'全部列出',data:data})
    }
}
module.exports=Cooker
