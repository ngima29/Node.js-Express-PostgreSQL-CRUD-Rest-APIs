const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config();

let database = process.env.PGDATABASE;
let username = process.env.PGUSER;
let password = process.env.PGPASSWORD;
let host = process.env.PGHOST;

    const sequelize = new Sequelize(database, username, password, {
        host: host,
        logging:false,
        dialect:  'postgres' 
      });
      try {
         sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

     const db = {};
     db.Sequelize = Sequelize;
     db.sequelize = sequelize;

     /// requires modules
     db.user = require('../models/userModel')(sequelize, DataTypes);
     db.post = require('../models/postModel')(sequelize, DataTypes);
     //db.Token = require('../models/Token')(sequelize, DataTypes);
    
     //Associations
     // user and post
     db.user.hasMany(db.post,{foreignKey:'userId'});
     db.post.belongsTo(db.user,{foreignKey:'userId'});
 
     // user and token
    // db.user.hasOne(db.Token,{foreignKey:'userId'});
    // db.Token.belongsTo( db.user,{foreignKey:'userId'});


     // sync all modules
     db.sequelize.sync({force:true});
      
      
  module.exports = db;