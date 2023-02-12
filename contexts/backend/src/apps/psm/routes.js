import { Router } from "express";
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
  .post("/ultimate", uploadPsmUltimate);

export default psm;
