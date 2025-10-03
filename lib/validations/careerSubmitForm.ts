import z from "zod";

const fileTypes = [".pdf", ".doc", ".docx"];

const fileSchema = z
  .any()
  .refine((files) => files && files.length > 0, "This file is required")
  .refine(
    (files) => !files?.[0] || files[0].size <= 20 * 1024 * 1024,
    "File size must be less than 20MB"
  )
  .refine(
    (files) =>
      !files?.[0] ||
      fileTypes.some((type) => files[0].name.toLowerCase().endsWith(type)),
    "Only PDF, DOC, and DOCX files are allowed"
  );

export const jobApplicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  hasConstructionExperience: z
    .string()
    .min(2, "Experience must be at least 2 characters"),
  coverLetter: fileSchema,
  resume: fileSchema,
});
