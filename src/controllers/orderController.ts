import { Request, Response } from "express";
import { InsertOrder } from "../protocols.js";
import { orderSchema } from "../schemas/orderSchema.js";
import { orderServices } from "../services/orderServices.js";

async function post(req: Request, res: Response) {
  const order = req.body as InsertOrder;

  const { error } = orderSchema.validate(order, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const orderPosted = await orderServices.post(order);
    return res.status(200).send(orderPosted);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

async function get(req: Request, res: Response) {
  try {
    const orders = await orderServices.get();
    return res.status(200).send(orders);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error);
    }
    return res.status(400).send(error);
  }
}

async function getByOrderId(req: Request, res: Response) {
  const orderId = req.params.orderId;
  try {
    const order = await orderServices.getByOrderId(Number(orderId));
    return res.status(200).send(order);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error);
    }
    return res.status(400).send(error);
  }
}

async function delayAndCreateNew(req: Request, res: Response) {
  const id = req.params.id;
  const date = req.query.newDate;
  const newDate = date + "+00:00";
  try {
    const newOrder = await orderServices.delayOrder(Number(id), newDate);
    return res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    if (error.name === "NotFoundError") {
      return res.status(404).send(error);
    }
    return res.status(400).send(error);
  }
}

async function deliver(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await orderServices.deliverOrder(Number(id));
    return res.status(200);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error);
    }
    return res.status(400).send(error);
  }
}

export const orderController = {
  post,
  get,
  getByOrderId,
  delayAndCreateNew,
  deliver,
};
