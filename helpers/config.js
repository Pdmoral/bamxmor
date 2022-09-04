var mysql = require('mysql');


// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'bamx-testing'
// }) 

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin',
    database: 'bamxdb'
})

module.exports.pool = pool; // Objeto que quiero exportar o hacer publico fuera de este archivo