"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image'
import { RiAiGenerateText } from 'react-icons/ri'
import AdminItemContainer from '@/app/components/common/AdminItemContainer'
import { Textarea } from '@/components/ui/textarea'



interface NewsFormProps {
    title: string;
    subTitle: string;
    description: string;
    slug: string;
    content: string;
    category: string;
    thumbnail: string;
    thumbnailAlt: string;
    metaTitle: string;
    metaDescription: string;
    images: string []
    date: string;
}

const NewsForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [categoryList, setCategoryList] = useState<{ category: string }[]>([]);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<NewsFormProps>();

    const handleAddNews = async (data: NewsFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/news?id=${id}` : "/api/admin/news", {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/news");
            }
        } catch (error) {
            console.log("Error in adding news", error);
        }
    }

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`/api/admin/news?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.data)
                setValue("title", data.data[0].title);
                setValue("slug", data.data[0].slug);
                setValue("content", data.data[0].content);
                setValue("subTitle", data.data[0].subTitle);
                setValue("description", data.data[0].description);
                setValue("category", data.data[0].category);
                setValue("thumbnail", data.data[0].thumbnail);
                setValue("thumbnailAlt", data.data[0].thumbnailAlt);
                setValue("metaTitle", data.data[0].metaTitle);
                setValue("metaDescription", data.data[0].metaDescription);
                setValue("images", data.data[0].images);
                const isoDate = new Date(data.data[0].date).toISOString().split("T")[0];
                setValue("date", isoDate);
                setImageUrls(data.data[0].images);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching news data", error);
        }
    }



    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }

    // const fetchLocation = async () => {
    //     try {
    //         const response = await fetch("/api/admin/location");
    //         if (response.ok) {
    //             const data = await response.json();
    //             setLocationList(data.data);
    //         }
    //     } catch (error) {
    //         console.log("Error in fetching location", error);
    //     }
    // }


    useEffect(() => {
        fetchCategory().then(() => ((editMode) ? fetchNewsData() : null));
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    }, [watch("slug")])

    const handleAutoGenerate = () => {
        const name = watch("title");
        if (!name) return;
        const slug = name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setValue("slug", slug);
      };



    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleImageUpload = async (uploadedUrl: string) => {
        setImageUrls((prev) => [...prev, uploadedUrl]);
        setValue("images", [...imageUrls, uploadedUrl]);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
        setValue(
            "images",
            imageUrls.filter((_, index) => index !== indexToRemove)
        );
    }; 



    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-md font-bold'>{editMode ? "Edit News" : "Add News"}</h1>
            <AdminItemContainer>
            <form className='flex flex-col gap-5 p-5 rounded-md' onSubmit={handleSubmit(handleAddNews)}>

                <div>
                    <Label className=''>Title</Label>
                    <Input type='text' placeholder='Title' {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div>
                    <Label className=''>Sub Title</Label>
                    <Input type='text' placeholder='Sub Title' {...register("subTitle", { required: "Sub Title is required" })} />
                    {errors.subTitle && <p className='text-red-500'>{errors.subTitle.message}</p>}
                </div>
                <div>
                    <Label className=''>Description</Label>
                    <Textarea placeholder='Description' {...register("description")} />
                </div>
                <div>
                <Label className='flex gap-2 items-center mb-1'>
                                                Slug
                                                <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                    <p>Auto Generate</p>
                                                    <RiAiGenerateText />
                                                </div>
                                                </Label>
                    <Input type='text' placeholder='Slug' {...register("slug", {
                        required: "Slug is required", pattern: {
                            value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                            message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
                        }
                    })} />
                    {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className=''>Category</Label>
                    <Controller
                        name="category"
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
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                </div>

                <div>
                    <Label className=''>Date</Label>
                    <Input type='date' placeholder='Date' max={new Date().toISOString().split("T")[0]} {...register("date", { required: "Date is required" })} />
                    {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                </div>


                <div className='grid grid-cols-1 gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Label className=''>Thumbnail</Label>
                            <ImageUploader onChange={(url) => setValue("thumbnail", url)} value={watch("thumbnail")} recommendedDimension='600 x 607' />
                            {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Thumbnail Alt</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thumbnailAlt")} />
                            {errors.thumbnailAlt && <p className='text-red-500'>{errors.thumbnailAlt.message}</p>}
                        </div>
                    </div>

                </div>

                <div className='flex flex-col gap-2 rounded-md'>
                   
                <div>
                    <Label className="block text-sm">Images</Label>
                    <div className="mt-2">
                        <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} recommendedDimension='Recommended: 1200 x 631 (px)' />
                    </div>
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
                </div>

                

                </div>

                <div className='flex flex-col gap-2'>
                    <Label className=''>Content</Label>
                    <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                    }} />
                    {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                </div>

                <div className="h-fit w-full border-gray-300 rounded-md mt-5">
                    <div className="flex justify-between border-b-2 pb-2">
                        <Label className="text-sm ">Meta Section</Label>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                        <div>
                            <Label>Meta title</Label>
                            <Input type="text" {...register("metaTitle")} />
                        </div>
                        <div>
                            <Label>Meta Description</Label>
                            <Input type="text" {...register("metaDescription")} />
                        </div>
                    </div>
                </div>


                <div className='flex justify-center'>
                    <Button type='submit' className='w-full'>Submit</Button>
                </div>

            </form>
            </AdminItemContainer>
        </div>
    )
}

export default NewsForm