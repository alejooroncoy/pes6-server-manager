import psmServices from "./services.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getPsmBin = async (req, res) => {
  const { version } = req.query;
  const binPath = await psmServices.getPsmFileBin(version);
  res.download(binPath);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const uploadPsmBin = async (req, res) => {
  const { version } = req.query;
  const binUploaded = await psmServices.uploadPsmFileBin(req, version);
  res.status(201).send(binUploaded);
};
