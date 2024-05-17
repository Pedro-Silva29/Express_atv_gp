const getProductModel = (sequelize, { DataTypes }) => {
    const Product = sequelize.define("product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Cart, { through: "CartProduct" });
      Product.belongsToMany(models.Order, { through: "OrderProduct" });
    };
  
    return Product;
  };
  
  export default getProductModel;
  