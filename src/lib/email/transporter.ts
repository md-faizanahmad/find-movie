import nodemailer from "nodemailer";

import { env } from "@/lib/env/server";

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
});
