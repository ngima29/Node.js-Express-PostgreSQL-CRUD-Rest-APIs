
module.exports = (sequelize, DataTypes)=>{
const userModel = sequelize.define('userModel', {
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
     isVerifyEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },

},{ tableName:'users'});
return userModel;
}

