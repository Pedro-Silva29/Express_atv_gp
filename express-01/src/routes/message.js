import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );

  if (message === null) {
    return res.status(404).send({ error: "message not found" });
  }

  return res.send(message);
});

router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(result !== 0);
});

export default router;
