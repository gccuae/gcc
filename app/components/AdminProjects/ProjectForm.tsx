"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import Image from "next/image";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ImageCard from "./ImageCard";
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { RiAiGenerateText } from "react-icons/ri";
import { projectStatus } from "./projectStatus";

interface ProjectStatus {
  name: string;
  value: string;
}

interface ProjectFormProps {
  metaTitle: string;
  metaDescription: string;
  banner: string;
  bannerAlt: string;
  thumbnail: string;
  thumbnailAlt: string;
  title: string;
  slug: string;
  thumbDescription: string;
  latitude: string;
  longitude: string;
  firstSection: {
    images: string[];
  };
  secondSection: {
    title: string;
    progress: string;
    client: string;
    scopeOfWork: string;
    completionDate: string;
    projectValue: string;
    status: string;
    projectType: string;
    sector: string;
    location: string;
    superficie: string;
  };
  thirdSection: {
    items: {
      image: string;
      imageAlt: string;
      title: string;
      description: string;
    }[];
  };
  forthSection: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  fifthSection: {
    title: string;
    description: string;
    buttonTitle: string;
    buttonLink: string;
    map: string;
  };
  featuredProject: string;
  relatedService: string;
}

const ProjectForm = ({ editMode }: { editMode?: boolean }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<ProjectFormProps>();

  const { id } = useParams();
  const router = useRouter();

  const {
    fields: thirdSectionItems,
    append: thirdSectionAppend,
    remove: thirdSectionRemove,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });

  const {
    fields: forthSectionItems,
    append: forthSectionAppend,
    remove: forthSectionRemove,
  } = useFieldArray({
    control,
    name: "forthSection.items",
  });

  const [locationList, setLocationList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [projectTypeList, setProjectTypeList] = useState<
    { _id: string; name: string }[]
  >([]);
  const [sectorList, setSectorList] = useState<{ _id: string; name: string }[]>(
    []
  );

  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/projects/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  };

  const handleFetchProjectType = async () => {
    try {
      const response = await fetch("/api/admin/projects/project-type");
      if (response.ok) {
        const data = await response.json();
        setProjectTypeList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  };

  const handleFetchSector = async () => {
    try {
      const response = await fetch("/api/admin/projects/sector");
      if (response.ok) {
        const data = await response.json();
        setSectorList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  };

  const handleAddProject = async (data: ProjectFormProps) => {
    try {
      const response = await fetch(
        editMode ? `/api/admin/projects?id=${id}` : `/api/admin/projects`,
        {
          method: editMode ? "PATCH" : "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        router.push("/admin/projects");
      }
    } catch (error) {
      console.log("Error in adding project", error);
    }
  };

  const fetchProjectData = async () => {
    console.log(id, "niv");
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("thumbnail", data.data.thumbnail);
        setValue("thumbnailAlt", data.data.thumbnailAlt);
        setValue("title", data.data.title);
        setValue("thumbDescription", data.data.thumbDescription);
        setValue("slug", data.data.slug);
        setValue("latitude", data.data.latitude);
        setValue("longitude", data.data.longitude);
        setValue("featuredProject", data.data.featuredProject);
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("firstSection.images", data.data.firstSection.images);
        setImageUrls(data.data.firstSection.images);
        setValue("secondSection", {
          ...data.data.secondSection,
          sector: data.data.secondSection.sector?._id || "",
          location: data.data.secondSection.location?._id || "",
          projectType: data.data.secondSection.projectType?._id || "",
        });
        setValue("thirdSection.items", data.data.thirdSection.items);
        setValue("forthSection", data.data.forthSection);
        setValue("forthSection.items", data.data.forthSection.items);
        setValue("fifthSection", data.data.fifthSection);
        setValue("relatedService", data.data.relatedService._id);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching project data", error);
    }
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [reorderMode, setReorderMode] = useState(false);

  const handleImageUpload = async (uploadedUrl: string) => {
    setImageUrls((prev) => [...prev, uploadedUrl]);
    setValue("firstSection.images", [...imageUrls, uploadedUrl]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    setValue(
      "firstSection.images",
      imageUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (watch("slug") === undefined) return;
    const slug = watch("slug").replace(/\s+/g, "-");
    setValue("slug", slug);
  }, [watch("slug")]);

  const handleAutoGenerate = () => {
    const name = watch("title");
    if (!name) return;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
    setValue("slug", slug);
  };

  const getTaskPos = (id: string) =>
    imageUrls.findIndex((item: string) => item == id);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = getTaskPos(active.id as string);
    const newIndex = getTaskPos(over.id as string);

    const newPosition = arrayMove(imageUrls, oldIndex, newIndex);
    setImageUrls(newPosition);
    setValue("firstSection.images", newPosition);
  };

  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    const response = await fetch("/api/admin/expertise");
    const data = await response.json();
    setServices(data.data.secondSection.items);
  };

  useEffect(() => {
    fetchServices();
    if (editMode) {
      handleFetchLocation()
        .then(() => handleFetchSector())
        .then(() => handleFetchProjectType())
        .then(() => fetchProjectData());
    } else {
      handleFetchLocation()
        .then(() => handleFetchSector())
        .then(() => handleFetchProjectType());
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddProject)}
      >
        <AdminItemContainer>
          <Label className="" main>
            Banner
          </Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div className="flex gap-5 flex-col">
              <div>
                <Label className="">Banner</Label>
                <Controller
                  name="banner"
                  control={control}
                  rules={{ required: "Banner is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.banner && (
                  <p className="text-red-500">{errors.banner.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Banner Alt</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("bannerAlt")}
                />
              </div>

              <div>
                <Label className="">Thumbnail</Label>
                <Controller
                  name="thumbnail"
                  control={control}
                  rules={{ required: "Thumbnail is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.thumbnail && (
                  <p className="text-red-500">{errors.thumbnail.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Thumbnail Alt</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("thumbnailAlt")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Thumbnail Description</Label>
                <Textarea
                  placeholder="Thumbnail Description"
                  {...register("thumbDescription")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input type="text" placeholder="Title" {...register("title")} />
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
                  {...register("slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                      message:
                        "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                    },
                  })}
                />
                {errors.slug && (
                  <p className="text-red-500">{errors.slug.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Latitude</Label>
                <Input
                  type="text"
                  placeholder="Latitude"
                  {...register("latitude")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Longitude</Label>
                <Input
                  type="text"
                  placeholder="Longitude"
                  {...register("longitude")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>First Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div>
              <div className="flex justify-between items-center">
                <Label className="block text-sm">Images</Label>
                <Button
                  className="bg-green-600 text-white"
                  type="button"
                  onClick={() => setReorderMode(!reorderMode)}
                >
                  {reorderMode ? <GiConfirmed /> : <TbReorder />}
                </Button>
              </div>
              <div className="mt-2">
                <ImageUploader
                  onChange={handleImageUpload}
                  deleteAfterUpload={true}
                  multiple={true}
                />
              </div>

              {reorderMode && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={imageUrls}
                      strategy={verticalListSortingStrategy}
                    >
                      {imageUrls.map((url, index) => (
                        <ImageCard
                          key={url}
                          url={url}
                          index={index}
                          handleRemoveImage={handleRemoveImage}
                          id={url}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}

              {!reorderMode && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative h-40">
                      <Image
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-full w-full object-cover rounded-lg"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>
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
                <Label className="font-bold">Progress</Label>
                <Input
                  type="text"
                  placeholder="Progress"
                  {...register("secondSection.progress")}
                />
                {errors.secondSection?.progress && (
                  <p className="text-red-500">
                    {errors.secondSection?.progress.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Client</Label>
                <Input
                  type="text"
                  placeholder="Client"
                  {...register("secondSection.client", {
                    required: "Client is required",
                  })}
                />
                {errors.secondSection?.client && (
                  <p className="text-red-500">
                    {errors.secondSection?.client.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Scope Of Work</Label>
                <Input
                  type="text"
                  placeholder="Scope Of Work"
                  {...register("secondSection.scopeOfWork")}
                />
                {errors.secondSection?.scopeOfWork && (
                  <p className="text-red-500">
                    {errors.secondSection?.scopeOfWork.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Completion Date</Label>
                <Input
                  type="text"
                  placeholder="Completion Date"
                  {...register("secondSection.completionDate", {
                    required: "Completion Date is required",
                  })}
                />
                {errors.secondSection?.completionDate && (
                  <p className="text-red-500">
                    {errors.secondSection?.completionDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Project Value</Label>
                <Input
                  type="text"
                  placeholder="Project Value"
                  {...register("secondSection.projectValue")}
                />
                {errors.secondSection?.projectValue && (
                  <p className="text-red-500">
                    {errors.secondSection?.projectValue.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Superficie</Label>
                <Input
                  type="text"
                  placeholder="Superficie"
                  {...register("secondSection.superficie")}
                />
                {errors.secondSection?.superficie && (
                  <p className="text-red-500">
                    {errors.secondSection?.superficie.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">Status</Label>
                <Controller
                  name={`secondSection.status`}
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem> */}
                        {projectStatus.map(
                          (status: ProjectStatus, index: number) => (
                            <SelectItem key={index} value={status.value}>
                              {status.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.secondSection?.status && (
                  <p className="text-red-500">
                    {errors.secondSection?.status.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">Location</Label>
                <Controller
                  name={`secondSection.location`}
                  control={control}
                  // rules={{ required: "Location is required" }}
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
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.secondSection?.location && (
                  <p className="text-red-500">
                    {errors.secondSection?.location.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Project Type</Label>
                <Controller
                  name={`secondSection.projectType`}
                  control={control}
                  rules={{ required: "Project Type is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypeList.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.secondSection?.projectType && (
                  <p className="text-red-500">
                    {errors.secondSection?.projectType.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="">Sector</Label>
                <Controller
                  name={`secondSection.sector`}
                  control={control}
                  rules={{ required: "Sector is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorList.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.secondSection?.sector && (
                  <p className="text-red-500">
                    {errors.secondSection?.sector.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Third Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div>
                <Label className="font-bold">Items</Label>
                <div className="border p-2 rounded-md flex flex-col gap-5">
                  {thirdSectionItems.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                    >
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => thirdSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Image</Label>
                          <Controller
                            name={`thirdSection.items.${index}.image`}
                            control={control}
                            rules={{ required: "Image is required" }}
                            render={({ field }) => (
                              <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.thirdSection?.items?.[index]?.image && (
                            <p className="text-red-500">
                              {
                                errors.thirdSection?.items?.[index]?.image
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Alt Tag</Label>
                            <Input
                              type="text"
                              placeholder="Alt Tag"
                              {...register(
                                `thirdSection.items.${index}.imageAlt`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.imageAlt && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.imageAlt
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Title"
                              {...register(
                                `thirdSection.items.${index}.title`,
                                {
                                  required: "Value is required",
                                }
                              )}
                            />
                            {errors.thirdSection?.items?.[index]?.title && (
                              <p className="text-red-500">
                                {
                                  errors.thirdSection?.items?.[index]?.title
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Label className="font-bold">Description</Label>
                          <Controller
                            name={`thirdSection.items.${index}.description`}
                            control={control}
                            render={({ field }) => {
                              return (
                                <ReactQuill
                                  theme="snow"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      thirdSectionAppend({
                        title: "",
                        image: "",
                        imageAlt: "",
                        description: "",
                      })
                    }
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Forth Section</Label>

          <div className="p-5 rounded-md flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`forthSection.title`)}
                />
                {errors.forthSection?.title && (
                  <p className="text-red-500">
                    {errors.forthSection?.title.message}
                  </p>
                )}
              </div>
            </div>

            <Label>Items</Label>
            <div className="border p-2 rounded-md">
              {forthSectionItems.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0"
                >
                  <div className="absolute top-2 right-2">
                    <RiDeleteBinLine
                      onClick={() => forthSectionRemove(index)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="pl-3 font-bold">Title</Label>
                      <Input
                        type="text"
                        placeholder="Title"
                        {...register(`forthSection.items.${index}.title`)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-2">
                      <Label className="pl-3 font-bold">Description</Label>
                      <Textarea
                        placeholder="Description"
                        {...register(`forthSection.items.${index}.description`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <Button
                type="button"
                addItem
                onClick={() =>
                  forthSectionAppend({ title: "", description: "" })
                }
              >
                Add Item
              </Button>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Fifth Section</Label>

          <div className="p-5 rounded-md flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register(`fifthSection.title`)}
                />
                {errors.fifthSection?.title && (
                  <p className="text-red-500">
                    {errors.fifthSection?.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register(`fifthSection.description`)}
                />
              </div>
              {errors.fifthSection?.description && (
                <p className="text-red-500">
                  {errors.fifthSection?.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Title</Label>
                <Input
                  type="text"
                  placeholder="Button Title"
                  {...register(`fifthSection.buttonTitle`)}
                />
              </div>
              {errors.fifthSection?.buttonTitle && (
                <p className="text-red-500">
                  {errors.fifthSection?.buttonTitle.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Button Link</Label>
                <Input
                  type="text"
                  placeholder="Button Link"
                  {...register(`fifthSection.buttonLink`)}
                />
              </div>
              {errors.fifthSection?.buttonLink && (
                <p className="text-red-500">
                  {errors.fifthSection?.buttonLink.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Map Link</Label>
                <Input
                  type="text"
                  placeholder="Map Link"
                  {...register(`fifthSection.map`)}
                />
              </div>
              {errors.fifthSection?.map && (
                <p className="text-red-500">
                  {errors.fifthSection?.map.message}
                </p>
              )}
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <div className="flex flex-col gap-2 p-5">
            <Label className="">Featured Project</Label>
            <Controller
              name={`featuredProject`}
              control={control}
              // rules={{ required: "Featured Project is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.featuredProject && (
              <p className="text-red-500">{errors.featuredProject.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 p-5">
            <Label className="">Related Service</Label>
            <Controller
              name={`relatedService`}
              control={control}
              // rules={{ required: "Related Service is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service: { _id: string; title: string }) => (
                      <SelectItem key={service._id} value={service._id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.relatedService && (
              <p className="text-red-500">{errors.relatedService.message}</p>
            )}
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

        <div className="flex">
          <Button
            type="submit"
            className="cursor-pointer text-white text-[16px] w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
