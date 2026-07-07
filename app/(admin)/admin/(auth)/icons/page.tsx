"use client"

import React, { useEffect, useState } from 'react'
import SmartPagination from "../vendor-registration/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUploader } from '@/components/ui/image-uploader';
// import { toast } from 'sonner';

type Icon = {
    _id: string;
    title: string;
    image: string;
    imageAlt: string;
}

const AdminIcons = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;

    const [icons, setIcons] = useState<Icon[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Add/Edit dialog state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imageAlt, setImageAlt] = useState<string>("");

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        router.push(`${pathname}?page=${newPage}`);
    };

    const fetchIconsData = async () => {
        try {
            const response = await fetch(`/api/admin/icons?page=${page}&limit=10`);

            if (response.ok) {
                const data = await response.json();
                setIcons(data.data);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching icons:", error);
        }
    };

    useEffect(() => {
        fetchIconsData();
    }, [page, refetch]);

    const toggleSelectAll = () => {
        if (selectedIds.length === icons.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(icons.map((item) => item._id));
        }
    };

    const openAddDialog = () => {
        setEditingId(null);
        setTitle("");
        setImage("");
        setImageAlt("");
    };

    const openEditDialog = (icon: Icon) => {
        setEditingId(icon._id);
        setTitle(icon.title);
        setImage(icon.image);
        setImageAlt(icon.imageAlt);
    };

    const handleSaveItem = async () => {
        try {
            const isEditing = Boolean(editingId);
            const response = await fetch(
                isEditing ? `/api/admin/icons?id=${editingId}` : "/api/admin/icons",
                {
                    method: isEditing ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, image, imageAlt }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setEditingId(null);
                setTitle("");
                setImage("");
                setImageAlt("");
                setRefetch((prev) => !prev);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving icon", error);
        }
    };

    const handleDeleteSingle = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/icons?id=${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
                setRefetch((prev) => !prev);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            alert("No icons selected");
            return;
        }

        try {
            const response = await fetch(`/api/admin/icons/bulk-delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedIds }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setSelectedIds([]);
                setRefetch((prev) => !prev);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Icons</h1>

                <Dialog>
                    <DialogTrigger
                        className="bg-primary text-white px-3 py-1 rounded-md font-semibold"
                        onClick={openAddDialog}
                    >
                        Add Item
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Item</DialogTitle>
                            <DialogDescription className="flex flex-col gap-2">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Label className="font-bold">Image</Label>
                                <ImageUploader
                                    value={image}
                                    onChange={(url) => setImage(url)}
                                    recommendedDimension='Recommended: 50 x 50 (px)'
                                />
                                <Label className="font-bold">Image Alt</Label>
                                <Input
                                    type="text"
                                    placeholder="Image Alt"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={handleSaveItem}
                        >
                            Save
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-10 justify-end px-5">
                    {selectedIds.length > 0 && (
                        <div className="relative">
                            <MdDelete
                                className="text-red-600 cursor-pointer text-2xl"
                                onClick={handleBulkDelete}
                            />
                            <span className="absolute -top-1 left-4 bg-red-600 text-white flex items-center justify-center text-[10px] rounded-full h-[15px] w-[15px]">
                                {selectedIds.length}
                            </span>
                        </div>
                    )}

                    {icons.length > 0 && (
                        <input
                            type="checkbox"
                            checked={selectedIds.length === icons.length}
                            onChange={toggleSelectAll}
                        />
                    )}
                </div>

                {icons.length > 0 ? (
                    icons.map((icon) => (
                        <div className='w-full relative' key={icon._id}>
                            <div className='flex h-12 items-center px-5 justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                <div className="flex gap-3 items-center">
                                    <img src={icon.image} alt={icon.imageAlt} className='h-12 w-12 object-contain bg-black p-2' />
                                    <h5 className="text-md tracking-tight text-gray-900 dark:text-white">
                                        {icon.title}
                                    </h5>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <Dialog>
                                        <DialogTrigger
                                            className="text-black"
                                            onClick={() => openEditDialog(icon)}
                                        >
                                            <MdEdit />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Item</DialogTitle>
                                                <DialogDescription className="flex flex-col gap-2">
                                                    <Label className="font-bold">Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                    <Label className="font-bold">Image</Label>
                                                    <ImageUploader
                                                        value={image}
                                                        onChange={(url) => setImage(url)}
                                                        recommendedDimension='Recommended: 50 x 50 (px)'
                                                    />
                                                    <Label className="font-bold">Image Alt</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Image Alt"
                                                        value={imageAlt}
                                                        onChange={(e) => setImageAlt(e.target.value)}
                                                    />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose
                                                className="bg-black text-white px-2 py-1 rounded-md"
                                                onClick={handleSaveItem}
                                            >
                                                Save
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>

                                    <MdDelete
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => handleDeleteSingle(icon._id)}
                                    />

                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(icon._id)}
                                        onChange={() => toggleSelect(icon._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No icons available</div>
                )}
            </div>

            {icons.length > 0 && (
                <div className='mb-10'>
                    <SmartPagination
                        page={page}
                        totalPages={totalPages}
                        setPage={changePage}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminIcons;