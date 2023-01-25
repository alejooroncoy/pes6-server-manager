import fetch from "node-fetch";
import config from "../config/index.js";

const emailJs = {
  async send(name, opinion, proposal) {
    const data = {
      service_id: config.emailjsServiceId,
      template_id: config.emailjsTemplateId,
      user_id: config.emailjsUserId,
      accessToken: config.emailjsAccessToken,
      template_params: {
        user_name: name,
        opinion,
        proposal,
      },
    };
    const response = await fetch(
      `https://api.emailjs.com/api/v1.0/email/send`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          origin: "http://localhost",
        },
      }
    );
    const textContent = await response.text();
    return {
      status: response.status,
      text: textContent,
    };
  },
};

export default emailJs;
