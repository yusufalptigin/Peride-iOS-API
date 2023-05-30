'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_symptoms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_symptoms.init({
    user_id: DataTypes.INTEGER,
    symptoms_string: DataTypes.STRING,
    symptoms_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_symptoms',
  });
  return user_symptoms;
};