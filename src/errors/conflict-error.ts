import { ApplicationError } from "../protocols.js";

export function conflictError(message: string): ApplicationError {
  return {
    name: "ConflictError",
    message,
  };
}