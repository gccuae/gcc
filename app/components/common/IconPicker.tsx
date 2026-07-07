"use client"

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

type Icon = {
    _id: string;
    title: string;
    image: string;
    imageAlt: string;
}

interface IconPickerProps {
    value: string;
    onChange: (image: string, imageAlt?: string) => void;
}

export const IconPicker = ({ value, onChange }: IconPickerProps) => {
    const [icons, setIcons] = useState<Icon[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchIcons = async () => {
        setLoading(true);
        try {
            // limit set high since this is a picker, not a paginated admin list
            const response = await fetch(`/api/admin/icons?page=1&limit=100`);
            if (response.ok) {
                const data = await response.json();
                setIcons(data.data);
            }
        } catch (error) {
            console.error("Error fetching icons for picker", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchIcons();
        }
    }, [open]);

    const filteredIcons = icons.filter((icon) =>
        icon.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (icon: Icon) => {
        onChange(icon.image, icon.imageAlt);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                type="button"
                className="border rounded-md p-2 flex items-center gap-3 hover:bg-gray-50 w-full"
            >
                {value ? (
                    <>
                        <img src={value} className="h-10 w-10 object-contain" />
                        <span className="text-sm text-gray-600">Change logo</span>
                    </>
                ) : (
                    <span className="text-sm text-gray-500">Select a logo</span>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select a Logo</DialogTitle>
                </DialogHeader>

                <Input
                    type="text"
                    placeholder="Search icons..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto mt-2">
                    {loading && <p className="col-span-4 text-sm text-gray-500">Loading...</p>}

                    {!loading && filteredIcons.length === 0 && (
                        <p className="col-span-4 text-sm text-gray-500">No icons found.</p>
                    )}

                    {!loading && filteredIcons.map((icon) => (
                        <button
                            type="button"
                            key={icon._id}
                            onClick={() => handleSelect(icon)}
                            className={`border rounded-md p-2 flex flex-col items-center gap-1 hover:border-primary ${
                                value === icon.image ? "border-primary ring-1 ring-primary" : "border-gray-200"
                            }`}
                        >
                            <img src={icon.image} alt={icon.imageAlt} className="h-10 w-10 object-contain" />
                            <span className="text-xs text-gray-600 truncate w-full text-center">{icon.title}</span>
                        </button>
                    ))}
                </div>

                <DialogClose className="mt-2 self-end text-sm text-gray-500 hover:text-gray-700">
                    Close
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};