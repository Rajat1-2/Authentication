import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

/**
 * Confirms that the configured Gmail account can authenticate and send mail.
 */
export async function verifyEmailTransporter() {
  await transporter.verify();
}

/**
 * Sends an email from the configured Gmail account.
 *
 * @param {{ to: string, subject: string, text?: string, html?: string }} options
 * @returns {Promise<import("nodemailer").SentMessageInfo>}
 */
export async function sendEmail({ to, subject, text,html }) {
  if (!to || !subject) {
    throw new Error("Email recipient and subject are required");
  }

  if (!text && !html) {
    throw new Error("Email text or HTML content is required");
  }

  return transporter.sendMail({
    from: config.GOOGLE_USER,
    to,
    subject,
    text,
    html,
  });
}

export default transporter;
