import express from "express";
import cors from "cors";
import config from "./config/index.js";
import server from "./apps/server/routes.js";
import psm from "./apps/psm/routes.js";
import noFoundHandler from "./middlewares/notFound.handler.js";
import proposal from "./apps/proposal/routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/proposal", proposal);
app.use("/server", server);
app.use("/psm", psm);

app.use(noFoundHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening in http://localhost:${config.port}/`);
});
