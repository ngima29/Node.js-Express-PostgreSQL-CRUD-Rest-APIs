const { Sequelize } = require('sequelize');
require("dotenv").config();

let database = process.env.PGDATABASE;
let username = process.env.PGUSER;
let password = process.env.PGPASSWORD;
let host = process.env.PGHOST;

    const sequelize = new Sequelize(database, username, password, {
        host: host,
        dialect:  'postgres' 
      });
      try {
         sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      
  module.exports = sequelize;