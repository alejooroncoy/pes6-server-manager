import express from "express";
import config from "./config/index.js";
import server from "./apps/server/routes.js";
import psm from "./apps/psm/routes.js";

const app = express();

app.use("/server", server);
app.use("/psm", psm);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening in http://localhost:${config.port}/`);
});
