"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema } from "../../../lib/validations/careerSubmitForm";
import { z } from "zod";
import Image from "next/image";

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
        <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 mb-14 font-light">
          Submit your resume and we&apos;ll keep it in our talent pool for
          future opportunities.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name"
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
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
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
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
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
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
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
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
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
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
                className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
              />
              {errors.hasConstructionExperience && (
                <p className="text-red-500 text-sm">
                  {errors.hasConstructionExperience.message}
                </p>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cover Letter */}
            <div className="space-y-2">
              <div className="relative border-b border-smgray focus:border-black">
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
                  <div className="text-gray-500 group-hover:text-gray-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2">
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
              <div className="relative border-b border-smgray focus:border-black">
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
                  <div className="text-gray-500 group-hover:text-gray-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2">
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
          <div className="flex justify-end pt-8">
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobApplicationForm;
