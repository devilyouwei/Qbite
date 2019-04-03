const $ = require('./private/Public.js')
const db = require('./private/DB.js')
class Index{
    // 後台首页收入数据
    static async income(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let begin = parseInt(req.body.begin)
        let end = parseInt(req.body.end)
        // 如果未获取到範圍
        if(!begin) begin=0
        if(!end) end=Date.parse(new Date())
        const sql = 'select iFNULL(sum(price),0.00) price,count(*) orders from orders where endtime>=? and endtime<=? and endtime!=0 and sid=?'
        let data = (await db.query(sql,[begin/1000,end/1000,user.sid]))
        return res.json({status:1,data:data,msg:'总收入'})
    }
    // 按天列出收入數據
    static async incomeByDay(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let begin = parseInt(req.body.begin)
        let end = parseInt(req.body.end)
        // 如果未获取到範圍
        if(!begin) begin=0
        if(!end) end=Date.parse(new Date())
        const sql = 'select DATE_FORMAT(FROM_UNIXTIME(endtime),?) day, endtime, sum(price) price, count(*) orders from orders where endtime>=? and endtime<=? and endtime!=0 and sid=? group by day order by endtime asc'
        let data = (await db.query(sql,['%Y-%m-%d',begin/1000,end/1000,user.sid]))
        let data2 = []
        if(data.length>0){
            let allDate = $.getDaysBetween(data[0].endtime,end/1000) // 获得范围内所有日期
            // 填充0收入，0订单的日期，为图表
            for(let i in allDate){
                let dataPush = {
                    day:allDate[i],
                    price:0,
                    orders:0
                }
                for(let j in data){
                    if(data[j].day==allDate[i]) {
                        dataPush={
                            day:data[j].day,
                            price:data[j].price,
                            orders:data[j].orders
                        }
                        break;
                    }
                }
                data2.push(dataPush)
            }
        }
        return res.json({status:1,data:data2,msg:'收入列表，按天計算'})
    }
    // 按桌列出收入佔比
    static async incomeByDesk(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let begin = parseInt(req.body.begin)
        let end = parseInt(req.body.end)
        // 如果未获取到範圍
        if(!begin) begin=0
        if(!end) end=Date.parse(new Date())
        const sql = 'select did,title,count(*) orders,sum(price) money from orders_desk where endtime>=? and endtime<=? and endtime!=0 and sid=? group by did'
        let data = (await db.query(sql,[begin/1000,end/1000,user.sid]))
        return res.json({status:1,data:data,msg:'按桌劃分'})
    }
}
module.exports=Index
