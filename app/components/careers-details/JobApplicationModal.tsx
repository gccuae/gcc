"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema } from "../../../lib/validations/careerSubmitForm";
import { z } from "zod";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";

type FormData = z.infer<typeof jobApplicationSchema>;

type Props = {
  onSuccess?: () => void;
  onSubmittingChange?: (isSubmitting: boolean) => void;
};

const JobApplicationModalForm = ({
  onSuccess,
  onSubmittingChange,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(
    null
  );
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const closeTimeoutRef = React.useRef<number | null>(null);
  const coverLetterRegister = register("coverLetter");
  const resumeRegister = register("resume");

  React.useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    await Promise.resolve(data);

    setIsSubmitted(true);
    reset();
    setCoverLetterFile(null);
    setResumeFile(null);

    if (onSuccess) {
      closeTimeoutRef.current = window.setTimeout(() => {
        onSuccess();
      }, 1200);
    }
  };

  return (
    <div className="w-full">
      <h2 className=" text-4xl xl:text-5xl leading-1h-title text-black dark:text-white mb-[36px]">
        Apply for Site Engineer Position
      </h2>

      <div className="w-full border-t-[1px] dark:border-white/20 mb-[36px]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          if (isSubmitted) setIsSubmitted(false);
        }}
        className="space-y-[37px]"
      >
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.firstName && (
              <p className="text-primary text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.lastName && (
              <p className="text-primary text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.email && (
              <p className="text-primary text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="Phone Number"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.phoneNumber && (
              <p className="text-primary text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <input
              {...register("nationality")}
              type="text"
              placeholder="Nationality"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.nationality && (
              <p className="text-primary text-sm">
                {errors.nationality.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("hasConstructionExperience")}
              type="text"
              placeholder="Current Location"
              className="w-full px-0 py-3 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white"
            />
            {errors.hasConstructionExperience && (
              <p className="text-primary text-sm">
                {errors.hasConstructionExperience.message}
              </p>
            )}
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cover Letter */}
          <div className="space-y-2">
            <div className="relative border-b dark:border-white/20 hover:border-black dark:hover:border-white/50 transition-colors">
              <input
                {...coverLetterRegister}
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="coverLetter"
                onChange={(e) => {
                  coverLetterRegister.onChange(e);
                  setCoverLetterFile(e.target.files?.[0] || null);
                  setIsSubmitted(false);
                }}
              />
              <label
                htmlFor="coverLetter"
                className="flex items-center gap-3 py-4 cursor-pointer text-para-color dark:text-white"
              >
                <Image
                  src="/assets/img/careers/upload-icon.svg"
                  alt="Upload Icon"
                  width={24}
                  height={30}
                />
                <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                  <span className="text-lg">
                    {coverLetterFile
                      ? coverLetterFile.name
                      : "Upload Your Cover Letter"}
                  </span>
                  {coverLetterFile ? (
                    ""
                  ) : (
                    <span className="text-sm">
                      (Pdf, Doc, Docx | Max File Size: 20 MB)
                    </span>
                  )}
                </div>
              </label>
            </div>
            {errors.coverLetter && (
              <p className="text-red-500 text-sm">
                {errors.coverLetter.message as string}
              </p>
            )}
          </div>

          {/* Resume */}
          <div className="space-y-2">
            <div className="relative border-b dark:border-white/20 hover:border-black dark:hover:border-white/50 transition-colors">
              <input
                {...resumeRegister}
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="resume"
                onChange={(e) => {
                  resumeRegister.onChange(e);
                  setResumeFile(e.target.files?.[0] || null);
                  setIsSubmitted(false);
                }}
              />
              <label
                htmlFor="resume"
                className="flex items-center gap-3 py-4 cursor-pointer text-para-color dark:text-white"
              >
                <Image
                  src="/assets/img/careers/upload-icon.svg"
                  alt="Upload Icon"
                  width={24}
                  height={30}
                />
                <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                  <span className="text-lg">
                    {resumeFile ? resumeFile.name : "Upload Your Resume"}
                  </span>
                  {resumeFile ? (
                    ""
                  ) : (
                    <span className="text-sm">
                      (Pdf, Doc, Docx | Max File Size: 20 MB)
                    </span>
                  )}
                </div>
              </label>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm">
                {errors.resume.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-end pt-3"
        >
          {isSubmitted && (
            <div className="mr-4 self-center flex items-center gap-3 px-4 py-2 rounded-xl border border-green-200 dark:border-green-500/40 bg-green-50 dark:bg-green-900/20">
              <motion.svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#16A34A"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
                <motion.path
                  d="M7.5 12.5L10.5 15.5L16.5 9.5"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
                />
              </motion.svg>
              <p className="text-sm text-green-700 dark:text-green-300">
                Application submitted successfully.
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="hover:bg-accent hover:border-accent dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent group max-w-[143px]"
          >
            <span className="font-normal">
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </span>
            <svg
              width="26"
              height="10"
              viewBox="0 0 26 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-2 transition-all duration-300"
            >
              <path
                d="M0 9.53027H24L15 0.530273"
                stroke="#7AC142"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                className="group-hover:stroke-white transition-all duration-300"
              />
            </svg>
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default JobApplicationModalForm;
