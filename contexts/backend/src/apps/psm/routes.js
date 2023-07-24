import { Router } from "express";
import notContentHandler from "../../middlewares/notContent.handler.js";
import {
  getPsmLite,
  getPsmUltimate,
  getPsmUltimateUpdater,
  uploadPsmUltimate,
} from "./controller.js";

const psm = Router();

psm
  .get("/lite", getPsmLite)
  .get("/ultimate", getPsmUltimate)
  .get("/ultimate/updater", getPsmUltimateUpdater)
  .use("/ultimate/updater", notContentHandler)
  .post("/ultimate", uploadPsmUltimate);

export default psm;
