'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_periods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_periods.init({
    user_id: DataTypes.INTEGER,
    period_start: DataTypes.DATE,
    period_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_periods',
  });
  return user_periods;
};