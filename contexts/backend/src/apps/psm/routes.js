import { Router } from "express";
import notContentHandler from "../../middlewares/notContent.handler.js";
import {
  getPsmBin,
  getPsmUltimate,
  getPsmUltimateUpdater,
  uploadPsmBin,
  uploadPsmUltimate,
} from "./controller.js";

const psm = Router();

psm
  .get("/bin", getPsmBin)
  .post("/bin", uploadPsmBin)
  .get("/ultimate", getPsmUltimate)
  .get("/ultimate/updater", getPsmUltimateUpdater)
  .use("/ultimate/updater", notContentHandler)
  .post("/ultimate", uploadPsmUltimate);

export default psm;
