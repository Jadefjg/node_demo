const db = require('../db/index.js')

exports.getCates = (req,res)=>{
    const sql = "select*from tb_artcate where is_delete=0 order by id asc"
    db.query(sql,(err,result)=>{
        if(err||result.length==0){
            return res.json({
                code:400,
                msg:"获取文章分类失败"
            })
        }
        res.json({
            code:200,
            msg:"获取文章分类成功",
            data:result
        })
    })
}

exports.addCates = (req,res)=>{
    const data = req.body

    const sql = "select * from tb_artcate where name=? or nickname = ?"

    db.query(sql,[data.name,data.alias],(err,result)=>{
        if(err||result.length>0){
            return res.json({
                code:400,
                msg:"该分类已存在"
            })
        }
        const sqlStr = "insert into tb_artcate (name,nickname,is_delete) values (?,?,?)"
        db.query(sqlStr,[data.name,data.alias,data.is_delete],(err,result)=>{
            if(err||affectedRows.rows!==1){
                return res.json({
                    code:400,
                    msg:"新增文章分类失败"
                })
            }
            return res.json({
                code:200,
                msg:"新增文章分类成功"
            })
        })
    })   
}

exports.deleteCateById = (req,res)=>{
    const data =req.params
    const sql = "update tb_artcate set is_delete = 1 where id =?"
    db.query(sql,data.id,(err,result)=>{
        if(err,result.affectedRows!==1){
            return res.json({
                code:400,
                msg:"删除失败"
            })
        }
        return res.json({
            code:200,
            msg:"删除成功"
        })
    })
}

exports.getCateById = (req,res)=>{
    const data = req.params
    const sql = "select*from tb_artcate where id = ?"
    db.query(sql,data.id,(err,result)=>{
        if(err||result.length!==1){
            return res.json({
                code:400,
                msg:"查询分类数据失败"
            })
        }
        return res.json({
            code:200,
            msg:"查询分类数据成功",
            data:result[0]
        })
    })
}

exports.updateById =(req,res)=>{
    const data = req.body
    const sql = "select*from tb_artcate where name=? or alias = ?"

    db.query(sql,[data.name,data.alias],(err,result)=>{
        if(err||result.length>0){
            return res.json({
                code:400,
                msg:"该分类已存在"
            })
        }
        const sqlStr = "update tb_artcate set name = ?,alias = ? where id =?"
        db.query(sqlStr,[data.name,data.alias,req.params.id],(err,result)=>{
            if(err||result.affectedRows!==1){
                return res.json({
                    code:400,
                    msg:"更新数据失败"
                })
            }    
            return res.json({
                code:200,
                msg:"更新数据成功"
            })
        })

    })
}