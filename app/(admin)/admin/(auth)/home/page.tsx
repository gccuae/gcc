"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { VideoUploader } from '@/components/ui/video-uploader';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Path } from "react-hook-form";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CompanyCard from './CompanyCard';
import { IconPicker } from '@/app/components/common/IconPicker';

interface HomeFormProps {
    metaTitle: string;
    metaDescription: string;
    script: string;
    expertiseHidden: boolean;
    newsHidden: boolean;
    bannerSection: {
        hidden: boolean;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[]
    }
    numberSection: {
        hidden: boolean;
        items: {
            number: string;
            value: string;
        }[]
    }
    firstSection: {
        hidden: boolean;
        description: string;
        buttonText: string;
        video: string;
        poster: string;
    };
    thirdSection: {
        hidden: boolean;
        title: string;
        items: {
            logo: string;
            logoAlt: string;
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    fourthSection: {
        hidden: boolean;
        title: string;
        items: {
            logo: string;
            logoAlt: string;
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const HomePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<HomeFormProps>();

    const bannerStatus = watch("bannerSection.hidden");
    const numberStatus = watch("numberSection.hidden");
    const firstStatus = watch("firstSection.hidden");
    const fourthStatus = watch("fourthSection.hidden");
    const expertiseStatus = watch("expertiseHidden");
    const newsStatus = watch("newsHidden");

    const [reorderMode, setReorderMode] = useState(false);

    useEffect(() => {
        console.log(numberStatus)
    }, [numberStatus])

    const toggleSection = (section: string, value: boolean) => {
        if (section === "newsHidden" || section === "expertiseHidden") {
            setValue(section as Path<HomeFormProps>, !value);
        } else {
            setValue(`${section}.hidden` as Path<HomeFormProps>, !value);
        }
    };


    const { fields: bannerSectionItems, append: bannerSectionAppend, remove: bannerSectionRemove } = useFieldArray({
        control,
        name: "bannerSection.items"
    });

    const { fields: numberSectionItems, append: numberSectionAppend, remove: numberSectionRemove } = useFieldArray({
        control,
        name: "numberSection.items"
    });

    // const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
    //     control,
    //     name: "thirdSection.items"
    // });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove, move } = useFieldArray({
        control,
        name: "fourthSection.items"
    });



    const handleAddHome = async (data: HomeFormProps) => {
        try {
            const response = await fetch(`/api/admin/home`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding home", error);
        }
    }

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`/api/admin/home`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("script", data.data.script);
                setValue("bannerSection.hidden", data.data.bannerSection.hidden)
                setValue("bannerSection.items", data.data.bannerSection.items);
                setValue("newsHidden", data.data.newsHidden);
                setValue("expertiseHidden", data.data.expertiseHidden);
                setValue("firstSection", data.data.firstSection);
                setValue("numberSection.items", data.data.numberSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching home data", error);
        }
    }


    const getTaskPos = (id: number | string) =>
        fourthSectionItems.findIndex((item: { id: string }) => item.id == id);
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
        fetchHomeData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddHome)}>


                <AdminItemContainer>
                    <Label className='font-bold' main>Banner Section</Label>
                    {/* <input type="hidden" {...register("bannerSection.hidden")} /> */}

                    {bannerStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("bannerSection", bannerStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />
                    ) : (
                        <FaEye
                            onClick={() => toggleSection("bannerSection", bannerStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <Label className='font-bold'>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-5'>


                            {bannerSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => bannerSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`bannerSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 1920 x 1080 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.bannerSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.bannerSection?.items?.[index]?.image.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`bannerSection.items.${index}.imageAlt`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.imageAlt.message}</p>}
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`bannerSection.items.${index}.title`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.title && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.title.message}</p>}
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Description</Label>
                                                <Input type='text' placeholder='Description' {...register(`bannerSection.items.${index}.description`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.bannerSection?.items?.[index]?.description && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.description.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => bannerSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='font-bold' main>Number Section</Label>
                    {/* <input type="hidden" {...register("numberSection.hidden")} /> */}

                    {numberStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("numberSection", numberStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("numberSection", numberStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <Label className='font-bold'>Items</Label>
                        <div className='border p-2 rounded-md flex flex-col gap-5'>


                            {numberSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => numberSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Number</Label>
                                                <Input type='text' placeholder='Number' {...register(`numberSection.items.${index}.number`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.numberSection?.items?.[index]?.number && <p className='text-red-500'>{errors.numberSection?.items?.[index]?.number.message}</p>}
                                            </div>
                                        </div>


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Value</Label>
                                                <Input type='text' placeholder='Value' {...register(`numberSection.items.${index}.value`, {
                                                    required: "Value is required"
                                                })} />
                                                {errors.numberSection?.items?.[index]?.value && <p className='text-red-500'>{errors.numberSection?.items?.[index]?.value.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}



                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => numberSectionAppend({ number: "", value: "" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        {/* <input type="hidden" {...register("firstSection.hidden")} /> */}

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

                        <div className='flex flex-col gap-2'>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("firstSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.firstSection?.buttonText && <p className='text-red-500'>{errors.firstSection?.buttonText.message}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Video</Label>
                                <Controller
                                    name="firstSection.video"
                                    control={control}
                                    rules={{ required: "Video is required" }}
                                    render={({ field }) => (
                                        <VideoUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {errors.firstSection?.video && (
                                    <p className="text-red-500">{errors.firstSection?.video.message}</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Poster</Label>
                                <Controller
                                    name="firstSection.poster"
                                    control={control}
                                    rules={{ required: "Poster is required" }}
                                    render={({ field }) => (
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            recommendedDimension="Recommended: 800 x 494 (px)"
                                        />
                                    )}
                                />

                                {errors.firstSection?.poster && (
                                    <p className="text-red-500">{errors.firstSection?.poster.message}</p>
                                )}
                            </div>

                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Expertise Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        {/* <input type="hidden" {...register("firstSection.hidden")} /> */}

                        {expertiseStatus ? (
                            <FaEyeSlash
                                onClick={() => toggleSection("expertiseHidden", expertiseStatus)}
                                className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                            />

                        ) : (
                            <FaEye
                                onClick={() => toggleSection("expertiseHidden", expertiseStatus)}
                                className="absolute top-4 right-4 text-green-600 cursor-pointer"
                            />
                        )}
                    </div>
                </AdminItemContainer>


                {/* <AdminItemContainer>
                <Label main>Third Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {thirdSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Logo</Label>
                                    <Controller
                                        name={`thirdSection.items.${index}.logo`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                recommendedDimension="Recommended: 100 x 100 (px)"
                                                            />
                                                        )}
                                                    />
                                    {errors.thirdSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.thirdSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.logoAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>
                            </div>


                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
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
                                        <p className="text-red-500">{errors.thirdSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>

                            </div>

                            <div className='grid grid-cols-2 gap-2 col-span-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                </div>
                                <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name={`thirdSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                            {errors.thirdSection?.items?.[index]?.description && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.description.message}</p>}
                        </div>
                            </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "", description: "",logo: "",logoAlt: "" })}>Add Item</Button>
                    </div>
                </div>

                    </div>

                </div>
                </AdminItemContainer> */}


                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        {/* <input type="hidden" {...register("fourthSection.hidden")} /> */}

                        {fourthStatus ? (
                            <FaEyeSlash
                                onClick={() => toggleSection("fourthSection", fourthStatus)}
                                className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                            />
                        ) : (
                            <FaEye
                                onClick={() => toggleSection("fourthSection", fourthStatus)}
                                className="absolute top-4 right-4 text-green-600 cursor-pointer"
                            />

                        )}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                            <div>
                                <div className='flex justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                    <Button
                                        disabled={fourthSectionItems.length < 2}
                                        type="button"
                                        className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`}
                                        onClick={() => setReorderMode(!reorderMode)}
                                    >
                                        {reorderMode ? "Done" : "Reorder"}
                                    </Button>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>

                                    {reorderMode && (
                                        <DndContext
                                            collisionDetection={closestCorners}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={fourthSectionItems.map((item) => item.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {fourthSectionItems?.map((item, index) => (
                                                    <CompanyCard key={index} item={item} id={item.id} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}

                                    {!reorderMode && fourthSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            {/* <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Logo</Label>
                                                    <Controller
                                                        name={`fourthSection.items.${index}.logo`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                isLogo
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                recommendedDimension="Recommended: 100 x 100 (px)"
                                                            />
                                                        )}
                                                    />
                                                    {errors.fourthSection?.items?.[index]?.logo && (
                                                        <p className="text-red-500">{errors.fourthSection?.items?.[index]?.logo.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.logoAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fourthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.logoAlt.message}</p>}
                                                    </div>
                                                </div>


                                            </div> */}

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Logo</Label>
                                                    <Controller
                                                        name={`fourthSection.items.${index}.logo`}
                                                        control={control}
                                                        rules={{ required: "Logo is required" }}
                                                        render={({ field }) => (
                                                            <IconPicker
                                                                value={field.value}
                                                                onChange={(image, imageAlt) => {
                                                                    field.onChange(image);
                                                                    if (imageAlt) {
                                                                        setValue(`fourthSection.items.${index}.logoAlt`, imageAlt);
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors.fourthSection?.items?.[index]?.logo && (
                                                        <p className="text-red-500">{errors.fourthSection?.items?.[index]?.logo.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.logoAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fourthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.logoAlt.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Image</Label>
                                                    <Controller
                                                        name={`fourthSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                recommendedDimension="Recommended: 600 x 474 (px)"
                                                            />
                                                        )}
                                                    />
                                                    {errors.fourthSection?.items?.[index]?.image && (
                                                        <p className="text-red-500">{errors.fourthSection?.items?.[index]?.image.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fourthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.imageAlt.message}</p>}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='grid grid-cols-2 gap-2 col-span-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-bold">Description</Label>
                                                    <Controller name={`fourthSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                        return <Textarea value={field.value} onChange={field.onChange} />
                                                    }} />
                                                    {errors.fourthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.description.message}</p>}
                                                </div>
                                            </div>

                                        </div>
                                    ))}



                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => fourthSectionAppend({ title: "", image: "", imageAlt: "", description: "", logo: "", logoAlt: "" })}>Add Item</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <Label main>News Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        {/* <input type="hidden" {...register("firstSection.hidden")} /> */}

                        {newsStatus ? (
                            <FaEyeSlash
                                onClick={() => toggleSection("newsHidden", newsStatus)}
                                className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                            />

                        ) : (
                            <FaEye
                                onClick={() => toggleSection("newsHidden", newsStatus)}
                                className="absolute top-4 right-4 text-green-600 cursor-pointer"
                            />
                        )}
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
                            <Textarea placeholder='' {...register("script")} />
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

export default HomePage
