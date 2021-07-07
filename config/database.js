// MySQL connectivity
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
}); 


module.exports = sequelize;
// pool.query("SELECT * FROM products WHERE productId<3", function(err, rows, fields) {
//     // Connection is automatically released when query resolves
//     if(err){
//         console.log(err)
//     }
//     console.log(rows)
//  })

// requiring product routes
