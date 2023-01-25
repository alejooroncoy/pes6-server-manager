import emailJs from "../../libs/emailjs.js";

const proposalServices = {
  async sendEmail(body) {
    const { name, opinion, proposal } = body;
    const data = await emailJs.send(name, opinion, proposal);
    return data;
  },
};

export default proposalServices;
