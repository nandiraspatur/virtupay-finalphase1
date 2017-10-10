'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    name: DataTypes.STRING,
    salt: DataTypes.STRING
  })
  User.associate = model => {
    User.belongsToMany(model.Product, { through: 'UserProduct' });
    User.hasMany(model.UserProduct);

  }
  return User;
};

