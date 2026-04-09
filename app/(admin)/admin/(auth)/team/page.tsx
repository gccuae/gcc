"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface TeamFormProps {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
        }[]
    };
    secondSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
            category: string;
        }[];
    };
}

const TeamPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<TeamFormProps>();


    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });


    const [category, setCategory] = useState<string>("")

    const [categoryList, setCategoryList] = useState<{ _id: string, category: string }[]>([]);


    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/team/category");
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }

    useEffect(() => {
        handleFetchCategory();
    }, [])


    const handleAddTeam = async (data: TeamFormProps) => {
        try {
            console.log(data)
            const response = await fetch(`/api/admin/team`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    }


    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/team/category", {
                method: "POST",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                setCategory("");
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/category?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
                fetchTeamData();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/team/category?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
                fetchTeamData();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    }

    const fetchTeamData = async () => {
        try {
            const response = await fetch(`/api/admin/team`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchTeamData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddTeam)}>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>
                        </div>


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {firstSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`firstSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 400 x 492 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.firstSection?.items?.[index]?.image && (
                                                    <p className="text-red-500">{errors.firstSection?.items?.[index]?.image.message}</p>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.firstSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.imageAlt.message}</p>}
                                                </div>
                                            </div>


                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Name</Label>
                                                    <Input type='text' placeholder='Name' {...register(`firstSection.items.${index}.name`, {
                                                        required: "Name is required"
                                                    })} />
                                                    {errors.firstSection?.items?.[index]?.name && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.name.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Designation</Label>
                                                    <Input type='text' placeholder='Designation' {...register(`firstSection.items.${index}.designation`, {
                                                        required: "Designation is required"
                                                    })} />
                                                    {errors.firstSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.designation.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => firstSectionAppend({ name: "", image: "", imageAlt: "", designation: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <div className='flex justify-between items-center p-5'>
                        <h1 className='text-md font-semibold'>Team Category</h1>
                        <Dialog>
                            <DialogTrigger className='bg-primary text-white px-3 py-1 rounded-md font-semibold' onClick={() => setCategory("")}>Add Category</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Category</DialogTitle>
                                    <DialogDescription>
                                        <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>
                    <div className='px-5 flex flex-col gap-4 py-3'>
                        {categoryList.map((item) => (
                            <div className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all' key={item._id}>
                                <div>
                                    <p>{item.category}</p>
                                </div>
                                <div className='flex gap-8 items-center'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => setCategory(item.category)}><FaEdit className='text-lg cursor-pointer' /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Category</DialogTitle>
                                                <DialogDescription>
                                                    <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                                        </DialogContent>

                                    </Dialog>


                                    <Dialog>
                                        <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteCategory(item._id)}>Yes</DialogClose>
                                            </div>

                                        </DialogContent>

                                    </Dialog>

                                </div>
                            </div>
                        ))}
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>

                            <div>
                                <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-5 grid grid-cols-3'>


                                    {secondSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r pr-5 last:border-r-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Image</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.image && (
                                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Name</Label>
                                                            <Input type='text' placeholder='Name' {...register(`secondSection.items.${index}.name`, {
                                                                required: "Name is required"
                                                            })} />
                                                            {errors.secondSection?.items?.[index]?.name && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.name.message}</p>}
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Designation</Label>
                                                                <Input type='text' placeholder='Designation' {...register(`secondSection.items.${index}.designation`, {
                                                                    required: "Designation is required"
                                                                })} />
                                                                {errors.secondSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.designation.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className=''>Category</Label>
                                                            <Controller
                                                                name={`secondSection.items.${index}.category`}
                                                                control={control}
                                                                rules={{ required: "Category is required" }}
                                                                render={({ field }) => (
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        value={field.value}
                                                                        defaultValue=""
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select Category" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {categoryList.map((item, index) => (
                                                                                <SelectItem key={index} value={item.category}>
                                                                                    {item.category}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]?.category && <p className="text-red-500">{errors.secondSection?.items?.[index]?.category.message}</p>}

                                                        </div>
                                                    </div>

                                                </div>


                                            </div>


                                        </div>
                                    ))}



                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ image: "", imageAlt: "", name: "", designation: "", category: "" })}>Add Item</Button>
                                </div>
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
                    </div>
                </AdminItemContainer>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default TeamPage
