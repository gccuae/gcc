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
import { RiAiGenerateText } from 'react-icons/ri'
import AdminItemContainer from '@/app/components/common/AdminItemContainer'




interface BlogFormProps {
    title: string;
    author: string;
    slug: string;
    content: string;
    category: string;
    thumbnail: string;
    thumbnailAlt: string;
    coverPhoto: string;
    coverPhotoAlt: string;
    quote: string;
    quoteAuthor: string;
    metaTitle: string;
    metaDescription: string;
    date: string;
}

const BlogForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [categoryList, setCategoryList] = useState<{ category: string }[]>([]);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<BlogFormProps>();

    const handleAddBlog = async (data: BlogFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/blogs?id=${id}` : "/api/admin/blogs", {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/blogs");
            }
        } catch (error) {
            console.log("Error in adding blog", error);
        }
    }

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/admin/blogs?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.data)
                setValue("title", data.data.title);
                setValue("slug", data.data.slug);
                setValue("content", data.data.content);
                setValue("author", data.data.author);
                setValue("category", data.data.category);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("coverPhoto", data.data.coverPhoto);
                setValue("coverPhotoAlt", data.data.coverPhotoAlt);
                setValue("quote", data.data.quote);
                setValue("quoteAuthor", data.data.quoteAuthor);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                const isoDate = new Date(data.data.date).toISOString().split("T")[0];
                setValue("date", isoDate);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }



    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/blogs/category");
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
        fetchCategory().then(() => ((editMode) ? fetchBlogData() : null));
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

    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-md font-bold'>{editMode ? "Edit Blog" : "Add Blog"}</h1>
            <AdminItemContainer>
            <form className='flex flex-col gap-5 p-5 rounded-md' onSubmit={handleSubmit(handleAddBlog)}>

                <div>
                    <Label className=''>Title</Label>
                    <Input type='text' placeholder='Title' {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div>
                    <Label className=''>Author</Label>
                    <Input type='text' placeholder='Author' {...register("author", { required: "Author is required" })} />
                    {errors.author && <p className='text-red-500'>{errors.author.message}</p>}
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


                <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Label className=''>Thumbnail</Label>
                            <ImageUploader onChange={(url) => setValue("thumbnail", url)} value={watch("thumbnail")} />
                            {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Thumbnail Alt</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thumbnailAlt")} />
                            {errors.thumbnailAlt && <p className='text-red-500'>{errors.thumbnailAlt.message}</p>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Label className=''>Cover Photo</Label>
                            <ImageUploader onChange={(url) => setValue("coverPhoto", url)} value={watch("coverPhoto")} />
                            {errors.coverPhoto && <p className='text-red-500'>{errors.coverPhoto.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Cover Photo Alt</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("coverPhotoAlt")} />
                            {errors.coverPhotoAlt && <p className='text-red-500'>{errors.coverPhotoAlt.message}</p>}
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
                        <Label className="text-sm ">Quote Section</Label>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                        <div>
                            <Label>Quote</Label>
                            <Input type="text" {...register("quote")} />
                        </div>
                        <div>
                            <Label>Quote Author</Label>
                            <Input type="text" {...register("quoteAuthor")} />
                        </div>
                    </div>
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

export default BlogForm