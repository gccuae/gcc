import { resend } from "./mailer";
import { CareerTemplate } from "@/templates/careerTemplate";
import { VendorEmail } from "@/templates/vendorTemplate";
import { ContactTemplate } from "@/templates/contactTemplate";
import type { ReactElement } from "react";

interface Attachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export async function sendMailWithAttachments({
  type,
  to,
  subject,
  fields,
  attachments,
}: {
  type: string;
  to: string | string[];
  subject: string;
  fields: any;
  attachments?: Attachment[];
}) {

  if (type === "career") {
    const { error } = await resend.emails.send({
      from: "no-reply@gcc.ae",
      to,
      subject,
      react: CareerTemplate(fields) as ReactElement,
      attachments,
    });
    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }
  } else if (type === "contact") {
    const { error } = await resend.emails.send({
      from: "no-reply@gcc.ae",
      to,
      subject,
      react: ContactTemplate(fields) as ReactElement,
    });
    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }
  } else {
    const { error } = await resend.emails.send({
      from: "no-reply@gcc.ae",
      to,
      subject,
      react: VendorEmail(fields) as ReactElement,
      attachments,
    });
    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }
  }
}
