import { config as configDotenv } from "dotenv";

configDotenv();

const config = {
  dropboxRefreshToken: process.env.DROPBOX_REFRESH_TOKEN,
  dropboxClientId: process.env.DROPBOX_CLIENT_ID,
  dropboxClientSecret: process.env.DROPBOX_CLIENT_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseApiKey: process.env.SUPABASE_API_KEY,
  emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
  emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
  emailjsUserId: process.env.EMAILJS_USER_ID,
  emailjsAccessToken: process.env.EMAILJS_ACCESS_TOKEN,
  port: process.env.PORT || 5000,
};

export default config;
