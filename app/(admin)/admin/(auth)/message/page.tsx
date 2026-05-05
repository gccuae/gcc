"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Controller, Path, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RiDeleteBinLine } from "react-icons/ri";
import { ImageUploader } from '@/components/ui/image-uploader';
import { Textarea } from '@/components/ui/textarea';
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



interface MessageFormData {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        hidden: boolean;
        title: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
        }[]
    }
    messageSection: {
        hidden: boolean;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
            message?: string;
        }[]
    }
}

const AdminHome = () => {

    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors },
        watch
    } = useForm<MessageFormData>();


    const firstStatus = watch("firstSection.hidden");
    const messageStatus = watch("messageSection.hidden");

    const toggleSection = (
        section: "firstSection" | "messageSection",
        value: boolean
    ) => {
        setValue(`${section}.hidden` as Path<MessageFormData>, !value);
    };

    const onSubmit = async (data: MessageFormData) => {
        try {

            const response = await fetch(`/api/admin/message`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/message')
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setValue("metaTitle", data.data.metaTitle)
                    setValue("metaDescription", data.data.metaDescription)
                    setValue("firstSection", data.data.firstSection)
                    setValue("firstSection.items", data.data.firstSection.items)
                    setValue("messageSection.items", data.data.messageSection.items)

                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const { fields: messageSectionItems, append: messageSectionAppend, remove: messageSectionRemove } = useFieldArray({
        control,
        name: "messageSection.items"
    });


    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

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

                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`firstSection.title`, {
                                    required: "Value is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>
                        </div>

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
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 830 x 1000 (px)"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`)} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        {/* <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`messageSection.items.${index}.title`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.messageSection?.items?.[index]?.title && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.title.message}</p>}
                                            </div>
                                        </div> */}

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Name</Label>
                                                <Input type='text' placeholder='Name' {...register(`firstSection.items.${index}.name`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.firstSection?.items?.[index]?.name && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.name.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Designation</Label>
                                                <Input type='text' placeholder='Designation' {...register(`firstSection.items.${index}.designation`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.firstSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.designation.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className='flex flex-col gap-2 col-span-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Message</Label>
                                            <Textarea placeholder='Message' {...register(`messageSection.items.${index}.message`, {
                                                required: "Value is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.message && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.message.message}</p>}
                                        </div>
                                    </div> */}

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => firstSectionAppend({ image: "", imageAlt: "", name: "", designation: "" })}>Add Item</Button>
                        </div>

                    </div>

                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Message Section</Label>

                {messageStatus ? (
                    <FaEyeSlash
                        onClick={() => toggleSection("messageSection", messageStatus)}
                        className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                    />
                ) : (
                    <FaEye
                        onClick={() => toggleSection("messageSection", messageStatus)}
                        className="absolute top-4 right-4 text-green-600 cursor-pointer"
                    />
                )}

                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div>
                        <Label className='font-bold'>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-5'>
                            {messageSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => messageSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`messageSection.items.${index}.image`}
                                                control={control}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 830 x 1000 (px)"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`messageSection.items.${index}.imageAlt`)} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`messageSection.items.${index}.title`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.messageSection?.items?.[index]?.title && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.title.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Name</Label>
                                                <Input type='text' placeholder='Name' {...register(`messageSection.items.${index}.name`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.messageSection?.items?.[index]?.name && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.name.message}</p>}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Designation</Label>
                                                <Input type='text' placeholder='Designation' {...register(`messageSection.items.${index}.designation`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.messageSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.designation.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2 col-span-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Message</Label>
                                            <Textarea placeholder='Message' {...register(`messageSection.items.${index}.message`, {
                                                required: "Value is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.message && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.message.message}</p>}
                                        </div>
                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => messageSectionAppend({ title: "", image: "", imageAlt: "", name: "", designation: "", message: "" })}>Add Item</Button>
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
                    <div className='flex flex-col gap-2 mt-3'>
                        <Label className='font-bold'>Description</Label>
                        <Input type='text' placeholder='' {...register("metaDescription")} />
                    </div>
                </div>
            </AdminItemContainer>

            <div className='flex mt-5'>
                <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
            </div>

        </form>
    )
}

export default AdminHome
