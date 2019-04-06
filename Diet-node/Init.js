/**
 * 初始化网站模块，应可以自动匹配对应路由，采用约定的模式
 * devilyouwei
 * 2018-8-19
 * MIT license
 * @returns {module}
 */
const CTRL = __dirname+'/Controller/'

class Init{
    static controller(app){
        if(!app){
            return next('No App Object')
        }

        //统一请求
        app.all('*',(req,res,next)=>{
            if(req.method=="post"){
                this.onlyPost(req,res,next)
            }else{
                this.onlyPost(req,res,next)
                //忽略所有get请求
                //next('非post请求无效')
            }
        })
    }

    //将所有get，post请求转换为post统一请求
    static onlyPost(req,res,next){
        let path = req.path
        let query = req.query
        //取得控制器和方法
        let ctl = path.split('/')[1]
        let act = path.split('/')[2]
        if(!ctl) return next('Error: No Controller given')
        if(!act) return next('Error: No Action given')

        try{
            let Controller = require(CTRL+ctl)
            let Action = Controller[act]
            if(Action && typeof Action === 'function') return Action(req,res)
            else return next(`No Action called '${act}' can be found in '${ctl}'`)
        }catch(err){
            throw err
            //next(`Controller ${ctl} not found or err`)
            return next(err)
        }
    }
}

module.exports = Init
