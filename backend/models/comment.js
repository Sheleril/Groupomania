'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //ASSOCIATION DES TABLES ENTRE ELLES
      models.Comment.belongsTo(models.User, { foreignKey: 'userId' })
      models.Comment.belongsTo(models.Message, { foreignKey: 'messageId' })
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};