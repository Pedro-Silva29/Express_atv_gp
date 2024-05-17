const getCategoryModel = (sequelize, { DataTypes }) => {
    const Category = sequelize.define("category", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Category.associate = (models) => {
      Category.hasMany(models.Product);
    };
  
    return Category;
  };
  
  export default getCategoryModel;
  