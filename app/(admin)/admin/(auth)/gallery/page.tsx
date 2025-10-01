"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
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
import { FilesIcon } from 'lucide-react';
import Link from 'next/link';

interface GalleryFormProps {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
}

const GalleryPage = () => {


    const { register, handleSubmit, setValue } = useForm<GalleryFormProps>();


    const [item, setItem] = useState<string>("")

    const [itemList, setItemList] = useState<{ _id: string, item: string }[]>([]);

    const handleFetchItem = async() => {
        try {
            const response = await fetch("/api/admin/gallery");
            if(response.ok) {
                const data = await response.json();
                console.log(data)
                setItemList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }

    useEffect(()=>{
        handleFetchItem();
    },[])


    const handleAddGallery = async (data: GalleryFormProps) => {
        try {
            const response = await fetch(`/api/admin/gallery`, {
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


    const handleAddItem = async() => {
        try {
            const response = await fetch("/api/admin/gallery",{
                method: "POST",
                body: JSON.stringify({ name: item }),
            });
            if(response.ok) {
                const data = await response.json();
                setItem("");
                alert(data.message);
                handleFetchItem();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const handleEditItem = async(id: string) => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`,{
                method: "PATCH",
                body: JSON.stringify({ name: item }),
            });
            if(response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchItem();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    }

    const handleDeleteItem = async(id: string) => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`,{
                method: "DELETE",
            });
            if(response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchItem();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting item", error);
        }
    }


    const fetchGalleryData = async () => {
        try {
            const response = await fetch(`/api/admin/gallery`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching gallery data", error);
        }
    }



    useEffect(() => {
        fetchGalleryData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddGallery)}>
            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Page Title</Label>
                                <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                            </div>


                <AdminItemContainer>
                    <div className='flex justify-between items-center p-5'>
                        <h1 className='text-md font-semibold'>Gallery</h1>
                        <Dialog>
                            <DialogTrigger className='bg-primary text-white px-3 py-1 rounded-md font-semibold' onClick={() => setItem("")}>Add Item</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Item</DialogTitle>
                                    <DialogDescription>
                                        <Input type="text" placeholder="Category Name" value={item} onChange={(e) => setItem(e.target.value)} />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>Save</DialogClose>
                            </DialogContent>

                        </Dialog>
                    </div>
                    <div className='px-5 flex flex-col gap-4 py-3'>
                        {itemList.map((item) => (
                            <div className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all' key={item._id}>
                                <div>
                                    <p>{item.item}</p>
                                </div>
                                <div className='flex gap-8 items-center'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => setItem(item.item)}><FaEdit className='text-lg cursor-pointer' /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Item</DialogTitle>
                                                <DialogDescription>
                                                    <Input type="text" placeholder="Item Name" value={item.item} onChange={(e) => setItem(e.target.value)} />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditItem(item._id)}>Save</DialogClose>
                                        </DialogContent>

                                    </Dialog>

                                    <Link href={`/admin/gallery/${item._id}`}><FilesIcon className='text-lg cursor-pointer' /></Link>


                                    <Dialog>
                                        <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteItem(item._id)}>Yes</DialogClose>
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

export default GalleryPage