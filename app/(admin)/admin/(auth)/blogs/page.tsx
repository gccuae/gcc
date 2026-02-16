"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, Controller } from "react-hook-form";
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
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import BlogCard from './BlogCard';

interface BlogFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
}

const BlogsPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BlogFormProps>();


    const [category, setCategory] = useState<string>("")

    const [categoryList, setCategoryList] = useState<{ _id: string, category: string }[]>([]);
    const [blogList, setBlogList] = useState<{ _id: string, title: string }[]>([]);
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

        setBlogList((blogList: { _id: string; title: string }[]) => {
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
                    <div className='flex justify-between items-center p-5'>
                        <h1 className='text-md font-semibold'>Category</h1>
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
                    <div className='flex justify-between items-center p-5'>
                        <h1 className='text-md font-semibold'>Blogs</h1>
                        <div className='flex gap-2'>
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

export default BlogsPage