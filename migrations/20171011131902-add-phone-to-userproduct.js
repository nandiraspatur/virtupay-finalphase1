'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('UserProducts', 'phone', Sequelize.STRING);

  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('UserProducts', 'phone');
  }
};
