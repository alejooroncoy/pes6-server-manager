import { badImplementation } from "@hapi/boom";

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const { output } = badImplementation(err.message);
  res.status(output.statusCode).json(output.payload);
}
