const db = require('./DB.js');
const trim = require('trim')
const $ = require('./Public.js')
const md5 = require('md5')

// 店鋪管理員類
class Admin{
    /*類型部分*/
    // 讀取類型列表
    static async typeList(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let data = await db.list('type',user)
        return res.json({status:1,data:data,msg:'全部列出'})
    }
    // 保存列表
    static async typeSave(req,res){
        let body = req.body
        let id = parseInt(body.id)
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        if(!id){
            // 新增
            let data={
                title:body.title,
                rank:body.rank,
                time:$.date2stamp(),
                sid:user.sid
            }
            let id = await db.insert('type',data)
            if(id>0) return res.json({status:1,msg:'插入成功'})
            else return res.json({status:0,msg:'插入失敗，數據寫入錯誤'})
        } else {
            //編輯
            let data={
                id:body.id,
                title:body.title,
                rank:body.rank,
                time:$.date2stamp(),
                sid:user.sid
            }
            let flag = (await db.query('update type set title=?,rank=?,time=? where id=? and sid=?',[data.title,data.rank,data.time,data.id,user.sid]))['affectedRows']
            if(flag>0) return res.json({status:1,msg:'編輯成功'})
            else return res.json({status:0,msg:'沒有改變'})
        }
    }

    // 刪除列表
    static async typeDelete(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let id = parseInt(req.body.id)
        if(id){
            let flag = await db.delete('type',id,user)
            if(flag>0) return res.json({status:1,msg:'已經刪除'})
            return res.json({status:0,msg:'未刪除'})
        } else return res.json({status:0,msg:'無指定id'})
    }

    /*菜單部分*/
    // 菜品列表
    static async menuList(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let sql = `select * from food_type where sid=?`
        if(req.body.search) sql = `${sql} and title like '%${req.body.search}%'`
        let data = await db.query(sql,[user.sid])
        return res.json({status:1,msg:'全部列出',data:data})
    }

    static async menuSave(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let id = parseInt(req.body.id)
        if(!id){ //新增
            let data = {
                title: trim(req.body.title),
                rank: parseInt(req.body.rank),
                price: parseFloat(req.body.price),
                tid: parseInt(req.body.tid),
                sid: parseInt(user.sid),
                thumb: req.body.thumb,
                time: $.date2stamp()
            }
            if(data.title.length<=0 || data.title.length>30) return res.json({status:0,msg:'標題字符長度不符'})
            if(data.price<=0) return res.json({status:0,msg:'金額不規範'})
            if(!data.tid) return res.json({status:0,msg:'未分類'})
            let id = await db.insert('food',data)
            if(id>0) return res.json({status:1,msg:'插入成功'})
            else return res.json({status:0,msg:'插入失敗，數據寫入錯誤'})
        }else{ //編輯
            let data = {
                id: id,
                sid: parseInt(user.sid),
                title: trim(req.body.title),
                rank: parseInt(req.body.rank),
                price: parseFloat(req.body.price),
                tid: parseInt(req.body.tid),
                thumb: req.body.thumb,
                time: $.date2stamp()
            }
            let flag = (await db.query('update food set title=?,rank=?,price=?,tid=?,time=?,thumb=? where id=? and sid=?',[data.title,data.rank,data.price,data.tid,data.time,data.thumb,data.id,user.sid]))['affectedRows']
            if(flag>0) return res.json({status:1,msg:'編輯成功'})
            else return res.json({status:0,msg:'編輯失敗'})
        }
    }

    // 改變菜供應狀態
    static async menuEffect(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let id = parseInt(req.body.id)
        if(id){
            let effect = parseInt(req.body.effect)==0?0:1
            let flag = (await db.query('update food set is_effect=? where id=? and sid=?',[effect,id,user.sid]))['affectedRows']
            if(flag>0) return res.json({status:1,msg:'狀態改變'})
            else return res.json({status:1,msg:'狀態未改變'})
        } else return res.json({status:0,msg:'無指定id'})
    }
    // 刪除菜品
    static async menuDelete(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let id = parseInt(req.body.id)
        if(id){
            let flag = await db.delete('food',id,user)
            if(flag>0) return res.json({status:1,msg:'已經刪除'})
            else return res.json({status:0,msg:'未刪除，找不到指定刪除行'})
        } else return res.json({status:0,msg:'無指定id'})
    }

    /*配置部分*/
    // 列出用戶
    static async setUserList(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        let data = await db.list('user_position',user)
        return res.json({status:1,data:data,msg:'全部列出'})
    }
    //列出職位
    static async setPositionList(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        // 店長特權
        //if(user.pid!=1) return res.json({status:0,msg:'無權限用戶！'})
        let data = await db.query('select * from position')
        return res.json({status:1,data:data,msg:'全部列出'})
    }
    // 保存用戶
    static async setUserSave(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        // 店長特權
        if(user.pid!=1) return res.json({status:0,msg:'無權限用戶！'})
        let id = parseInt(req.body.id)
        if(id == user.id) return res.json({status:0,msg:'不可修改本人!'})
        if(!id){ // 新增
            let count = (await db.query('select count(*) from user where username=?',[req.body.username]))[0]['count(*)']
            if(count>0) return res.json({status:0,msg:'用戶名存在，請使用其他用戶名'})
            let data = {
                sid:user.sid,
                username:req.body.username,
                password:md5(req.body.password),
                token:'',
                pid:req.body.pid
            }
            let id = await db.insert('user',data)
            if(id>0) return res.json({status:1,msg:'插入成功'})
            else return res.json({status:0,msg:'插入失敗，數據寫入錯誤'})
        }else{
            let data = {
                id:id,
                password:md5(req.body.password),
                token:'',
                pid:req.body.pid
            }
            let flag = (await db.query('update user set password=?,token=?,pid=? where id=? and sid=?',[data.password,data.token,data.pid,data.id,user.sid]))['affectedRows']
            if(flag>0) return res.json({status:1,msg:'編輯成功'})
            else return res.json({status:0,msg:'沒有改變'})
        }
    }
    // 刪除店員
    static async setUserDelete(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        // 店長特權
        if(user.pid!=1) return res.json({status:0,msg:'無權限用戶！'})
        let id = parseInt(req.body.id)
        if(id == user.id) return res.json({status:0,msg:'不可刪除本人!'})
        if(id){
            let flag = await db.delete('user',id,user)
            if(flag>0) return res.json({status:1,msg:'已經刪除'})
            else return res.json({status:0,msg:'未刪除，找不到指定刪除行'})
        } else return res.json({status:0,msg:'無指定id'})
    }
    // 修改店鋪名
    static async setShop(req,res){
        let user = await $.auth(req.body.user)
        if(!user) return res.json({status:-1,msg:'未登錄或登錄狀態失效'})
        // 店長特權
        if(user.pid!=1) return res.json({status:0,msg:'無權限用戶！'})
        if(req.body.title && req.body.img){
            let flag = (await db.query('update shop set title=?,img=? where id=?',[req.body.title,req.body.img,user.sid]))['affectedRows']
            if(flag>0) return res.json({status:1,msg:'修改成功'})
        } else {
            let data = (await db.query('select title,img from shop where id=?',[user.sid]))
            return res.json({status:1,msg:'輸入店名或者上傳圖片',data:data[0]})
        }

    }
}
module.exports=Admin
