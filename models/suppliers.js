'use strict';
module.exports = function(sequelize, DataTypes) {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });

  Suppliers.associate = function(models){
        Suppliers.belongsToMany(models.item, {
            through : "SupplierItem"
         })
  }

  return Suppliers;
};
