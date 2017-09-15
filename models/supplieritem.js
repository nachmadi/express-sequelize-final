'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  SupplierItem.associate = function(models){
      SupplierItem.belongsTo(models.item);
      SupplierItem.belongsTo(models.Suppliers);
  }
  
  return SupplierItem;
};
