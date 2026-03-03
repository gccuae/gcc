"use server";

import { sendMailWithAttachments } from "./sendMailWithAttatchments";

export async function sendContactAction(formData: FormData) {
  try {
    const fields = {
      vendorName: formData.get("vendorName") as string,
      tradeLicense: formData.get("tradeLicense") as string,
      classification: formData.get("classification") as string,
      website: formData.get("website") as string,
      services: formData.get("services") as string,
      expertise: formData.get("expertise") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    const icv = formData.getAll("icvCertificate") as File[];
    const companyDocs = formData.getAll("companyDocuments") as File[];
    const additional = formData.getAll("additionalAttachments") as File[];

    const attachments = await buildAttachments([
      ...icv,
      ...companyDocs,
      ...additional,
    ]);

    await sendMailWithAttachments({
      to: "gccae1988@gmail.com",
      subject: `New Vendor Registration: ${fields.vendorName}`,
      fields,
      attachments,
    });

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("sendContactAction error:", error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Error sending message. Please try again.";

    return {
      success: false,
      message,
    };
  }
}


async function buildAttachments(files: File[]) {
  return Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );
}

