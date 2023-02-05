import { createWriteStream, existsSync } from "node:fs";
import path from "node:path";
import { getPathCache, initialCache } from "../config/cache.js";

export default async function errorHandler() {
  if(!existsSync(getPathCache())) await initialCache();

  const errorStream = createWriteStream(
    path.resolve(getPathCache(), "../error.txt")
  );

  const handleError = (error) => {
    console.log(error)
    errorStream.write(String(error));
    errorStream.end();
    process.exit(1);
  };

  process.on("unhandledRejection", handleError);
  process.on("uncaughtException", handleError);
}
