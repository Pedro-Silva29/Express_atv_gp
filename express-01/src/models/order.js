const getOrderModel = (sequelize, { DataTypes }) => {
    const Order = sequelize.define("order", {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0,
        },
      },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Product, { through: "OrderProduct" });
    };
  
    return Order;
  };
  
  export default getOrderModel;
  