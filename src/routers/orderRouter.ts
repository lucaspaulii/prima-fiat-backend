import { Router } from "express";
import { orderController } from "../controllers/orderController";

const router = Router();

router
  .get("/orders", orderController.get)
  .get("/order/:orderId", orderController.getByOrderId)
  .post("/order", orderController.post)
  .put("/delay/:orderId", orderController.updateStatusAndCreateNew);

export default router;
