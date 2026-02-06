import { resend } from "./mailer";
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
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: VendorEmail(fields) as ReactElement,
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send email");
  }

  return data;
}
