import "dotenv/config";
import cors from "cors";
import express from "express";
import { routes } from "./routes";
import models, { sequelize } from "./models";
import getUserModel from './models/userModel';

import models from './models';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = getUserModel(sequelize, models);

// Log para depuração
console.log("Before custom middleware");

app.use(async (req, res, next) => {
  console.log("Inside custom middleware");
  req.context = {
    models: {User },
    me: await User.findByLogin("rwieruch"),
  };
  next();
});

// Log para depuração
console.log("After custom middleware");

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/products", routes.product);
app.use("/carts", routes.cart);
app.use("/categories", routes.category);
app.use("/orders", routes.order);

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

const port = process.env.PORT || 3000;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      role: "buyer",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      role: "seller",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};