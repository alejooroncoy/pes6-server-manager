import { Router } from "express";
import { getPsmBin, uploadPsmBin } from "./controller.js";

const psm = Router();

psm.get("/bin", getPsmBin).post("/bin", uploadPsmBin);

export default psm;
