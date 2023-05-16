import { ApplicationError } from "../protocols.js";

export function invalidInput(): ApplicationError {
  return {
    name: "InvalidInputError",
    message: "Valor inválido",
  };
}