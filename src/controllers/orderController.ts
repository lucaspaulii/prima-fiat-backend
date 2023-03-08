import { Request, Response } from "express";
import { orderSchema } from "../schemas/orderSchema";

type InsertOrder = {
  orderNumber: Number;
  deliveryDate: String;
  customer: String;
  model: String;
  color: String;
  chassi: String;
  seller: String;
};

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
    //post repository here
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function get(req: Request, res: Response) {
  try {
    //get repository here
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getByOrderId(req: Request, res: Response) {
    const orderId = req.params;
    try {
        //get repository here
      } catch (error) {
        return res.status(400).send(error);
      }
}

async function updateStatusAndCreateNew(req: Request, res: Response) {
    const orderId = req.params;
    try {
        //get repository here
      } catch (error) {
        return res.status(400).send(error);
      }
}

export const orderController = {
  post,
  get,
  getByOrderId,
  updateStatusAndCreateNew,
};
