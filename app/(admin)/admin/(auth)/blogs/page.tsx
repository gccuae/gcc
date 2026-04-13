"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, Controller, Path } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
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
import { FaEdit, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import BlogCard from './BlogCard';
import { FaEye } from "react-icons/fa";

interface BlogFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    bannerHidden: boolean;
    blogsHidden: boolean;
}

const BlogsPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<BlogFormProps>();

    const bannerStatus = watch("bannerHidden");
    const blogStatus = watch("blogsHidden");

    const toggleSection = (section: string, value: boolean) => {
        if (section === "bannerHidden" || section === "blogsHidden") {
            setValue(section as Path<BlogFormProps>, !value);
        } else {
            setValue(`${section}.hidden` as Path<BlogFormProps>, !value);
        }
    };


    const [category, setCategory] = useState<string>("")

    const [categoryList, setCategoryList] = useState<{ _id: string, category: string }[]>([]);
    const [blogList, setBlogList] = useState<{ _id: string, title: string, slug: string, status: string }[]>([]);
    const [reorderMode, setReorderMode] = useState(false);


    const handleAddBlog = async (data: BlogFormProps) => {
        try {
            const response = await fetch(`/api/admin/blogs`, {
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

    const handleDeleteBlog = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/blogs?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                fetchBlogData();
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in deleting blog", error);
        }
    }

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/admin/blogs`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("bannerHidden", data.data.bannerHidden);
                setValue("blogsHidden", data.data.blogsHidden);

                setBlogList(data.data.categories.flatMap((blog: { blogs: { title: string; }[]; }) => blog.blogs));
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/blogs/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }


    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/blogs/category", {
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
            const response = await fetch(`/api/admin/blogs/category?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
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
            const response = await fetch(`/api/admin/blogs/category?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    }


    const getTaskPos = (id: number | string) => blogList.findIndex((item: { _id: string }) => (item._id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setBlogList((blogList: { _id: string; title: string, status: string, slug: string }[]) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            return arrayMove(blogList, originalPos, newPos);
        });
    };


    const confirmPosition = async () => {
        setReorderMode(!reorderMode);

        const updatedBlogs = blogList.map((blog) => ({
            ...blog,
        }));

        setBlogList(updatedBlogs);

        const formData = new FormData()
        formData.append('blogs', JSON.stringify(updatedBlogs))
        const response = await fetch(`/api/admin/blogs/reorder`, {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                alert(data.message)
            }
        }
    };



    useEffect(() => {
        fetchBlogData();
        handleFetchCategory();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddBlog)}>


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
                                    <ImageUploader value={field.value} onChange={field.onChange} recommendedDimension='Recommended: 1920 x 453 (px)' />
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
                    <div className='flex justify-between items-center p-5 border-b'>
                        <h1 className='text-lg font-semibold'>Category</h1>
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
                    <div className='flex justify-between items-center p-5 border-b'>
                        <h1 className='text-lg font-semibold'>Blogs</h1>
                        <div className='flex gap-5 items-center'>
                            {blogStatus ? (
                                <FaEyeSlash
                                    onClick={() => toggleSection("blogsHidden", blogStatus)}
                                    className=" text-gray-400 cursor-pointer"
                                />

                            ) : (
                                <FaEye
                                    onClick={() => toggleSection("blogsHidden", blogStatus)}
                                    className=" text-green-600 cursor-pointer"
                                />
                            )}
                            <Button type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                            {!reorderMode && <Link href="/admin/blogs/add" className='bg-primary text-white px-3 py-1 rounded-md font-semibold'>Add Blog</Link>}
                        </div>
                    </div>
                    <div className='px-5 flex flex-col gap-4 py-3'>

                        {reorderMode &&

                            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                <SortableContext items={blogList.map((blog) => blog._id)} strategy={verticalListSortingStrategy}>
                                    {blogList?.map((blog, index) => (
                                        <BlogCard key={index} blog={blog} id={blog._id} />
                                    ))}
                                </SortableContext>
                            </DndContext>

                        }


                        {!reorderMode && blogList?.map((item) => (
                            <div className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all' key={item?._id}>
                                <div>
                                    <p>{item?.title}</p>
                                </div>
                                <div className='flex gap-8 items-center'>
                                    {item.status == "draft" ? (<Link href={`/blog/${item.slug}`} target="_blank"><div className="text-[16px] rounded-xl bg-yellow-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div></Link>) : (<div className="text-[16px] rounded-xl bg-green-300 p-1 flex items-center gap-1">
                                        <FaEye />
                                    </div>)}
                                    <Link href={`/admin/blogs/edit/${item?._id}`}><FaEdit className='text-lg cursor-pointer' /></Link>

                                    <Dialog>
                                        <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteBlog(item._id)}>Yes</DialogClose>
                                            </div>

                                        </DialogContent>

                                    </Dialog>

                                </div>
                            </div>
                        ))}
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

export default BlogsPage