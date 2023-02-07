import psmServices from "./services.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getPsmBin = async (req, res) => {
  const { version } = req.query;
  const url = await psmServices.getPsmFileBin(version);
  res.redirect(url);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const uploadPsmBin = async (req, res) => {
  const { version } = req.query;
  const binUploaded = await psmServices.uploadPsmFileBin(req.body, version);
  res.status(201).send(binUploaded);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getPsmUltimate = async (req, res) => {
  const { version } = req.query;
  const url = await psmServices.getPsmFileUltimate(version);
  res.redirect(url);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const uploadPsmUltimate = async (req, res) => {
  const { version } = req.query;
  const ultimateUploaded = await psmServices.uploadPsmFileUltimate(
    req.body,
    version
  );
  res.status(201).send(ultimateUploaded);
};
