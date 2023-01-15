import { Router } from "express";
import {
  getAllServers,
  getFileHostUniqueServer,
  getUniqueServer,
} from "./controller.js";

const server = Router();

server
  .get("/list", getAllServers)
  .get("/:name", getUniqueServer)
  .get("/:name/file", getFileHostUniqueServer);

export default server;
