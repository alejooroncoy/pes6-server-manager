import { Router } from "express";
import {
  getPsmBin,
  getPsmUltimate,
  uploadPsmBin,
  uploadPsmUltimate,
} from "./controller.js";

const psm = Router();

psm
  .get("/bin", getPsmBin)
  .post("/bin", uploadPsmBin)
  .get("/ultimate", getPsmUltimate)
  .post("/ultimate", uploadPsmUltimate);

export default psm;
