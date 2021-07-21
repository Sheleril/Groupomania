'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //ASSOCIATION DES TABLES ENTRE ELLES
      models.Message.hasMany(models.Like,  { onDelete: 'cascade', hooks: true });
      models.Message.hasMany(models.Comment, {onDelete: 'cascade', hooks: true });
      models.Message.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };

  Message.init({
    //userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};