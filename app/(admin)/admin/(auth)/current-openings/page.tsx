"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller, Path } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { Textarea } from "@/components/ui/textarea";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";


interface CurrentOpeningsPageProps {
  metaTitle: string;
  metaDescription: string;
  script: string;
  firstSection: {
    hidden: boolean;
    pageTitle: string;
    description: string;
    image: string;
    imageAlt: string;
  },
  secondSection: {
    hidden: boolean;
    mainTitle: string;
    subTitle: string;
  };
  thirdSection: {
    hidden: boolean;
    title: string;
  };
}



export default function CurrentOpenings() {

  const [department, setDepartment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [openingsList, setOpeningsList] = useState<{ _id: string, status: string, firstSection: { jobTitle: string, description: string, slug: string } }[]>([]);
  const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
  const [departmentList, setDepartmentList] = useState<{ _id: string, name: string }[]>([]);

  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<CurrentOpeningsPageProps>();

  const firstStatus = watch("firstSection.hidden");
  const secondStatus = watch("secondSection.hidden");
  const thirdStatus = watch("thirdSection.hidden");

  const toggleSection = (section: string, value: boolean) => {
    setValue(`${section}.hidden` as Path<CurrentOpeningsPageProps>, !value);
  };

  const handleFetchCurrentOpenings = async () => {
    try {
      const response = await fetch("/api/admin/current-openings");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("script", data.data.script);
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("thirdSection", data.data.thirdSection);
        setOpeningsList(data.data.openings);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  }

  const handleAddDepartment = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/department", {
        method: "POST",
        body: JSON.stringify({ name: department }),
      });
      if (response.ok) {
        const data = await response.json();
        setDepartment("");
        alert(data.message);
        handleFetchDepartment();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding sector", error);
    }
  }

  const handleFetchDepartment = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/department");
      if (response.ok) {
        const data = await response.json();
        setDepartmentList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  }

  const handleEditDepartment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/current-openings/department?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: department }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchDepartment();
        setDepartment("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing sector", error);
    }
  }

  const handleDeleteDepartment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/current-openings/department?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchDepartment();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting sector", error);
    }
  }


  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  }

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/admin/current-openings/location", {
        method: "POST",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocation("");
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  }

  const handleEditLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/current-openings/location?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/current-openings/location?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  }

  const handleDeleteOpening = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/current-openings?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchCurrentOpenings();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting opening", error);
    }
  }

  const onSubmit = async (data: CurrentOpeningsPageProps) => {
    try {
      const response = await fetch(`/api/admin/current-openings`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in submitting details", error);
    }
  }

  const fetchOpeningDetails = async () => {
    try {
      const response = await fetch("/api/admin/current-openings");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("thirdSection", data.data.thirdSection);
        setOpeningsList(data.data.openings);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching opening details", error);
    }
  }

  useEffect(() => {
    handleFetchCurrentOpenings();
    handleFetchDepartment();
    handleFetchLocation();
    fetchOpeningDetails();
  }, [])

  return (
    <div className="flex flex-col gap-5">

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

        <AdminItemContainer>
          <Label className='' main>First Section</Label>

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

          <div className='p-5 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Page Title</Label>
                <Input type='text' placeholder='Page Title' {...register("firstSection.pageTitle", {
                  required: "Page Title is required"
                })} />
                {errors.firstSection?.pageTitle && <p className='text-red-500'>{errors.firstSection?.pageTitle.message}</p>}
              </div>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Description</Label>
                <Textarea placeholder='Description' {...register("firstSection.description", {
                  required: "Description is required"
                })} />
                {errors.firstSection?.description && <p className='text-red-500'>{errors.firstSection?.description.message}</p>}
              </div>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Image</Label>
                <Controller
                  name="firstSection.image"
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      recommendedDimension="Recommended: 800 x 490 (px)"
                    />
                  )}
                />
                {errors.firstSection?.image && (
                  <p className="text-red-500">{errors.firstSection?.image.message}</p>
                )}
                <Label className='font-bold'>Alt Tag</Label>
                <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt")} />
              </div>
            </div>

          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label className='' main>Second Section</Label>

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

          <div className='p-5 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Main Title</Label>
                <Input type='text' placeholder='Main Title' {...register("secondSection.mainTitle", {
                  required: "Main Title is required"
                })} />
                {errors.secondSection?.mainTitle && <p className='text-red-500'>{errors.secondSection?.mainTitle.message}</p>}
              </div>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Sub Title</Label>
                <Input type='text' placeholder='Sub Title' {...register("secondSection.subTitle", {
                  required: "Sub Title is required"
                })} />
                {errors.secondSection?.subTitle && <p className='text-red-500'>{errors.secondSection?.subTitle.message}</p>}
              </div>
            </div>

          </div>
        </AdminItemContainer>


        <AdminItemContainer>
          <Label className='' main>Third Section</Label>

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

          <div className='p-5 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <Label className=' font-bold'>Title</Label>
                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                  required: "Title is required"
                })} />
                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
              </div>
            </div>

          </div>
        </AdminItemContainer>



        <AdminItemContainer>
          <Label main>SEO</Label>
          <div className="p-5 flex flex-col gap-2">
            <div className='flex flex-col gap-2'>
              <Label className='font-bold'>Title</Label>
              <Input type='text' placeholder='' {...register("metaTitle")} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold'>Description</Label>
              <Input type='text' placeholder='' {...register("metaDescription")} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='font-bold'>Script</Label>
              <Textarea {...register("script")} />
            </div>
          </div>
        </AdminItemContainer>

        <div className='flex justify-center mt-5'>
          <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
        </div>

      </form>


      <div className="h-screen grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-2 h-screen">
          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Department</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setDepartment("")}>Add Department</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Department</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Department Name" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddDepartment}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {departmentList.map((item) => (
                <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                  <div className="text-[16px]">
                    {item.name}
                  </div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger onClick={() => { setDepartment(item.name) }}><MdEdit /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Department</DialogTitle>
                          <DialogDescription>
                            <Input type="text" placeholder="Department Name" value={department} onChange={(e) => setDepartment(e.target.value)} />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditDepartment(item._id)}>Save</DialogClose>
                      </DialogContent>

                    </Dialog>



                    <Dialog>
                      <DialogTrigger><MdDelete /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteDepartment(item._id)}>Yes</DialogClose>
                        </div>

                      </DialogContent>

                    </Dialog>

                  </div>
                </div>
              ))}

            </div>
          </div>


          <div className="h-1/2 w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <Label className="text-sm font-bold">Location</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setLocation("")}>Add Location</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="h-full">

              <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
                {locationList.map((item) => (
                  <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                    <div className="text-[16px]">
                      {item.name}
                    </div>
                    <div className="flex gap-5">
                      <Dialog>
                        <DialogTrigger onClick={() => { setLocation(item.name) }}><MdEdit /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Location</DialogTitle>
                            <DialogDescription>
                              <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditLocation(item._id)}>Save</DialogClose>
                        </DialogContent>

                      </Dialog>



                      <Dialog>
                        <DialogTrigger><MdDelete /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteLocation(item._id)}>Yes</DialogClose>
                          </div>

                        </DialogContent>

                      </Dialog>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Openings</Label>
            <Button onClick={() => router.push("/admin/current-openings/add")}>Add Opening</Button>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
            {openingsList.map((item) => (
              <div className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                <div className="text-[16px]">
                  {item.firstSection.jobTitle}
                </div>
                <div className="flex gap-5 items-center">

                  {item.status == "draft" ? (<Link href={`/careers/${item.firstSection.slug}`} target="_blank"><div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1">
                    <FaEye />
                  </div></Link>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                    <FaEye />
                  </div>)}

                  <MdEdit onClick={() => router.push(`/admin/current-openings/edit/${item._id}`)} />

                  <Dialog>
                    <DialogTrigger><MdDelete /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteOpening(item._id)}>Yes</DialogClose>
                      </div>

                    </DialogContent>

                  </Dialog>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
}
