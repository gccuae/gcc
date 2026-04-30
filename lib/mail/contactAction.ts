"use server";

import Vendor from "@/app/models/Vendor";
import { getToEmail } from "@/helpers/getToEmail";
import { sendMailWithAttachments } from "@/helpers/sendMailWithAttatchments";
import { uploadToDropbox } from "@/lib/connectDropbox";

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

    const filterFiles = (files: File[]) =>
      files.filter((file) => file && file.size > 0);

    // const icv = formData.getAll("icvCertificate") as File[];
    // const companyDocs = formData.getAll("companyDocuments") as File[];
    // const additional = formData.getAll("additionalAttachments") as File[];

    const icv = filterFiles(formData.getAll("icvCertificate") as File[]);
    const companyDocs = filterFiles(formData.getAll("companyDocuments") as File[]);
    const additional = filterFiles(formData.getAll("additionalAttachments") as File[]);

    const uploadFiles = async (files: File[], folder: string) => {
      return Promise.all(
        files.map(async (file) => {
          const path = `/uploads/${folder}/${Date.now()}-${file.name}`;
          return await uploadToDropbox(file, path);
        })
      );
    };

    // ✅ Upload files
    const icvUrls = await uploadFiles(icv, "icv");
    const companyDocsUrls = await uploadFiles(companyDocs, "company");
    const additionalUrls = await uploadFiles(additional, "additional");

    // ✅ Save to DB
    await Vendor.create({
      ...fields,
      icvCertificate: icvUrls,
      companyDocuments: companyDocsUrls,
      additionalAttachments: additionalUrls,
    });

    const attachments = await buildAttachments([
      ...icv,
      ...companyDocs,
      ...additional,
    ]);

    const toEmail = await getToEmail("vendor");

    await sendMailWithAttachments({
      type: "vendor",
      to: toEmail,
      subject: `Website - Vendor Registration`,
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
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type
    }))
  );
}

