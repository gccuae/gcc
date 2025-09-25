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

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    reset();
    setCoverLetterFile(null);
    setResumeFile(null);
  };

  const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(
    null
  );
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);

  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl lg:text-5xl leading-1h-title text-black dark:text-white mb-3 lg:mb-14 font-light"
        >
          Submit your resume and we&apos;ll keep it in our talent pool for
          future opportunities.
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0 lg:space-y-8">
          {/* First Row */}
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-8"
          >
            <div className="space-y-2">
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                {...register("lastName")}
                type="text"
                placeholder="Last Name"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Second Row */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg-gap-8"
          >
            <div className="space-y-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="Phone Number"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Third Row */}
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg-gap-8"
          >
            <div className="space-y-2">
              <input
                {...register("nationality")}
                type="text"
                placeholder="Nationality"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.nationality && (
                <p className="text-red-500 text-sm">
                  {errors.nationality.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                {...register("hasConstructionExperience")}
                type="text"
                placeholder="Current Location"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-foreground dark:placeholder-white transition-colors duration-300"
              />
              {errors.hasConstructionExperience && (
                <p className="text-red-500 text-sm">
                  {errors.hasConstructionExperience.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* File Upload */}
          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg-gap-8"
          >
            {/* Cover Letter */}
            <div className="space-y-2">
              <div className="relative border-b border-smgray focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none transition-colors duration-300">
                <input
                  {...register("coverLetter", {
                    required: "Cover letter is required",
                    validate: {
                      fileSize: (files) =>
                        (files && files[0]?.size <= 20 * 1024 * 1024) ||
                        "File size must be < 20MB",
                      fileType: (files) => {
                        const allowed = [".pdf", ".doc", ".docx"];
                        return (
                          !files?.[0] ||
                          allowed.some((ext) =>
                            files[0].name.toLowerCase().endsWith(ext)
                          ) ||
                          "Only PDF, DOC, DOCX allowed"
                        );
                      },
                    },
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
                  className="flex items-center space-x-3 py-6 cursor-pointer group"
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src="/assets/img/careers/upload-icon.svg"
                      alt="Upload Icon"
                      width={24}
                      height={30}
                    />
                  </div>
                  <div className="text-foreground dark:text-white transition-colors flex flex-col xl:flex-row xl:items-center justify-between xl:gap-2 ">
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
              <div className="relative border-b border-smgray focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none transition-colors duration-300">
                <input
                  {...register("resume", {
                    required: "Resume is required",
                    validate: {
                      fileSize: (files) =>
                        (files && files[0]?.size <= 20 * 1024 * 1024) ||
                        "File size must be < 20MB",
                      fileType: (files) => {
                        const allowed = [".pdf", ".doc", ".docx"];
                        return (
                          !files?.[0] ||
                          allowed.some((ext) =>
                            files[0].name.toLowerCase().endsWith(ext)
                          ) ||
                          "Only PDF, DOC, DOCX allowed"
                        );
                      },
                    },
                  })}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="resume"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                />

                <label
                  htmlFor="resume"
                  className="flex items-center space-x-3 py-6 cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/assets/img/careers/upload-icon.svg"
                      alt="Upload Icon"
                      width={24}
                      height={30}
                    />
                  </div>
                  <div className="text-foreground dark:text-white transition-colors flex flex-col xl:flex-row xl:items-center justify-between xl:gap-2">
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
          </motion.div>

          {/* Submit */}
          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-end pt-4 lg:pt-8"
          >
            <button
              type="submit"
              className="hover:bg-accent hover:border-accent dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent group 2xl:min-w-[230px]"
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
    </section>
  );
};

export default JobApplicationForm;
