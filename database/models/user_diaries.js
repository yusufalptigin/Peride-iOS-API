'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_diaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_diaries.init({
    user_id: DataTypes.INTEGER,
    diary_entry: DataTypes.STRING,
    diary_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_diaries',
  });
  return user_diaries;
};