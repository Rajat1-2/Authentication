import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GOOGLE_USER,
    pass: config.GOOGLE_APP_PASSWORD,
  },
});

/**
 * Verify transporter connection
 */
export async function verifyEmailTransporter() {
  try {
    await transporter.verify();
    console.log("✅ Email transporter is ready");
  } catch (error) {
    console.error("❌ Email transporter error:", error);
    throw error;
  }
}

/**
 * Send Email
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} [options.text]
 * @param {string} [options.html]
 */
export async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) {
    throw new Error("Recipient and subject are required.");
  }

  if (!text && !html) {
    throw new Error("Either text or html is required.");
  }

  const info = await transporter.sendMail({
    from: `"Authentication App" <${config.GOOGLE_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("✅ Email sent:", info.messageId);

  return info;
}

export default transporter;
