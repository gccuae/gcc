"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { RiAiGenerateText } from 'react-icons/ri'
import { useRefetchServices } from '@/app/contexts/refetchServices';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ServiceCard from './ServiceCard';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconPicker } from '@/app/components/common/IconPicker';

interface ExpertiseFormProps {
    metaTitle: string;
    metaDescription: string;
    script: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    bannerHidden: boolean;
    firstSection: {
        hidden: boolean;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        hidden: boolean;
        title: string;
        items: {
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            slug: string;
            description: string;
            homeThumbnail: string;
            homeThumbnailAlt: string;
            status: string;
        }[];
    };
}

const ExpertisePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<ExpertiseFormProps>();

    const { refetchServices, setRefetchServices } = useRefetchServices();

    const [reorderMode, setReorderMode] = useState(false);

    const bannerStatus = watch("bannerHidden");
    const firstStatus = watch("firstSection.hidden");
    const secondStatus = watch("secondSection.hidden");

    const toggleSection = (section: string, value: boolean) => {
        if (section === "bannerHidden") {
            setValue("bannerHidden", !value);
        } else {
            setValue(`${section}.hidden` as Path<ExpertiseFormProps>, !value);
        }
    };


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove, move } = useFieldArray({
        control,
        name: "secondSection.items"
    });


    const handleAddExpertise = async (data: ExpertiseFormProps) => {
        try {
            const response = await fetch(`/api/admin/expertise`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setRefetchServices(!refetchServices);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding expertise", error);
        }
    }

    const fetchExpertiseData = async () => {
        try {
            const response = await fetch(`/api/admin/expertise`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("script", data.data.script);
                setValue("bannerHidden", data.data.bannerHidden);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching expertise data", error);
        }
    }


    const getTaskPos = (id: number | string) => secondSectionItems.findIndex((item: { id: string }) => (item.id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        if (originalPos !== -1 && newPos !== -1) {
            move(originalPos, newPos);
        }
    };



    useEffect(() => {
        fetchExpertiseData();
    }, []);


    const handleAutoGenerate = (title: string, index: number) => {
        if (!title) return;
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setValue(`secondSection.items.${index}.slug`, slug);
    };


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddExpertise)}>
                <AdminItemContainer>
                    <Label className="" main>Banner</Label>

                    {bannerStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("bannerHidden", bannerStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />
                    ) : (
                        <FaEye
                            onClick={() => toggleSection("bannerHidden", bannerStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}

                    <div className='p-5 rounded-md grid grid-cols-2 gap-5'>
                        <div>
                            <Controller
                                name="banner"
                                control={control}
                                rules={{ required: "Banner is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        recommendedDimension="Recommended: 1920 x 453 (px)"
                                    />
                                )}
                            />
                            {errors.banner && (
                                <p className="text-red-500">{errors.banner.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Page Title</Label>
                                <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

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
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>


                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Image</Label>
                            <Controller
                                name="firstSection.image"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        recommendedDimension="Recommended: 800 x 638 (px)"
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
                                <div className='flex items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                    <Button disabled={secondSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {reorderMode &&

                                        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                            <SortableContext items={secondSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                                {secondSectionItems?.map((item, index) => (
                                                    <ServiceCard key={index} item={item} id={item.id} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>

                                    }

                                    {!reorderMode && secondSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-1 right-10'>
                                                {field.status == "draft" ? (<Link href={`/expertise/${field.slug}`} target="_blank"><div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1 w-fit">
                                                    <FaEye />
                                                </div></Link>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                                                    <FaEye />
                                                </div>)}
                                            </div>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='grid grid-cols-2 gap-2'>
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
                                                                    recommendedDimension="Recommended: 900 x 715 (px)"
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
                                                    </div>


                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Logo</Label>
                                                        <Controller
                                                            name={`secondSection.items.${index}.logo`}
                                                            control={control}
                                                            rules={{ required: "Logo is required" }}
                                                            render={({ field }) => (
                                                                <IconPicker
                                                                    value={field.value}
                                                                    onChange={(image, imageAlt) => {
                                                                        field.onChange(image);
                                                                        if (imageAlt) {
                                                                            setValue(`secondSection.items.${index}.logoAlt`, imageAlt);
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                        {errors.secondSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">{errors.secondSection?.items?.[index]?.logo.message}</p>
                                                        )}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Alt Tag</Label>
                                                            <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.logoAlt`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.secondSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.logoAlt.message}</p>}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div className='flex flex-col gap-2 mt-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex gap-2 items-center'>
                                                            <Label className='font-bold'>Slug</Label>
                                                            <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={() => handleAutoGenerate(watch(`secondSection.items.${index}.title`), index)}>
                                                                <p>Auto Generate</p>
                                                                <RiAiGenerateText />
                                                            </div>
                                                        </div>
                                                        <Input type='text' placeholder='Slug' {...register(`secondSection.items.${index}.slug`, {
                                                            required: "Value is required", pattern: {
                                                                value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                                                                message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
                                                            }
                                                        })} />
                                                        {errors.secondSection?.items?.[index]?.slug && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.slug.message}</p>}
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Home Thumbnail</Label>
                                                            <Controller
                                                                name={`secondSection.items.${index}.homeThumbnail`}
                                                                control={control}
                                                                rules={{ required: "Image is required" }}
                                                                render={({ field }) => (
                                                                    <ImageUploader
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        recommendedDimension="Recommended: 997 x 600 (px)"
                                                                    />
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]?.homeThumbnail && (
                                                                <p className="text-red-500">{errors.secondSection?.items?.[index]?.homeThumbnail.message}</p>
                                                            )}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.homeThumbnailAlt`, {
                                                                    required: "Value is required"
                                                                })} />
                                                                {errors.secondSection?.items?.[index]?.homeThumbnailAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.homeThumbnailAlt.message}</p>}
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-bold">Description</Label>
                                                        <Controller name={`secondSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                            return <Textarea value={field.value} onChange={field.onChange} />
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                {!reorderMode && <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", image: "", imageAlt: "", logo: "", logoAlt: "", slug: "", description: "", homeThumbnail: "", homeThumbnailAlt: "", status: "" })}>Add Item</Button>
                                </div>}
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
                        <div className="flex flex-col gap-2 mt-3">
                            <Label className="font-bold">Script</Label>
                            <Textarea placeholder="" {...register("script")} />
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

export default ExpertisePage
