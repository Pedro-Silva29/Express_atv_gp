import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await req.context.models.Cart.findAll({
    where: { userId: req.context.me.id },
    include: [req.context.models.Product],
  });
  return res.send(carts);
});

router.post("/", async (req, res) => {
  const cart = await req.context.models.Cart.create({
    userId: req.context.me.id,
  });

  return res.send(cart);
});

router.post("/:cartId/products", async (req, res) => {
  const cart = await req.context.models.Cart.findByPk(req.params.cartId);
  const product = await req.context.models.Product.findByPk(req.body.productId);
  await cart.addProduct(product);

  return res.send(cart);
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  const cart = await req.context.models.Cart.findByPk(req.params.cartId);
  const product = await req.context.models.Product.findByPk(req.params.productId);
  await cart.removeProduct(product);

  return res.send(cart);
});

export default router;
