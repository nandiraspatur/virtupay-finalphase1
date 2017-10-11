'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserProduct = sequelize.define('UserProduct', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    phone: DataTypes.STRING
  })
  UserProduct.associate = model => {
    UserProduct.belongsTo(model.Transaction);
    UserProduct.belongsTo(model.User);
    UserProduct.belongsTo(model.Product);

  }
  return UserProduct;
};