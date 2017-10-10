'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    productType: DataTypes.STRING,
    provider: DataTypes.STRING,
    nominal: DataTypes.STRING,
    productName: DataTypes.STRING
  })
  Product.associate = model => {
      Product.belongsToMany(model.User, {through : 'UserProduct'});
      Product.hasMany(model.UserProduct);

  }
  return Product;
};