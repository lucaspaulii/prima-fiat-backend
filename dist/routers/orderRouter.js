import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
var router = Router();
router
    .get("/orders", orderController.get)
    .get("/order/:orderId", orderController.getByOrderId)
    .post("/order", orderController.post)
    .put("/delay/:id", orderController.delayAndCreateNew)
    .put("/delivered/:id", orderController.deliver);
export default router;
