class Config{
    static config(req,res){
        const config = {
            study_url : 'http://www.baidu.com'
        }
        return res.json({status:1,data:config,msg:'公共配置文件'})
    }
}
module.exports=Config
