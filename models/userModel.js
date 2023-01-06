const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbconnection');
class userModel extends Model {}

userModel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    address: {
        type: DataTypes.STRING,
        allowNull: false
      },
    createdAt: {
        type: DataTypes.DATE,
        allowNull:true,
        defaultValue: new Date().toDateString()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:true,
        defaultValue: new Date().toDateString()
    }
},{
    sequelize,
    modelName:'User',
    freezeTableName:true
});


module.exports = userModel;

