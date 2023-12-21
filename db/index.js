const mysql = require("mysql")

const db = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"feng514",
    database:"node_db"
})

module.exports = db