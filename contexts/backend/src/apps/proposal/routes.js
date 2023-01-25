import { Router } from "express";
import sendProposal from "./controller.js";

const proposal = Router();

proposal.post("/", sendProposal);

export default proposal;
