const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const db = require("../db/index.js")
const secretKey = "123456"


// 用户注册处理函数
exports.regUser = (req,res)=>{
    const data = req.body
    const sql = "select * from tb_users where username = ?"

    db.query(sql,data.username,(err,result)=>{
        if(err || result.length>0){
            return res.json({
                code:400,
                msg:"用户名存在"
            })
        }

        const sqlStr = "insert into tb_users (username,password) value (?,?)"
        data.password = bcrypt.hashSync(data.password,10)
        db.query(sqlStr,[data.username,data.password],(err,result)=>{
            if(err){
                return res.json({
                    code:400,
                    msg:err.message
                })
            }
            res.json({
                code:200,
                msg:"注册成功"
            })
        })
    })
}


// 用户登录处理函数
exports.login = (req,res)=>{
    const data = req.body
    const sql = "select password from tb_users where username=?"

    db.query(sql,data,username,(err,result)=>{
        if(err || result==0){
            return res.json({
                code:400,
                msg:"该用户不存在"
            })
        }
        const storedHash = result[0].password;  // 获取存储的哈希值 result 是一个数组
        const passwordMatch = bcrypt.compareSync(data.password,storedHash)
        if(!passwordMatch){
            return res.json({
                code:400,
                msg:"用户名密码不匹配"
            })
        }
        const payload = {
            username:data.username,     // 用户名
            // 其他用户相关的信息可以在这里添加 
        };
        const token = jwt.sign(payload,secretKey,{expiresIn:'10h'})     // 设置 token 有效时长 10h
        return res.json({
            code:200,
            msg:"登录成功",
            token:'Bearer '+token
        })
    })
}


// 用户退出处理
exports.logout = (req,res)=>{
    const data = req.body
    const sql = "delete from db_users where username=?"

    db.query(sql,data.username,(err,result)=>{
        if(err || result.length > 0 ){
            res.json({
                code:200,
                msg:"用户已经删除"
            })
        }
    })

}