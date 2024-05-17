const getCartModel = (sequelize, { DataTypes }) => {
    const Cart = sequelize.define("cart", {});
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User);
      Cart.belongsToMany(models.Product, { through: "CartProduct" });
    };
  
    return Cart;
  };
  
  export default getCartModel;
  