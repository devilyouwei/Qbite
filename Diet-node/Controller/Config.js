class Config{
    static config(req,res){
        const config = {
            study_url : 'https://www.bilibili.com/video/av52496171?pop_share=1'
        }
        return res.json({status:1,data:config,msg:'公共配置文件'})
    }
}
module.exports=Config
