import { getResendClient } from "./mailer";
import { VendorEmail } from "../../templates/vendorTemplate";
import type { ReactElement } from "react";

interface Attachment {
  filename: string;
  content: string; // base64
}

export async function sendMailWithAttachments({
  to,
  subject,
  fields,
  attachments,
}: {
  to: string | string[];
  subject: string;
  fields: any;
  attachments: Attachment[];
}) {
  const resend = getResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject,
    react: VendorEmail(fields) as ReactElement,
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    const errorMessage =
      typeof error === "object" && error && "message" in error
        ? String((error as { message?: string }).message)
        : "Failed to send email";
    throw new Error(errorMessage);
  }

  return data;
}
