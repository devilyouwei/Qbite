const db = require('./DB.js');
class News{
    // 登陆
    static async list(req,res){
    	let data = await db.query('select * from news order by id desc')
      	res.json({status:1,data:data,msg:''})
    }
    static async article(req,res){
        let id = req.body.id
    	let data = await db.query('select * from news where id=?',[id])
      	res.json({status:1,data:data[0],msg:''})
    }
    static async add(req,res){
        let title = req.body.title
        let content = req.body.content
        let intro = req.body.intro
        let d = new Date()
        let data={
            title:title,
            content:content,
            intro:intro,
            time:d.toLocaleDateString()+' '+d.toLocaleTimeString()
        }
        let flag = await db.insert('news',data)
        if(flag>0) return res.json({status:1,msg:'发布成功'})
        else return res.json({status:0,msg:'发布失败'})
    }

}
module.exports=News
