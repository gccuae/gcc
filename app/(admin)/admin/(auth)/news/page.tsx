"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState, useCallback, useRef } from 'react'

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
import { FaEye } from "react-icons/fa";

interface NewsFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    bannerHidden: boolean;
    firstSection: {
        hidden: boolean;
        title: string;
    }
    newsHidden: boolean;
}

const NewsPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<NewsFormProps>();

    const bannerStatus = watch("bannerHidden");
    const firstStatus = watch("firstSection.hidden");
    const newsStatus = watch("newsHidden");
        const dragIndexRef = useRef<number | null>(null);

    const toggleSection = (section: string, value: boolean) => {
        if (section === "bannerHidden" || section === "newsHidden") {
            setValue(section as Path<NewsFormProps>, !value);
        } else {
            setValue(`${section}.hidden` as Path<NewsFormProps>, !value);
        }
    };

    const [category, setCategory] = useState<string>("")

    const [categoryList, setCategoryList] = useState<{ _id: string, category: string }[]>([]);
const [newsList, setNewsList] = useState<{
  _id: string;
  title: string;
  status: string;
  slug: string;
  categoryId: string; // track which category each news belongs to
}[]>([]);


    const handleAddNews = async (data: NewsFormProps) => {
        try {
            const response = await fetch(`/api/admin/news`, {
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

    const handleDeleteNews = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/news?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                fetchNewsData();
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in deleting news", error);
        }
    }

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`/api/admin/news`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("bannerHidden", data.data.bannerHidden);
                setValue("firstSection", data.data.firstSection);
                setValue("newsHidden", data.data.newsHidden);
                setNewsList(
  data.data.categories.flatMap((cat: { _id: string; news: { _id: string; title: string; status: string; slug: string }[] }) =>
    (cat.news ?? []).map((n) => ({ ...n, categoryId: cat._id }))
  )
);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category");
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
            const response = await fetch("/api/admin/news/category", {
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
            const response = await fetch(`/api/admin/news/category?id=${id}`, {
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
            const response = await fetch(`/api/admin/news/category?id=${id}`, {
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



    useEffect(() => {
        fetchNewsData();
        handleFetchCategory();
    }, []);


const handleDragStart = (index: number) => {
  dragIndexRef.current = index;
};

const handleDrop = (toIndex: number) => {
  const from = dragIndexRef.current;
  if (from === null || from === toIndex) return;

  if (newsList[from].categoryId !== newsList[toIndex].categoryId) {
    alert("Cannot move news between categories");
    return;
  }

  const updated = [...newsList];
  const [moved] = updated.splice(from, 1);
  updated.splice(toIndex, 0, moved);
  setNewsList(updated);
  dragIndexRef.current = null;

  const categoryId = newsList[toIndex].categoryId;
  const categoryNews = updated.filter((n) => n.categoryId === categoryId);

  fetch("/api/admin/news/reorder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categoryId,
      orderedNewsIds: categoryNews.map((n) => n._id),
    }),
  })
    .then((r) => r.json())
    .then((d) => { if (!d.success) alert("Reorder failed — " + d.message); })
    .catch(() => alert("Reorder request failed"));
};


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddNews)}>
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
                                        recommendedDimension="Image size should be 1920 x 453 pixels"
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
                    <Label className='' main>First Section</Label>

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

                    <div className='p-5 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
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
    <h1 className='text-lg font-semibold'>News</h1>
    <div className='flex gap-5 items-center'>
      {newsStatus ? (
        <FaEyeSlash onClick={() => toggleSection("newsHidden", newsStatus)} className="text-gray-400 cursor-pointer" />
      ) : (
        <FaEye onClick={() => toggleSection("newsHidden", newsStatus)} className="text-green-600 cursor-pointer" />
      )}
      <Link href="/admin/news/add" className='bg-primary text-white px-3 py-1 rounded-md font-semibold'>
        Add News
      </Link>
    </div>
  </div>

  <div className='px-5 flex flex-col gap-4 py-3'>
    {newsList.map((item, index) => (
      <div
  key={item._id}
  draggable
  onDragStart={() => handleDragStart(index)}
  onDragOver={(e) => e.preventDefault()}
  onDrop={() => handleDrop(index)}
        className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100 hover:shadow-md transition-all cursor-grab active:cursor-grabbing'
      >
        {/* Drag handle */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-[3px] opacity-40 shrink-0">
            <div className="w-4 h-[2px] bg-gray-500 rounded" />
            <div className="w-4 h-[2px] bg-gray-500 rounded" />
            <div className="w-4 h-[2px] bg-gray-500 rounded" />
          </div>
          <div>
            <p>{item.title}</p>
            <p className="text-xs text-gray-400">{item.categoryId}</p>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          {item.status === "draft" ? (
            <Link href={`/news/${item.slug}`} target="_blank">
              <div className="text-[16px] rounded-xl bg-yellow-300 p-1"><FaEye /></div>
            </Link>
          ) : (
            <div className="text-[16px] rounded-xl bg-green-300 p-1"><FaEye /></div>
          )}

          <Link href={`/admin/news/edit/${item._id}`}>
            <FaEdit className='text-lg cursor-pointer' />
          </Link>

          <Dialog>
            <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Are you sure?</DialogTitle></DialogHeader>
              <div className="flex gap-2">
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteNews(item._id)}>Yes</DialogClose>
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

export default NewsPage
