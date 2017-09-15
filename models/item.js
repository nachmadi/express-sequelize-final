'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return item;
};