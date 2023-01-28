import { createWriteStream } from "node:fs";
import path from "node:path";
import { getPathCache } from "../config/cache.js";

export default function errorHandler() {
  const errorStream = createWriteStream(
    path.resolve(getPathCache(), "../error.txt")
  );

  const handleError = (error) => {
    errorStream.write(String(error));
    errorStream.end();
    process.exit(1);
  };

  process.on("unhandledRejection", handleError);
  process.on("uncaughtException", handleError);
}
