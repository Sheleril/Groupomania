'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //ASSOCIATION DES TABLES ENTRE ELLES
      models.Like.belongsTo(models.User, { foreignKey: 'userId' }),
      models.Like.belongsTo(models.Message, { foreignKey: 'messageId' })
    }
  };
  Like.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};