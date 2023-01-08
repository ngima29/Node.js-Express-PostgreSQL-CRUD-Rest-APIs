module.exports = (sequelize, DataTypes)=>{

    const Token = sequelize.define('Token', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
          },
          token: {
            type: DataTypes.STRING,
            allowNull: true
          },
          userId:{
            type: DataTypes.INTEGER,
            allowNull:false
          }
        },
          { tableName:'token'});
     return Token;
        }