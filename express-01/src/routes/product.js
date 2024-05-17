import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const products = await req.context.models.Product.findAll();
  return res.send(products);
});

router.get("/:productId", async (req, res) => {
  const product = await req.context.models.Product.findByPk(req.params.productId);
  return res.send(product);
});

router.post("/", async (req, res) => {
  const product = await req.context.models.Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  });

  return res.send(product);
});

router.delete("/:productId", async (req, res) => {
  const result = await req.context.models.Product.destroy({
    where: { id: req.params.productId },
  });

  return res.send(result !== 0);
});

export default router;
