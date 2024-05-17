import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const orders = await req.context.models.Order.findAll({
    where: { userId: req.context.me.id },
    include: [req.context.models.Product],
  });
  return res.send(orders);
});

router.get("/:orderId", async (req, res) => {
  const order = await req.context.models.Order.findByPk(req.params.orderId, {
    include: [req.context.models.Product],
  });

  return res.send(order);
});

router.post("/", async (req, res) => {
  const order = await req.context.models.Order.create({
    address: req.body.address,
    totalAmount: req.body.totalAmount,
    userId: req.context.me.id,
  });

  const products = await req.context.models.Product.findAll({
    where: {
      id: req.body.productIds,
    },
  });

  await order.addProducts(products);

  return res.send(order);
});

router.delete("/:orderId", async (req, res) => {
  const result = await req.context.models.Order.destroy({
    where: { id: req.params.orderId },
  });

  return res.send(result !== 0);
});

export default router;
