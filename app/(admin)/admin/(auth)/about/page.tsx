"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

interface AboutFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        mainTitle: string;
        subTitle: string;
        firstDescription: string;
        secondDescription: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };
    thirdSection: {
        mainTitle: string;
        subTitle: string;
        items: {
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
    historySection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            year: string;
            subTitle: string;
            mainTitle: string;
            description: string;
        }[];
    };
    fifthSection: {
        mainTitle: string;
        subTitle: string;
        items: {
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const AboutPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AboutFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: historySectionItems, append: historySectionAppend, remove: historySectionRemove } = useFieldArray({
        control,
        name: "historySection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const handleAddAbout = async (data: AboutFormProps) => {
        try {
            const response = await fetch(`/api/admin/about`, {
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

    const fetchAboutData = async () => {
        try {
            const response = await fetch(`/api/admin/about`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("historySection", data.data.historySection);
                setValue("historySection.items", data.data.historySection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchAboutData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAbout)}>
                <AdminItemContainer>
                    <Label className="" main>Banner</Label>
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
                                        recommendedDimension="Recommended: 800 x 738 (px)"
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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register("secondSection.mainTitle", {
                                    required: "Main Title is required"
                                })} />
                                {errors.secondSection?.mainTitle && <p className='text-red-500'>{errors.secondSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("secondSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.secondSection?.subTitle && <p className='text-red-500'>{errors.secondSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>First Description</Label>
                                <Controller name="secondSection.firstDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Second Description</Label>
                                <Controller name="secondSection.secondDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            {/* <div>
                                <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>
                                    {secondSectionItems.map((field, index) => (
                                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
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
                                                                recommendedDimension="Recommended: 900 x 750 (px)"
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
                                                    <div className='flex flex-col gap-2'>
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
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", image: "", imageAlt: "" })}>Add Item</Button>
                                </div>
                            </div> */}

                        </div>

                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register("thirdSection.mainTitle", {
                                    required: "Main Title is required"
                                })} />
                                {errors.thirdSection?.mainTitle && <p className='text-red-500'>{errors.thirdSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("thirdSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>}
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
                                                        rules={{ required: "Logo is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                isLogo
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                recommendedDimension="Recommended: 52 x 52 (px)"
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
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Title</Label>
                                                        <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Controller name={`thirdSection.items.${index}.description`} control={control} render={({ field }) => {
                                                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                                    }} />
                                                </div>

                                            </div>

                                        </div>
                                    ))}



                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button type='button' addItem onClick={() => thirdSectionAppend({ title: "", logo: "", logoAlt: "", description: "" })}>Add Item</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>History Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`historySection.title`, {
                                required: "Value is required"
                            })} />
                            {errors?.historySection?.title && <p className='text-red-500'>{errors.historySection.title.message}</p>}
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {historySectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => historySectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`historySection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 1920 x 504 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.historySection?.items?.[index]?.image && (
                                                    <p className="text-red-500">{errors.historySection?.items?.[index]?.image.message}</p>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`historySection.items.${index}.imageAlt`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.historySection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.historySection?.items?.[index]?.imageAlt.message}</p>}
                                                </div>
                                            </div>


                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Year</Label>
                                                    <Input type='text' placeholder='Year' {...register(`historySection.items.${index}.year`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.historySection?.items?.[index]?.year && <p className='text-red-500'>{errors.historySection?.items?.[index]?.year.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Main Title</Label>
                                                    <Input type='text' placeholder='Main Title' {...register(`historySection.items.${index}.mainTitle`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.historySection?.items?.[index]?.mainTitle && <p className='text-red-500'>{errors.historySection?.items?.[index]?.mainTitle.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Sub Title</Label>
                                                    <Input type='text' placeholder='Sub Title' {...register(`historySection.items.${index}.subTitle`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.historySection?.items?.[index]?.subTitle && <p className='text-red-500'>{errors.historySection?.items?.[index]?.subTitle.message}</p>}
                                                </div>
                                            </div>



                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Textarea placeholder='Description' {...register(`historySection.items.${index}.description`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.historySection?.items?.[index]?.description && <p className='text-red-500'>{errors.historySection?.items?.[index]?.description.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => historySectionAppend({ year: "", mainTitle: "", subTitle: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register(`fifthSection.mainTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.fifthSection?.mainTitle && <p className='text-red-500'>{errors.fifthSection?.mainTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register(`fifthSection.subTitle`, {
                                    required: "Value is required"
                                })} />
                                {errors.fifthSection?.subTitle && <p className='text-red-500'>{errors.fifthSection?.subTitle.message}</p>}
                            </div>
                        </div>

                        <Label>Items</Label>
                        <div className='border p-2 rounded-md'>
                            {fifthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Logo</Label>
                                            <Controller
                                                name={`fifthSection.items.${index}.logo`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        isLogo
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 100 x 100 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.fifthSection?.items?.[index]?.logo && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.logo.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.logoAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='pl-3 font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => fifthSectionAppend({ logo: "", logoAlt: "", title: "", description: "" })}>Add Item</Button>
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

export default AboutPage
