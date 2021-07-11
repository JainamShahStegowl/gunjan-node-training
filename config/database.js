// database connectivity
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DBNAME, 'root', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});


module.exports = sequelize;

