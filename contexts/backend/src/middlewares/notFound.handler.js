import { notFound } from "@hapi/boom";

export default function notFoundHandler(req, res) {
  const { output } = notFound("Not found");
  res.status(output.statusCode).json(output.payload);
}
