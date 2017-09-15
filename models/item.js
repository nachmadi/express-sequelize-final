'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
                type: DataTypes.STRING,
                allowNull:false,
                validate: {
                          len: {
                              args: [6, 6],
                              msg : "Code Item must be between 6 characters in length"
                              },
                         is: /(HP|SW|LP)\d+/
                        }
              }
  });

  item.associate = function(models){
        item.belongsToMany(models.Suppliers, {
            through : "SupplierItem"
         })
  }
  
  return item;
};
