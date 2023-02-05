import serverServices from "./services.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllServers = async (req, res, next) => {
  const servers = await serverServices.getAll();
  if (servers.status === 0) {
    next(Error("Failed to obtain available servers"));
    return;
  }
  res.status(servers.status).json(servers);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getUniqueServer = async (req, res) => {
  const { name } = req.params;
  const server = await serverServices.getUnique(name);
  res.status(server.status).json(server);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const getFileHostUniqueServer = async (req, res, next) => {
  const { name } = req.params;
  const fileHost = await serverServices.getFileHostUnique(name);
  if (fileHost.error) return next(fileHost.error);
  const content = await fileHost.data.text();
  return res.status(200).send(content);
};
