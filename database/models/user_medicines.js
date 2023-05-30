'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_medicines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_medicines.init({
    user_id: DataTypes.INTEGER,
    medicine_name: DataTypes.STRING,
    medicine_info_string: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_medicines',
  });
  return user_medicines;
};