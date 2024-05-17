const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM("buyer", "seller", "admin"),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
    User.hasMany(models.Order, { onDelete: "CASCADE" });
    User.hasMany(models.Cart, { onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({ 
      where: { username: login }, 

    });
    return user;
  };

  return User;
};

export default getUserModel;
