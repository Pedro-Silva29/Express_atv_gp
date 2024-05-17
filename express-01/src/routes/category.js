import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await req.context.models.Category.findAll();
  return res.send(categories);
});

router.get("/:categoryId", async (req, res) => {
  const category = await req.context.models.Category.findByPk(req.params.categoryId);
  return res.send(category);
});

router.post("/", async (req, res) => {
  const category = await req.context.models.Category.create({
    name: req.body.name,
  });

  return res.send(category);
});

router.delete("/:categoryId", async (req, res) => {
  const result = await req.context.models.Category.destroy({
    where: { id: req.params.categoryId },
  });

  return res.send(result !== 0);
});

export default router;
