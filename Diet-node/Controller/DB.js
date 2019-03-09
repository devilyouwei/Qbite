const mysql = require('mysql2')
const config = require('../dbconfig.json')
let pool = mysql.createPool(config).promise()

// 优雅async与await
class DB {
    // 基本sql用法
    static async query(sql,opts){
        try{
            let [rows, fields] = await pool.query(sql,opts)
            return rows
        }catch(err){
            return []
            throw err
        }
    }

    // 注意用戶權限
    // list需要給出權限user對象
    static async list(table,user){
        if(!user.sid) return []
        try{
            let [rows, fields] = await pool.query(`select * from ${table} where sid=?`,[user.sid])
            return rows
        }catch(err){
            return []
            throw err
        }
    }

    // insert為強制使用user中sid，故不需要檢查權限
    static async insert(table,data){
        try{
            let res = await pool.query(`insert into ${table} set ?`,data)
            return res[0]['insertId']
        }catch(e){
            return 0
            throw e
        }
    }

    // 刪除指定行，confirm表示是否真實true刪除或者虛擬false刪除
    // delete需要給出權限user對象
    static async delete(table,id,user,confirm=false){
        if(!user.sid) return 0
        try{
            let res = await pool.query(`delete from ${table} where id=? and sid=?`, [id,user.sid])
            return res[0]['affectedRows']
        }catch(e){
            return 0
            throw e
        }
    }
}
module.exports=DB
