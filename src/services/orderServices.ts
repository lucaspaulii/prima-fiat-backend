import dayjs from "dayjs";
import { conflictError } from "../errors/conflict-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { InsertOrder } from "../protocols.js";
import { orderRepository } from "../repositories/orderRepositories.js";

async function post(insertOrder: InsertOrder) {
  const orderIdExists = await orderRepository.getByOrderId(
    insertOrder.orderNumber,
    false
  );

  if (orderIdExists.length !== 0) {
    throw conflictError("Número do pedido já inserido!");
  }

  const order = await orderRepository.post(insertOrder);
  if (!order) {
    throw conflictError("Número do pedido já inserido!");
  }

  return order;
}

async function get() {
  const orders = await orderRepository.get();
  if (!orders || orders.length === 0) {
    throw notFoundError();
  }
  return orders;
}

async function getByOrderId(orderId: number) {
  const order = await orderRepository.getByOrderId(orderId, true);
  if (!order || order.length === 0) {
    throw notFoundError();
  }
  return order;
}

async function deliverOrder(id: number) {
  const orderExists = await orderRepository.getById(id);
  if (!orderExists) {
    throw notFoundError();
  }
  if (orderExists.status === "DELIVERED" || orderExists.status === "DELAYED") {
    throw conflictError("Pedido já finalizado!");
  }

  await orderRepository.deliverStatus(id);
}

async function delayOrder(id: number, newDeliverDate: string) {
  const orderExists = await orderRepository.getById(id);
  if (!orderExists) {
    throw notFoundError();
  }
  if (orderExists.status === "DELIVERED" || orderExists.status === "DELAYED") {
    throw conflictError("Pedido já finalizado!");
  }
  const newOrder = await orderRepository.delayStatusAndCreate(
    id,
    newDeliverDate
  );
  return newOrder;
}

export const orderServices = {
  post,
  get,
  getByOrderId,
  deliverOrder,
  delayOrder,
};
