"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  message: string;
  acceptPrivacy: boolean;
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

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);

      // Reset form after successful submission
      reset();
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xl:space-y-[37px] space-y-[27px] "
      >
        {/* First Name and Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <label
              htmlFor="firstName"
              className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px"
            >
              {" "}
              First Name{" "}
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className={`w-full pb-3 border-b-2 transition-colors duration-200 focus:outline-none  placeholder:text-lg placeholder:text-[#979797] dark:placeholder:text-white placeholder:font-normal placeholder:leading-lh-base ${
                errors.firstName
                  ? "border-red-500 bg-red-50"
                  : "border-[#C2C2C2]/35 focus:border-black"
              }`}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "First name can only contain letters",
                },
              })}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <label
              htmlFor="lastName"
              className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className={`w-full pb-3 border-b-2 transition-colors duration-200 focus:outline-none placeholder:text-lg placeholder:text-[#979797] dark:placeholder:text-white placeholder:font-normal placeholder:leading-lh-base ${
                errors.lastName
                  ? "border-red-500 bg-red-50"
                  : "border-[#C2C2C2]/35 focus:border-black"
              }`}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Last name can only contain letters",
                },
              })}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Email and Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-10">
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <label
              htmlFor="email"
              className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Id"
              className={`w-full pb-3 border-b-2 transition-colors duration-200 focus:outline-none placeholder:text-lg placeholder:text-[#979797] dark:placeholder:text-white placeholder:font-normal placeholder:leading-lh-base ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-[#C2C2C2]/35 focus:border-black"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <label
              htmlFor="contact"
              className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px"
            >
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              placeholder="Enter Mobile/Phone Number"
              className={`w-full pb-3 border-b-2 transition-colors duration-200 focus:outline-none placeholder:text-lg placeholder:text-[#979797] dark:placeholder:text-white placeholder:font-normal placeholder:leading-lh-base ${
                errors.contact
                  ? "border-red-500 bg-red-50"
                  : "border-[#C2C2C2]/35 focus:border-black"
              }`}
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })}
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Message Field */}
        <motion.div
          variants={moveUp(0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <label
            htmlFor="message"
            className="block text-base font-normal leading-lh-base text-black dark:text-white/70 mb-27px xl:mb-37px"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Write Message To Us [Max 1000 Characters]"
            maxLength={1000}
            className={`w-full pb-3 border-b-2 transition-colors duration-200 focus:outline-none resize-vertical placeholder:text-lg placeholder:text-[#979797] dark:placeholder:text-white placeholder:font-normal placeholder:leading-lh-base ${
              errors.message
                ? "border-red-500 bg-red-50"
                : "border-[#C2C2C2]/35 focus:border-black"
            }`}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
              maxLength: {
                value: 1000,
                message: "Message cannot exceed 1000 characters",
              },
            })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </motion.div>

        {/* Privacy Checkbox */}

        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0"
        >
          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-start space-x-3"
          >
            <input
              type="checkbox"
              id="acceptPrivacy"
              className={`mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                errors.acceptPrivacy ? "border-red-500" : ""
              }`}
              {...register("acceptPrivacy", {
                required: "You must accept the privacy policy and terms",
              })}
            />
            <label
              htmlFor="acceptPrivacy"
              className="text-base font-light text-para-color dark:text-white"
            >
              I ACCEPT THE PRIVACY AND TERMS
            </label>
          </motion.div>
          {errors.acceptPrivacy && (
            <p className="text-sm text-red-600 -mt-2">
              {errors.acceptPrivacy.message}
            </p>
          )}

          {/* Submit Button */}
          <motion.div
            variants={moveUp(0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex md:justify-end"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer hover:bg-primary dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all
     duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  SUBMIT ENQUIRE
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
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

export default ContactForm;
