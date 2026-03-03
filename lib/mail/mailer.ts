import { Resend } from "resend";

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email service is not configured (missing RESEND_API_KEY).");
  }

  return new Resend(process.env.RESEND_API_KEY);
}
