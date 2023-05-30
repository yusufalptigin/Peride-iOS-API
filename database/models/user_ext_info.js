'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_ext_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_ext_info.init({
    device_type: DataTypes.STRING,
    device_id: DataTypes.STRING,
    onesignal_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_ext_info',
  });
  return user_ext_info;
};