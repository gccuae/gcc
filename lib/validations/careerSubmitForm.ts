import z from "zod";

const fileTypes = [".pdf", ".doc", ".docx"];

const fileSchema = z
  .any()
  .refine((files) => files && files.length > 0, "This file is required")
  .refine(
    (files) => !files?.[0] || files[0].size <= 5 * 1024 * 1024,
    "File size must be less than 20MB"
  )
  .refine(
    (files) =>
      !files?.[0] ||
      fileTypes.some((type) => files[0].name.toLowerCase().endsWith(type)),
    "Only PDF, DOC, and DOCX files are allowed"
  );

export const jobApplicationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{6,14}$/, "Please enter a valid phone number"),
  nationality: z
    .string()
    .trim()
    .min(1, "Nationality is required")
    .min(3, "Nationality must be at least 3 characters"),
  // hasConstructionExperience: z
  //   .string()
  //   .trim()
  //   .min(1, "Current location is required")
  //   .min(3, "Current location must be at least 3 characters"),
  currentLocation: z
    .string()
    .trim()
    .min(1, "Current location is required")
    .min(3, "Current location must be at least 3 characters"),
  coverLetter: fileSchema,
  resume: fileSchema,
});
