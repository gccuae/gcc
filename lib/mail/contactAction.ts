"use server";

import { sendMailWithAttachments } from "./sendMailWithAttatchments";

const MAX_2MB = 2 * 1024 * 1024;
const MAX_5MB = 5 * 1024 * 1024;

export async function sendContactAction(formData: FormData) {
  const fields = {
    vendorName: formData.get("vendorName") as string,
    tradeLicense: formData.get("tradeLicense") as string,
    classification: formData.get("classification") as string,
    website: formData.get("website") as string,
    services: formData.get("services") as string,
    expertise: formData.get("expertise") as string,
    contactDetails: formData.get("contactDetails") as string,
  };

  const icv = formData.getAll("icvCertificate") as File[];
  const companyDocs = formData.getAll("companyDocuments") as File[];
  const additional = formData.getAll("additionalAttachments") as File[];

  console.log("icv", icv, "companyDocs", companyDocs, "additional", additional);


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
}


async function buildAttachments(files: File[]) {
  return Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );
}

