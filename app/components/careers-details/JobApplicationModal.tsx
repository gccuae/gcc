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
};

const JobApplicationModalForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(
    null
  );
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    reset();
    setCoverLetterFile(null);
    setResumeFile(null);

    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full">
      <h2 className="text-5xl leading-1h-title text-black dark:text-white mb-[36px]">
        Apply for Site Engineer Position
      </h2>

      <div className="w-full border-t-[1px] border-smgray mb-[36px]" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-[37px]">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
              className="w-full px-0 py-3 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none"
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
            <div className="relative border-b border-smgray hover:border-black dark:hover:border-white/50 transition-colors">
              <input
                {...register("coverLetter", {
                  required: "Cover letter is required",
                })}
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="coverLetter"
                onChange={(e) =>
                  setCoverLetterFile(e.target.files?.[0] || null)
                }
              />
              <label
                htmlFor="coverLetter"
                className="flex items-center gap-3 py-4 cursor-pointer"
              >
                <Image
                  src="/assets/img/careers/upload-icon.svg"
                  alt="Upload Icon"
                  width={24}
                  height={30}
                />
                <div className="flex flex-col md:flex-row gap-1 md:items-center">
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
            <div className="relative border-b border-smgray hover:border-black dark:hover:border-white/50 transition-colors">
              <input
                {...register("resume", { required: "Resume is required" })}
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="resume"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="resume"
                className="flex items-center gap-3 py-4 cursor-pointer"
              >
                <Image
                  src="/assets/img/careers/upload-icon.svg"
                  alt="Upload Icon"
                  width={24}
                  height={30}
                />
                <div className="flex flex-col md:flex-row gap-1 md:items-center">
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
          <button
            type="submit"
            className="hover:bg-accent hover:border-accent dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent group max-w-[143px]"
          >
            <span className="font-normal">SUBMIT</span>
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
