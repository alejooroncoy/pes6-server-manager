import proposalServices from "./services.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const sendProposal = async (req, res) => {
  const data = await proposalServices.sendEmail(req.body);
  res.status(data.status).json(data);
};

export default sendProposal;
