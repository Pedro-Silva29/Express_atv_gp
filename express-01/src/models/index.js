import Sequelize from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";
import getProductModel from "./product";
import getCartModel from "./cart";
import getCategoryModel from "./category";
import getOrderModel from "./order";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  }
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Product: getProductModel(sequelize, Sequelize),
  Cart: getCartModel(sequelize, Sequelize),
  Category: getCategoryModel(sequelize, Sequelize),
  Order: getOrderModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
