"use client";
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  hasConstructionExperience: string;
  coverLetter: FileList;
  resume: FileList;
}

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 mb-14 font-light">
          Submit your resume and we&apos;ll keep it in our talent pool for future opportunities.
        </h2>

        <div>
          <div onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* First Row - Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <input
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: { value: 2, message: 'First name must be at least 2 characters' }
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <input
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Second Row - Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
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
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* Third Row - Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <input
                  {...register('nationality', {
                    required: 'Nationality is required',
                    minLength: { value: 2, message: 'Nationality must be at least 2 characters' }
                  })}
                  type="text"
                  placeholder="Nationality"
                  className="w-full px-0 py-4 text-lg border-0 border-b border-smgray bg-transparent focus:border-gray-400 focus:outline-none placeholder-gray-500 transition-colors duration-200"
                />
                {errors.nationality && (
                  <p className="text-red-500 text-sm">{errors.nationality.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <select
                  {...register('hasConstructionExperience', {
                    required: 'Please select your construction experience'
                  })}
                  className="w-full px-0 py-4 text-lg border-0 border-b-1 border-smgray bg-transparent focus:border-gray-400 focus:outline-none text-gray-500 transition-colors duration-200"
                  defaultValue=""
                >
                  <option value="" disabled>Do You Have Experience In Construction Industry</option>
                  <option value="yes" className="text-gray-900">Yes, I have experience</option>
                  <option value="no" className="text-gray-900">No, I don&apos;t have experience</option>
                  <option value="some" className="text-gray-900">Some experience</option>
                </select>
                {errors.hasConstructionExperience && (
                  <p className="text-red-500 text-sm">{errors.hasConstructionExperience.message}</p>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cover Letter Upload */}
              <div className="space-y-2">
                <div className="relative border-b border-smgray focus:border-black">
                  <input
                    {...register('coverLetter', {
                      required: 'Cover letter is required',
                      validate: {
                        fileSize: (files) => {
                          if (files && files[0] && files[0].size > 20 * 1024 * 1024) {
                            return 'File size must be less than 20MB';
                          }
                          return true;
                        },
                        fileType: (files) => {
                          if (files && files[0]) {
                            const allowedTypes = ['.pdf', '.doc', '.docx'];
                            const fileName = files[0].name.toLowerCase();
                            const isValidType = allowedTypes.some(type => fileName.endsWith(type));
                            if (!isValidType) {
                              return 'Only PDF, DOC, and DOCX files are allowed';
                            }
                          }
                          return true;
                        }
                      }
                    })}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                    id="coverLetter"
                  />
                  <label htmlFor="coverLetter" className="flex items-center space-x-3 py-6 cursor-pointer group">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                      <span className="text-lg">Upload Your Cover Letter</span>
                      <span className="text-sm block">(Pdf, Doc, Docx | Max File Size: 20 MB)</span>
                    </div>
                  </label>
                </div>
                {errors.coverLetter && (
                  <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>
                )}
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <div className="relative border-b border-smgray focus:border-black">
                  <input
                    {...register('resume', {
                      required: 'Resume is required',
                      validate: {
                        fileSize: (files) => {
                          if (files && files[0] && files[0].size > 20 * 1024 * 1024) {
                            return 'File size must be less than 20MB';
                          }
                          return true;
                        },
                        fileType: (files) => {
                          if (files && files[0]) {
                            const allowedTypes = ['.pdf', '.doc', '.docx'];
                            const fileName = files[0].name.toLowerCase();
                            const isValidType = allowedTypes.some(type => fileName.endsWith(type));
                            if (!isValidType) {
                              return 'Only PDF, DOC, and DOCX files are allowed';
                            }
                          }
                          return true;
                        }
                      }
                    })}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="resume"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center space-x-3 py-6 cursor-pointer group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                      <span className="text-lg">Upload Your Resume</span>
                      <span className="text-sm block">(Pdf, Doc, Docx | Max File Size: 20 MB)</span>
                    </div>
                  </label>
                </div>
                {errors.resume && (
                  <p className="text-red-500 text-sm">{errors.resume.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-8">
              <button type="button" onClick={handleSubmit(onSubmit)}
                className="hover:bg-accent hover:border-accent dark:hover:bg-transparent hover:text-white flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl dark:bg-transparent group 2xl:min-w-[230px]" >
                <span className="font-normal">SUBMIT</span>
                <svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-all duration-300">
                  <path d="M0 9.53027H24L15 0.530273" stroke="#7AC142" strokeWidth="1.5" strokeMiterlimit="10" className="group-hover:stroke-white transition-all duration-300" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobApplicationForm;