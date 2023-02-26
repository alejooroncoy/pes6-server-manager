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
  const { version, platform } = req.query;
  const release = await psmServices.getPsmUltimateRelease(version);
  const { url } = await psmServices.getAsset(release.assets, platform);
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

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getPsmUltimateUpdater = async (req, res, next) => {
  const { version, platform, arch } = req.query;
  const updater = await psmServices.getPsmUltimateUpdater(
    version,
    platform,
    arch
  );
  if (!updater) {
    next();
    return;
  }
  res.status(200).json(updater);
};
