import dayjs from "dayjs";
import prisma from "../database/database.js";
import { InsertOrder } from "../protocols.js";

async function post(insertOrder: InsertOrder) {
  const order = await prisma.delivery.create({
    data: insertOrder,
  });
  return order;
}

async function get() {
  const now = dayjs().format("YYYY-MM-DD") + "T00:00:00.000Z";
  const tomorow = dayjs().add(1, "d").format("YYYY-MM-DD") + "T00:00:00.000Z";
  const todaysOrder = await prisma.delivery.findMany({
    where: {
      deliveryDate: {
        lte: tomorow,
        gte: now,
      },
    },
    orderBy: {
      deliveryDate: "asc",
    },
  });
  return todaysOrder;
}

async function getByOrderId(orderId: number, restricted: Boolean) {
  const order = restricted
    ? await prisma.delivery.findMany({
        where: {
          orderNumber: orderId,
          status: "TOBEDELIVERED",
        },
      })
    : await prisma.delivery.findMany({
        where: {
          orderNumber: orderId,
        },
      });
  return order;
}

async function getById(id: number) {
  const order = prisma.delivery.findUnique({
    where: {
      id,
    },
  });
  return order;
}

async function deliverStatus(id: number) {
  await prisma.delivery.update({
    where: {
      id,
    },
    data: {
      status: "DELIVERED",
    },
  });
}

async function delayStatusAndCreate(id: number, newDeliverDate: string) {
  const order = await prisma.delivery.update({
    where: {
      id,
    },
    data: {
      status: "DELAYED",
    },
  });
  delete order.id;
  delete order.status;
  const newOrder = orderRepository.post({
    ...order,
    deliveryDate: newDeliverDate,
  });
  return newOrder;
}

export const orderRepository = {
  post,
  get,
  getByOrderId,
  getById,
  deliverStatus,
  delayStatusAndCreate,
};
