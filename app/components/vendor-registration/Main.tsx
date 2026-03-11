"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import FileDropField from "./FileDropZone";
import { validateFilesWithSize } from "@/helpers/validateFileWithSize";
import { sendContactAction } from "@/lib/mail/contactAction";

interface ContactFormData {
    vendorName: string;
    tradeLicense: string;
    classification: string;
    website: string;
    services: string;
    expertise: string;
    icvCertificate: FileList;
    companyDocuments: FileList;
    phone: string;
    email: string;
    address: string;
    additionalAttachments: FileList;
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        mode: "onChange",
    });

    const MAX_2MB = 2 * 1024 * 1024;
    const MAX_5MB = 5 * 1024 * 1024;
    const [fileResetKey, setFileResetKey] = useState(0);
    const [formStatus, setFormStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        try {
            setFormStatus(null);
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    Array.from(value).forEach((file) => formData.append(key, file));
                } else {
                    formData.append(key, value);
                }
            });

            const result = await sendContactAction(formData);
            if (!result?.success) {
                setFormStatus({
                    type: "error",
                    message: result?.message || "Error sending message. Please try again.",
                });
                return;
            }

            reset();
            setFileResetKey((prev) => prev + 1);
            setFormStatus({
                type: "success",
                message: result.message || "Message sent successfully!",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            const errorMessage =
                error instanceof Error && error.message
                    ? error.message
                    : "Error sending message. Please try again.";
            setFormStatus({ type: "error", message: errorMessage });
        }
    };

    return (
        <div className="w-full container pt-57px pb-12 md:pb-15 xl:py-57px">
            <form onSubmit={handleSubmit(onSubmit)} className="xl:space-y-[37px] space-y-[27px]">
                {/* Vendor Name & Trade License */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
                    <motion.div variants={moveUp()} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Vendor Name *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Vendor Name"
                            className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${
                                errors.vendorName ? "border-red-500":"border-[#C2C2C2]/35 focus:border-black"
                            }`}
                            {...register("vendorName", { required: "Vendor name is required" })}
                        />
                        {errors.vendorName && <p className="mt-1 text-sm text-red-600">{errors.vendorName.message}</p>}
                    </motion.div>

                    <motion.div variants={moveUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Trade License *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Trade License Number"
                            className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${
                                errors.tradeLicense ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"
                            }`}
                            {...register("tradeLicense", { required: "Trade license is required" })}
                        />
                        {errors.tradeLicense && <p className="mt-1 text-sm text-red-600">{errors.tradeLicense.message}</p>}
                    </motion.div>
                </div>

                {/* Classification & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
                    <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Classification (if applicable)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Classification"
                            className="w-full pb-3 dark:focus:border-white/50 border-b-2 border-[#C2C2C2]/35 focus:border-black focus:outline-none"
                            {...register("classification")}
                        />
                    </motion.div>

                    <motion.div variants={moveUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Website
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${
                                errors.website ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"
                            }`}
                            {...register("website", {
                                pattern: { value: /^https?:\/\/.+$/, message: "Enter a valid URL" },
                            })}
                        />
                        {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
                    </motion.div>
                </div>

                {/* Services Description */}
                <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                        Description of Services Provided
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Manufacturer, Supplier, Agent, Contracting, etc."
                        className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${
                            errors.services ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"
                        }`}
                        {...register("services", {
                            validate: (value) =>
                                !value || value.trim().length >= 5 || "Please enter a proper service description",
                        })}
                    />

                    {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>}
                </motion.div>

                {/* Expertise */}
                <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                        Areas of Expertise / Capabilities *
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Enter areas of expertise"
                        className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${
                            errors.expertise ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"
                        }`}
                        {...register("expertise", {
                            required: "Areas of expertise is required",
                            minLength: {
                                value: 10,
                                message: "Please provide more details",
                            },
                        })}
                    />
                    {errors.expertise && <p className="mt-2 text-sm text-red-600">{errors.expertise.message}</p>}
                </motion.div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
                    <motion.div variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-4">
                            ICV Certificate (if applicable)
                        </label>
                        <FileDropField
                            key={`icv-${fileResetKey}`}
                            register={register("icvCertificate", {
                                validate: validateFilesWithSize(MAX_2MB),
                            })}
                        />
                        {errors.icvCertificate && (
                            <p className="mt-2 text-sm text-red-600">{errors.icvCertificate.message}</p>
                        )}
                    </motion.div>

                    <motion.div variants={moveUp(0.7)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-4">
                            Brochures / Catalogues / Trade License / Company Profile *
                        </label>
                        <FileDropField
                            key={`company-${fileResetKey}`}
                            register={register("companyDocuments", {
                                required: "Company Documents are required",
                                validate: validateFilesWithSize(MAX_5MB),
                            })}
                            multiple
                        />
                        {errors.companyDocuments && (
                            <p className="mt-2 text-sm text-red-600">{errors.companyDocuments.message}</p>
                        )}
                    </motion.div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
                    <motion.div variants={moveUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Email *
                        </label>

                        <input
                            type="email"
                            placeholder="example@email.com"
                            className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797]
      ${errors.email ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"}
    `}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />

                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </motion.div>

                    <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Phone Number *
                        </label>

                        <input
                            type="tel"
                            placeholder="+971 50 123 4567"
                            className={`w-full pb-3 dark:focus:border-white/50 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797]
      ${errors.phone ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"}
    `}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\+?[0-9]{7,15}$/,
                                    message: "Enter a valid phone number",
                                },
                            })}
                        />

                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </motion.div>
                </div>

                <motion.div variants={moveUp(1.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                        Address
                    </label>

                    <textarea
                        rows={3}
                        placeholder="Enter your address"
                        className={`w-full pb-3 dark:focus:border-white/50 border-b-2 resize-none focus:outline-none placeholder:text-lg placeholder:text-[#979797]
    ${errors.address ? "border-red-500 " : "border-[#C2C2C2]/35 focus:border-black"}
  `}
                        {...register("address", {
                            validate: (value) => !value || value.length >= 5 || "Address should be at least 5 characters",
                        })}
                    />

                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </motion.div>

                {/* Additional Attachments */}
                <motion.div variants={moveUp(0.9)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-4">
                        Additional Attachments
                    </label>
                    <FileDropField
                        key={`additional-${fileResetKey}`}
                        register={register("additionalAttachments", {
                            validate: validateFilesWithSize(MAX_5MB),
                        })}
                        multiple
                    />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    {formStatus && (
                        <div
                            className={`mb-4 w-fit max-w-full px-4 py-3 rounded-lg text-sm border flex items-start justify-between gap-3 ${
                                formStatus.type === "success"
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700/40"
                                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700/40"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <motion.svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="shrink-0 mt-0.5"
                                >
                                    <motion.circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke={formStatus.type === "success" ? "#16A34A" : "#DC2626"}
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                    {formStatus.type === "success" ? (
                                        <motion.path
                                            d="M7.5 12.5L10.5 15.5L16.5 9.5"
                                            stroke="#16A34A"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
                                        />
                                    ) : (
                                        <motion.path
                                            d="M9 9L15 15M15 9L9 15"
                                            stroke="#DC2626"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
                                        />
                                    )}
                                </motion.svg>
                                <span>{formStatus.message}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormStatus(null)}
                                className="text-current/70 hover:text-current transition-colors duration-200 leading-none cursor-pointer"
                                aria-label="Close status message"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="hover:bg-primary cursor-pointer hover:text-white group flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 border border-foreground rounded-4xl"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                        <svg
                            width="26"
                            height="10"
                            viewBox="0 0 26 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:translate-x-2 transition-all duration-300"
                        >
                            <path d="M0 9.53027H24L15 0.530273" stroke="#7AC142" strokeWidth="1.5" strokeMiterlimit="10" />
                        </svg>
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default ContactForm;
