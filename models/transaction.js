'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    UserProductId: DataTypes.INTEGER,
    nota: DataTypes.STRING,
    total: DataTypes.STRING
  });
  Transaction.associate = model => {
    Transaction.hasMany(model.UserProduct)
  }
  return Transaction;
};