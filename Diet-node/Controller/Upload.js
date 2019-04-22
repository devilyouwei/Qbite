const $ = require('./private/Public.js')
const OSS = require('ali-oss')
const config = require('../Config/oss.json')
const fs = require('fs')
const path = require('path')
const client = new OSS(config)

class Upload{
    static async img(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let sourcePath = req.files.file.path
        let newFileName = $.date2stamp()+user.id+'.'+sourcePath.split('.').pop()
        try{
            let stream = fs.createReadStream(sourcePath);
            let data = await client.putStream(newFileName, stream);
            fs.unlink(sourcePath,error=>{
                if(error) throw error;
                console.log('已刪除：'+sourcePath)
            })
            return res.json({status:1,msg:'上傳成功',data:data.url})
        }catch(e){
            throw(e)
            return res.json({status:0,msg:'OSS異常，上傳失敗'})
        }
    }
}
module.exports=Upload
