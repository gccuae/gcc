"use client";

import React, { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema } from "../../../lib/validations/careerSubmitForm";
import { z } from "zod";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import { components, DropdownIndicatorProps, SingleValue } from "react-select";
import { ChevronDown } from "lucide-react";
import { careerData } from "./type";

type PositionOption = {
  value: string;
  label: string;
};

const Select = dynamic(() => import("react-select"), {
  ssr: false,
}) as typeof import("react-select").default<PositionOption>;

type FormData = z.infer<typeof jobApplicationSchema>;


const isDarkMode = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

const DropdownIndicator = (props: DropdownIndicatorProps<PositionOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size={22} className="select-down-arrow" />
    </components.DropdownIndicator>
  );
};

const JobApplicationForm = ({ title, jobs }: { title: string, jobs: careerData['openings'] }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaError, setCaptchaError] = useState("");
  // const positionOptions: PositionOption[] = jobs.map((job) => ({
  //   value: job.firstSection.jobTitle,
  //   label: job.firstSection.jobTitle,
  // }));


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    const captchaValue = recaptchaRef?.current?.getValue();
    if (!captchaValue) {
      setCaptchaError("Please verify yourself to continue");
      return;
    }
    setCaptchaError("");

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("nationality", data.nationality || "");
    formData.append("currentLocation", data.currentLocation);
    formData.append("position", data.position);

    if (coverLetterFile) {
      formData.append("coverLetter", coverLetterFile);
    }

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const response = await fetch("/api/admin/general-career", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Something went wrong, please try again");
      return;
    }

    setIsSubmitted(true);
    reset();
    setCoverLetterFile(null);
    setResumeFile(null);
    recaptchaRef.current?.reset();
  };

  const [coverLetterFile, setCoverLetterFile] = React.useState<File | null>(
    null,
  );
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const coverLetterRegister = register("coverLetter");
  const resumeRegister = register("resume");

  return (
    <section className="pt-37px md:pt-47px xl:pt-57px pb-12 md:pb-15 xl:pb-57px bg-light-white dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl xl:text-5xl leading-1h-title text-black dark:text-white mb-3 lg:mb-14 font-light"
        >
          {title}
        </motion.h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            if (isSubmitted) setIsSubmitted(false);
          }}
          className="space-y-0 lg:space-y-8 font-light"
        >
          {/* First Row */}
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 text-black dark:text-white"
          >
            <div className="space-y-2">
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name *"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
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
                placeholder="Last Name *"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

          </motion.div>

          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 text-black dark:text-white"
          >

            <div className="space-y-2">

              <div className="space-y-2">
                <input
                  {...register("position")}
                  type="text"
                  placeholder="Applied Position *"
                  className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
                />
                {errors.position && (
                  <p className="text-red-500 text-sm">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* <Controller
    name="position"
    control={control}
    render={({ field }) => (
      <Select
        components={{ DropdownIndicator }}
        className="w-full"
        classNamePrefix="react-select"
        options={positionOptions}
        placeholder="Select Position *"
        value={
          positionOptions.find(
            (option) => option.value === field.value,
          ) || null
        }
        onChange={(selected: SingleValue<PositionOption>) => {
          field.onChange(selected?.value || "");
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            width: "100%",
            backgroundColor: "transparent",
            borderTop: "0",
            borderLeft: "0",
            borderRight: "0",
            borderBottom: isDarkMode()
              ? "1px solid rgba(255,255,255,0.2)"
              : "1px solid rgb(229 231 235)",
            borderRadius: 0,
            boxShadow: "none",
            minHeight: "62px",
            height: "62px",
            padding: 0,

            "&:hover": {
              borderBottom: isDarkMode()
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid #000",
            },

            ...(state.isFocused && {
              borderBottom: isDarkMode()
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid #000",
            }),
          }),

          valueContainer: (base) => ({
            ...base,
            padding: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }),

          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            color: isDarkMode() ? "#fff" : "#000",
            fontSize: "var(--text-lg)",
            fontWeight: 300,
          }),

          placeholder: (base) => ({
            ...base,
            color: isDarkMode() ? "#fff" : "var(--para-color)",
            fontWeight: 300,
            fontSize: "var(--text-lg)",
            marginLeft:"0px"
          }),

          singleValue: (base) => ({
            ...base,
            color: isDarkMode() ? "#fff" : "#000",
            fontWeight: 300,
            fontSize: "var(--text-lg)",
          }),

          menu: (base) => ({
            ...base,
            marginTop: 0,
            borderRadius: 0,
            overflow: "hidden",
            zIndex: 50,
          }),

          menuList: (base) => ({
            ...base,
            padding: 0,
          }),

          option: (base, state) => ({
            ...base,
            padding: "16px",
            fontSize: "var(--text-lg)",
            fontWeight: 300,
            cursor: "pointer",
            backgroundColor: state.isSelected ? "#EE3524" : "#fff",
            color: state.isSelected ? "#fff" : "#000",

            "&:hover": {
              backgroundColor: "#f3f3f3",
              color: "#000",
            },
          }),

          dropdownIndicator: (base) => ({
            ...base,
            padding: 0,
            color: isDarkMode() ? "#fff" : "#000",
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />
    )}
  /> */}

              {/* {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )} */}
            </div>

            <div className="space-y-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </motion.div>

          {/* Second Row */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 text-black dark:text-white"
          >
            <div className="space-y-2">
              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="Phone Number *"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                {...register("nationality")}
                type="text"
                placeholder="Nationality *"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
              />
              {errors.nationality && (
                <p className="text-red-500 text-sm">
                  {errors.nationality.message}
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
            className="grid grid-cols-1 lg:gap-8 text-black dark:text-white"
          >

            <div className="space-y-2">
              <input
                {...register("currentLocation")}
                type="text"
                placeholder="Current Location *"
                className="w-full px-0 py-4 text-lg border-0 border-b dark:border-white/20 bg-transparent focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none placeholder-para-color dark:focus:border-white/50 dark:placeholder-white transition-colors duration-300"
              />
              {errors.currentLocation && (
                <p className="text-red-500 text-sm">
                  {errors.currentLocation.message}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 text-para-color dark:text-white"
          >

            {/* Resume */}
            <div className="space-y-2">
              <div className="relative border-b dark:border-white/20 focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none transition-colors duration-300">
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
                  <div className="text-para-color dark:text-white transition-colors flex flex-col xl:flex-row xl:items-center justify-between xl:gap-2">
                    <span className="text-lg">
                      {resumeFile ? resumeFile.name : "Upload Your Resume *"}
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

            {/* Cover Letter */}
            <div className="space-y-2">
              <div className="relative border-b dark:border-white/20 focus:border-black hover:border-black dark:hover:border-white/50 focus:outline-none transition-colors duration-300">
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
                  <div className="text-para-color dark:text-white transition-colors flex flex-col xl:flex-row xl:items-center justify-between xl:gap-2 ">
                    <span className="text-lg">
                      {coverLetterFile
                        ? coverLetterFile.name
                        : "Upload Your Cover Letter *"}
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
              {/* {errors.coverLetter && (
                <p className="text-red-500 text-sm">
                  {errors.coverLetter.message as string}
                </p>
              )} */}
            </div>

            

            {/* reCAPTCHA */}
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <motion.div
                variants={moveUp(0.7)}
                initial="hidden"
                whileInView="show"
                className="max-lg:mt-5"
                viewport={{ once: true }}
              >
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  ref={recaptchaRef}
                />
                {captchaError && (
                  <p className="mt-2 text-sm text-red-500">{captchaError}</p>
                )}
              </motion.div>
            )}

          </motion.div>


          {/* Submit */}
          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-end pt-4 lg:pt-8"
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
              className="hover:bg-accent cursor-pointer hover:border-accent dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent group 2xl:min-w-[230px]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-normal">SUBMITTING...</span>
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div >
    </section >
  );
};

export default JobApplicationForm;
