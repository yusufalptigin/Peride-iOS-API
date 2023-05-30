'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('peride_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      period_length: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cycle_length: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      luteal_phase_length: {
        allowNull: false,
        defaultValue: 14,
        type: Sequelize.INTEGER
      },
      birth_year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      smart_calculate: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      irregular_cycles: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('peride_users');
  }
};