import Joi from "joi";

export const orderSchema = Joi.object({
    orderNumber: Joi.number().required(),
    deliveryDate: Joi.string().required(),
    customer: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
    chassi: Joi.string().required(),
    seller: Joi.string().required(),
})