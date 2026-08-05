"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, Controller, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { RiAiGenerateText } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TinyEditor from "../common/TinyMceEditor";

interface OpeningFormProps {
  status: string;
  metaTitle: string;
  metaDescription: string;
  script: string;
  firstSection: {
    hidden: boolean;
    title: string;
    jobTitle: string;
    department: string;
    location: string;
    employmentType: string;
    slug: string;
  };
  secondSection: {
    hidden: boolean;
    title: string;
    description: string;
  };
  thirdSection: {
    hidden: boolean;
    title: string;
    description: string;
  };
  forthSection: {
    hidden: boolean;
    title: string;
    description: string;
  };
}

const OpeningsForm = ({ editMode }: { editMode?: boolean }) => {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<OpeningFormProps>();

  const firstStatus = watch("firstSection.hidden");
  const secondStatus = watch("secondSection.hidden");
  const thirdStatus = watch("thirdSection.hidden");
  const forthStatus = watch("forthSection.hidden");

  const toggleSection = (section: string, value: boolean) => {
    setValue(`${section}.hidden` as Path<OpeningFormProps>, !value);
  };

  const [departmentList, setDepartmentList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [locationList, setLocationList] = useState<
    { _id: string; name: string }[]
  >([]);

  const handleFetchDepartment = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/department");
      if (response.ok) {
        const data = await response.json();
        setDepartmentList(data.data);
      }
    } catch (error) {
      console.log("Error fetching department", error);
    }
  };

  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  };

  const handleAddOpening = async (data: OpeningFormProps) => {
    try {
      const response = await fetch(
        editMode
          ? `/api/admin/current-openings?id=${id}`
          : `/api/admin/current-openings`,
        {
          method: editMode ? "PATCH" : "POST",
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        router.push("/admin/current-openings");
      }
    } catch (error) {
      console.log("Error in adding about", error);
    }
  };

  const fetchOpeningData = async () => {
    try {
      const response = await fetch(`/api/admin/current-openings?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("script", data.data.script);
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("thirdSection", data.data.thirdSection);
        setValue("forthSection", data.data.forthSection);
        setValue("status", data.data.status);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching opening data", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      handleFetchDepartment()
        .then(() => handleFetchLocation())
        .then(() => fetchOpeningData());
    } else {
      handleFetchDepartment().then(() => handleFetchLocation());
    }
  }, []);

  useEffect(() => {
    if (watch("firstSection.slug") === undefined) return;
    const slug = watch("firstSection.slug").replace(/\s+/g, "-");
    setValue("firstSection.slug", slug);
  }, [watch("firstSection.slug")]);

  const handleAutoGenerate = () => {
    const name = watch("firstSection.jobTitle");
    if (!name) return;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
    setValue("firstSection.slug", slug);
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddOpening)}
      >
        {/* <input type="hidden" {...register("status", { required: "Status is required" })} /> */}

        <div className="flex items-center gap-2 justify-end">
          <Label className="">Status</Label>
          <Controller
            name={`status`}
            control={control}
            rules={{ required: "Status is required" }} // 👈 also validate here since Controller doesn't use register()
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue=""
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"draft"}>Draft</SelectItem>
                  <SelectItem value={"published"}>Published</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button
            type="button"
            onClick={() =>
              handleSubmit((data) =>
                handleAddOpening({ ...data, status: watch("status") }),
              )()
            }
            className="bg-green-700"
          >
            Save
          </Button>
        </div>
        {errors.status && (
          <p className="text-red-500 text-right">{errors.status.message}</p>
        )}
        <AdminItemContainer>
          <Label main>First Section</Label>

          {firstStatus ? (
            <FaEyeSlash
              onClick={() => toggleSection("firstSection", firstStatus)}
              className="absolute top-4 right-4 text-gray-400 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => toggleSection("firstSection", firstStatus)}
              className="absolute top-4 right-4 text-green-600 cursor-pointer"
            />
          )}

          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {/* <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div> */}
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Job Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("firstSection.jobTitle", {
                    required: "Title is required",
                  })}
                />
                {errors.firstSection?.jobTitle && (
                  <p className="text-red-500">
                    {errors.firstSection?.jobTitle.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="flex gap-2 items-center mb-1">
                  Slug
                  <div
                    className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                    onClick={handleAutoGenerate}
                  >
                    <p>Auto Generate</p>
                    <RiAiGenerateText />
                  </div>
                </Label>
                <Input
                  type="text"
                  placeholder="Slug"
                  {...register("firstSection.slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                      message:
                        "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                    },
                  })}
                />
                {errors.firstSection?.slug && (
                  <p className="text-red-500">
                    {errors.firstSection?.slug.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">Department</Label>
                <Controller
                  name={`firstSection.department`}
                  control={control}
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentList.map((item, index) => (
                          <SelectItem key={index} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.department && (
                  <p className="text-red-500">
                    {errors.firstSection?.department.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Location</Label>
                <Controller
                  name={`firstSection.location`}
                  control={control}
                  rules={{ required: "Location is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationList.map((item, index) => (
                          <SelectItem key={index} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.location && (
                  <p className="text-red-500">
                    {errors.firstSection?.location.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Employment Type</Label>
                <Controller
                  name={`firstSection.employmentType`}
                  control={control}
                  rules={{ required: "Employment Type is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"Full Time"}>Full Time</SelectItem>
                        <SelectItem value={"Part Time"}>Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.firstSection?.employmentType && (
                  <p className="text-red-500">
                    {errors.firstSection?.employmentType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>

          {secondStatus ? (
            <FaEyeSlash
              onClick={() => toggleSection("secondSection", secondStatus)}
              className="absolute top-4 right-4 text-gray-400 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => toggleSection("secondSection", secondStatus)}
              className="absolute top-4 right-4 text-green-600 cursor-pointer"
            />
          )}

          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("secondSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.secondSection?.title && (
                  <p className="text-red-500">
                    {errors.secondSection?.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Controller
                  name="secondSection.description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Third Section</Label>

          {thirdStatus ? (
            <FaEyeSlash
              onClick={() => toggleSection("thirdSection", thirdStatus)}
              className="absolute top-4 right-4 text-gray-400 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => toggleSection("thirdSection", thirdStatus)}
              className="absolute top-4 right-4 text-green-600 cursor-pointer"
            />
          )}

          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("thirdSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.thirdSection?.title && (
                  <p className="text-red-500">
                    {errors.thirdSection?.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                {/* <Controller name={`thirdSection.description`} control={control} render={({ field }) => {
                                    return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                }} /> */}
                <Controller
                  name="thirdSection.description"
                  control={control}
                  render={({ field }) => (
                    <TinyEditor
                      setNewsContent={field.onChange}
                      newsContent={field.value}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Forth Section</Label>

          {forthStatus ? (
            <FaEyeSlash
              onClick={() => toggleSection("forthSection", forthStatus)}
              className="absolute top-4 right-4 text-gray-400 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => toggleSection("forthSection", forthStatus)}
              className="absolute top-4 right-4 text-green-600 cursor-pointer"
            />
          )}

          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("forthSection.title")}
                />
                {/* {errors.forthSection?.title && <p className='text-red-500'>{errors.forthSection?.title.message}</p>} */}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                {/* <Controller name={`forthSection.description`} control={control} render={({ field }) => {
                                    return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                }} /> */}
                <Controller
                  name="forthSection.description"
                  control={control}
                  render={({ field }) => (
                    <TinyEditor
                      setNewsContent={field.onChange}
                      newsContent={field.value}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <div className="flex flex-col gap-2">
          <Label className="pl-3 font-bold">Meta Title</Label>
          <Input
            type="text"
            placeholder="Meta Title"
            {...register("metaTitle")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="pl-3 font-bold">Meta Description</Label>
          <Input
            type="text"
            placeholder="Meta Description"
            {...register("metaDescription")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="pl-3 font-bold">Script</Label>
          <Textarea {...register("script")} />
        </div>

        {/* <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div> */}
      </form>
    </div>
  );
};

export default OpeningsForm;
