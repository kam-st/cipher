import nodemailer from "nodemailer";

import { MailerType } from "@/types";

const noReplyTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NOREPLY_USERNAME as string,
    pass: process.env.EMAIL_NOREPLY_PASS as string,
  },
});

export const noReplyMailer = async ({
  from,
  to,
  subject,
  emailHtml,
}: MailerType) => {
  const options = {
    from: "Cipher <noreply@aaginnovations.com>",
    to: to,
    subject: subject,
    html: emailHtml,
  };

  await noReplyTransporter.sendMail(options);
  noReplyTransporter.close();
};
