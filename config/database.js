// MySQL connectivity
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs',
    password: 'root'
});


module.exports = pool;
// pool.query("SELECT * FROM products WHERE productId<3", function(err, rows, fields) {
//     // Connection is automatically released when query resolves
//     if(err){
//         console.log(err)
//     }
//     console.log(rows)
//  })

// requiring product routes
