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
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CertificateCard from './CertificateCard';

interface QhseFormProps {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        mainTitle: string;
        subTitle: string;
        primaryColorText: string;
        description: string;
    };
    secondSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };
    forthSection: {
        title: string;
        description: string;
        items: {
            thumbnail: string;
            thumbnailAlt: string;
            title: string;
            images: {
                image: string;
                imageAlt: string;
            }[];
        }[];
    };
    fifthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const ExpertisePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<QhseFormProps>();

    const [reorderMode, setReorderMode] = useState(false);

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove, move } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: forthSectionItems, append: forthSectionAppend, remove: forthSectionRemove } = useFieldArray({
        control,
        name: "forthSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const handleAddQhse = async (data: QhseFormProps) => {
        try {
            const response = await fetch(`/api/admin/qhse`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding qhse", error);
        }
    }

    const fetchQhseData = async () => {
        try {
            const response = await fetch(`/api/admin/qhse`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("forthSection", data.data.forthSection);
                setValue("forthSection.items", data.data.forthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching qhse data", error);
        }
    }

    const handleAddImage = (index: number) => {
        const currentImages = watch(`forthSection.items.${index}.images`) || [];
        setValue(`forthSection.items.${index}.images`, [...currentImages, { image: "", imageAlt: "" }]);
    };


    const handleRemoveImage = (index: number, imageIndex: number) => {
        const currentImages = watch(`forthSection.items.${index}.images`) || [];
        setValue(`forthSection.items.${index}.images`, currentImages.filter((_, i) => i !== imageIndex));
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
        fetchQhseData();
    }, []);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddQhse)}>

                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register("firstSection.mainTitle", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.mainTitle && <p className='text-red-500'>{errors.firstSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("firstSection.subTitle", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.subTitle && <p className='text-red-500'>{errors.firstSection?.subTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Primary Color Text</Label>
                                <Input type='text' placeholder='Primary Color Text' {...register("firstSection.primaryColorText", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.primaryColorText && <p className='text-red-500'>{errors.firstSection?.primaryColorText.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Descripiton</Label>
                                <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
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
                                <Label className="text-sm font-bold">Descripiton</Label>
                                <Controller name="secondSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`secondSection.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.secondSection?.image && (
                                        <p className="text-red-500">{errors.secondSection?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`secondSection.imageAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.secondSection?.imageAlt && <p className='text-red-500'>{errors.secondSection?.imageAlt.message}</p>}
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className='flex flex-row gap-2 items-center justify-between my-5'>
                                    <Label className='font-bold'>Items</Label>
                                    <Button disabled={secondSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                                </div>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>
                                    {reorderMode &&

                                        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                            <SortableContext items={secondSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                                {secondSectionItems?.map((item, index) => (
                                                    <CertificateCard key={index} item={item} id={item.id} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>

                                    }

                                    {!reorderMode && secondSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
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

                                                <div className='grid grid-cols-1 gap-2'>
                                                    <div className='flex flex-col gap-2 mt-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}



                                </div>
                                {!reorderMode && <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", image: "", imageAlt: "" })}>Add Item</Button>
                                </div>}
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
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
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="thirdSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {thirdSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>
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

                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Forth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("forthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.forthSection?.title && <p className='text-red-500'>{errors.forthSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="forthSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {forthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => forthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Thumbnail</Label>
                                                    <Controller
                                                        name={`forthSection.items.${index}.thumbnail`}
                                                        control={control}
                                                        rules={{ required: "Thumbnail is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.forthSection?.items?.[index]?.thumbnail && (
                                                        <p className="text-red-500">{errors.forthSection?.items?.[index]?.thumbnail.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`forthSection.items.${index}.thumbnailAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.forthSection?.items?.[index]?.thumbnailAlt && <p className='text-red-500'>{errors.forthSection?.items?.[index]?.thumbnailAlt.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`forthSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.forthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.forthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => { handleAddImage(index) }}>Add Image</Button>
                                        </div>

                                        <div className='grid grid-cols-2 gap-2 mt-5'>
                                            {watch(`forthSection.items.${index}.images`).map((file, fileIndex) => (
                                                <div key={fileIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                                    <div className='absolute top-2 right-2'>
                                                        <RiDeleteBinLine onClick={() => handleRemoveImage(index, fileIndex)} className='cursor-pointer text-red-600' />
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Image</Label>
                                                            <Controller
                                                                name={`forthSection.items.${index}.images.${fileIndex}.image`}
                                                                control={control}
                                                                rules={{ required: "File is required" }}
                                                                render={({ field }) => (
                                                                    <ImageUploader
                                                                        value={field.value}
                                                                        onChange={(url: string) => {
                                                                            field.onChange(url); // update file URL // update size separately
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.forthSection?.items?.[index]?.images?.[fileIndex]?.image && <p className='text-red-500'>{errors.forthSection?.items?.[index]?.images?.[fileIndex]?.image.message}</p>}
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Alt Tag</Label>
                                                                <Input type='text' placeholder='Alt Tag' {...register(`forthSection.items.${index}.images.${fileIndex}.imageAlt`, {
                                                                    required: "Value is required"
                                                                })} />
                                                                {errors.forthSection?.items?.[index]?.images?.[fileIndex]?.imageAlt && <p className='text-red-500'>{errors.forthSection?.items?.[index]?.images?.[fileIndex]?.imageAlt.message}</p>}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => forthSectionAppend({ title: "", thumbnail: "", thumbnailAlt: "", images: [] })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller name="fifthSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {fifthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Image</Label>
                                                    <Controller
                                                        name={`fifthSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.fifthSection?.items?.[index]?.image && (
                                                        <p className="text-red-500">{errors.fifthSection?.items?.[index]?.image.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.fifthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.imageAlt.message}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.fifthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Controller name={`fifthSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                        return <Textarea value={field.value} onChange={field.onChange} />
                                                    }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => fifthSectionAppend({ title: "", image: "", imageAlt: "", description: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription")} />
                </div>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ExpertisePage