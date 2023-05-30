'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peride_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  peride_users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    period_length: DataTypes.INTEGER,
    cycle_length: DataTypes.INTEGER,
    luteal_phase_length: DataTypes.INTEGER,
    birth_year: DataTypes.INTEGER,
    smart_calculate: DataTypes.BOOLEAN,
    irregular_cycles: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'peride_users',
  });
  return peride_users;
};