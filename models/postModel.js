  module.exports = (sequelize,DataTypes)=>{
    const postModel = sequelize.define('postModel', 
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
},{tableName:'blog'});
return postModel;

  }
