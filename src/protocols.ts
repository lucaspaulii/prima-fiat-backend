export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type InsertOrder = {
  orderNumber: number;
  deliveryDate: string;
  customer: string;
  model: string;
  color: string;
  chassi: string;
  seller: string;
};
