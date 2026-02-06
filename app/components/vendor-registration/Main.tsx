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
    contactDetails: string;
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


    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    Array.from(value).forEach((file) =>
                        formData.append(key, file)
                    );
                } else {
                    formData.append(key, value);
                }
            });

            await sendContactAction(formData);
            reset();
            setFileResetKey((prev) => prev + 1);
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error sending message. Please try again.");
        }
    };

    return (
        <div className="w-full container py-57px">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="xl:space-y-[37px] space-y-[27px]"
            >
                {/* Vendor Name & Trade License */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
                    <motion.div variants={moveUp()} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Vendor Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Vendor Name"
                            className={`w-full pb-3 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${errors.vendorName ? "border-red-500 bg-red-50" : "border-[#C2C2C2]/35 focus:border-black"
                                }`}
                            {...register("vendorName", { required: "Vendor name is required" })}
                        />
                        {errors.vendorName && <p className="mt-1 text-sm text-red-600">{errors.vendorName.message}</p>}
                    </motion.div>

                    <motion.div variants={moveUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                            Trade License
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Trade License Number"
                            className={`w-full pb-3 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${errors.tradeLicense ? "border-red-500 bg-red-50" : "border-[#C2C2C2]/35 focus:border-black"
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
                            className="w-full pb-3 border-b-2 border-[#C2C2C2]/35 focus:border-black focus:outline-none"
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
                            className={`w-full pb-3 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${errors.website ? "border-red-500 bg-red-50" : "border-[#C2C2C2]/35 focus:border-black"
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
                        className={`w-full pb-3 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${errors.services ? "border-red-500 bg-red-50" : "border-[#C2C2C2]/35 focus:border-black"
                            }`}
                        {...register("services", { required: "Service description is required" })}
                    />
                    {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>}
                </motion.div>

                {/* Expertise */}
                <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                        Areas of Expertise / Capabilities
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Enter areas of expertise"
                        className="w-full pb-3 border-b-2 border-[#C2C2C2]/35 focus:border-black focus:outline-none placeholder:text-lg placeholder:text-[#979797]"
                        {...register("expertise")}
                    />
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
                            <p className="mt-2 text-sm text-red-600">
                                {errors.icvCertificate.message}
                            </p>
                        )}
                    </motion.div>

                    <motion.div variants={moveUp(0.7)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-4">
                            Brochures / Catalogues / Company Profile
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
                            <p className="mt-2 text-sm text-red-600">
                                {errors.companyDocuments.message}
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* Contact Details */}
                <motion.div variants={moveUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <label className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px">
                        Contact Details
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Email, phone number, address"
                        className={`w-full pb-3 border-b-2 focus:outline-none placeholder:text-lg placeholder:text-[#979797] ${errors.contactDetails ? "border-red-500 bg-red-50" : "border-[#C2C2C2]/35 focus:border-black"
                            }`}
                        {...register("contactDetails", { required: "Contact details are required" })}
                    />
                    {errors.contactDetails && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactDetails.message}</p>
                    )}
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="hover:bg-primary cursor-pointer hover:text-white group flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 border border-foreground rounded-4xl"
                    >
                        {isSubmitting ? "Submitting..." : "SUBMIT VENDOR REGISTRATION"}
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
                            />
                        </svg>
                    </button>
                </motion.div>
            </form>

        </div>
    );
};

export default ContactForm;
