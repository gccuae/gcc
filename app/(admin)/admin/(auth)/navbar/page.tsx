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
import ItemCard from './CertificateCard';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TbReorder } from "react-icons/tb";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6";

interface QhseFormProps {
    status: string;
    navSection: {
        items: {
            title: string;
            url: string;
            hidden: boolean;
            subItems: {
                id: string;
                title: string;
                url: string;
                hidden: boolean;
            }[]
        }[];
    };
}

const Navbar = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<QhseFormProps>();

    const [reorderMode, setReorderMode] = useState(false);
    const [reorderModeSubItem, setReorderModeSubItem] = useState(false);

    const [toReorderCategory, setToReorderCategory] = useState<number | null>(null)

    const { fields: navSectionItems, append: navSectionAppend, remove: navSectionRemove, move } = useFieldArray({
        control,
        name: "navSection.items"
    });


    const handleAddQhse = async (data: QhseFormProps) => {
        try {
            const response = await fetch(`/api/admin/navbar`, {
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
            const response = await fetch(`/api/admin/navbar`);
            if (response.ok) {
                const data = await response.json();

                const normalizedItems = data.data.navSection.items.map((item: any) => ({
                    ...item,
                    hidden: item.hidden ?? false, // ✅ ensure boolean
                    subItems: (item.subItems || []).map((sub: any) => ({
                        ...sub,
                        hidden: sub.hidden ?? false // ✅ for subItems too
                    }))
                }));

                setValue("navSection.items", normalizedItems);
                setValue("status", data.data.status);
            }
        } catch (error) {
            console.log("Error in fetching qhse data", error);
        }
    }

    const handleAddImage = (index: number) => {
        if (index == null) return;

        const current = watch(`navSection.items.${index}.subItems`) || [];

        setValue(`navSection.items.${index}.subItems`, [
            ...current,
            {
                id: crypto.randomUUID(), // ✅ REQUIRED
                title: "",
                url: "",
                hidden: false
            }
        ]);
    };


    const handleRemoveImage = (index: number, imageIndex: number) => {
        const currentImages = watch(`navSection.items.${index}.subItems`) || [];
        setValue(`navSection.items.${index}.subItems`, currentImages.filter((_, i) => i !== imageIndex));
    }


    const getTaskPos = (id: number | string) => navSectionItems.findIndex((item: { id: string }) => (item.id == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        if (originalPos !== -1 && newPos !== -1) {
            move(originalPos, newPos);
        }
    };


    const handleSubItemDragEnd = (event: DragEndEvent) => {
        if (toReorderCategory == null) return;

        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const items = watch(`navSection.items.${toReorderCategory}.subItems`) || [];

        const oldIndex = items.findIndex((i: any) => i.id === active.id);
        const newIndex = items.findIndex((i: any) => i.id === over.id);

        const updated = [...items];
        const [moved] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, moved);

        setValue(`navSection.items.${toReorderCategory}.subItems`, updated);
    };


    const subItems = toReorderCategory !== null
        ? watch(`navSection.items.${toReorderCategory}.subItems`)
        : [];

    const toggleItem = (index: number, value: boolean) => {
        console.log(index, value);

        setValue(`navSection.items.${index}.hidden`, !value);
    };

    const toggleSubItem = (itemIndex: number, subIndex: number, value: boolean) => {
        setValue(
            `navSection.items.${itemIndex}.subItems.${subIndex}.hidden`,
            !value
        );
    };

    useEffect(() => {
        fetchQhseData();
    }, []);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddQhse)}>
                <input type="hidden" {...register("status")} />

                <div className="flex items-center gap-2 justify-end">
                    <Label className="">Status</Label>
                    <Controller
                        name={`status`}
                        control={control}
                        // rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectItem value={"draft"}>
                                        Draft
                                    </SelectItem>

                                    <SelectItem value={"published"}>
                                        Published
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <Button
                        type="button"
                        onClick={() => handleSubmit((data) => handleAddQhse({ ...data, status: watch("status") }))()}
                        className="bg-green-700"
                    >
                        Save
                    </Button>
                </div>

                <AdminItemContainer>
                    <Label main>Edit Navbar</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <div className='flex justify-between mb-5'>
                                <Label className='font-bold'>Items</Label>
                                <Button disabled={navSectionItems.length < 2} type="button" className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
                            </div>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>

                                {reorderMode &&

                                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                        <SortableContext items={navSectionItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                                            {navSectionItems?.map((item, index) => (
                                                <ItemCard key={index} item={item} id={item.id} />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                }

                                {!reorderMode && navSectionItems.map((field, index) => (

                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0'>

                                        {/* 👇 TOGGLE ICON */}
                                        {watch(`navSection.items.${index}.hidden`) ? (
                                            <FaEyeSlash
                                                onClick={() => toggleItem(index, watch(`navSection.items.${index}.hidden`))}
                                                className="absolute top-2 right-10 text-gray-400 cursor-pointer"
                                            />
                                        ) : (
                                            <FaEye
                                                onClick={() => toggleItem(index, watch(`navSection.items.${index}.hidden`))}
                                                className="absolute top-2 right-10 text-green-600 cursor-pointer"
                                            />
                                        )}

                                        <Sheet
                                            onOpenChange={(open) => {
                                                if (open) {
                                                    setToReorderCategory(index);
                                                    setReorderModeSubItem(false); // always start a fresh sheet in non-reorder view
                                                } else {
                                                    setToReorderCategory(null);
                                                    setReorderModeSubItem(false);
                                                }
                                            }}>
                                            <SheetTrigger asChild>
                                                <div className='flex gap-1 items-center'><FaPlus />/<TbReorder/></div>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Reorder Sub Item</SheetTitle>
                                                    <SheetDescription>
                                                        Reorder/Add items here. Close when you&apos;re done.
                                                    </SheetDescription>

                                                    <div className='flex justify-end mt-4'>
                                                        <Button type="button" className={`text-white text-[16px] ${reorderModeSubItem ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderModeSubItem(!reorderModeSubItem)}>{reorderModeSubItem ? "Done" : "Reorder"}</Button>
                                                    </div>
                                                </SheetHeader>
                                                <div className="flex flex-col gap-3 px-4 h-[80%] overflow-y-auto">
                                                    {reorderModeSubItem && toReorderCategory !== null && (
                                                        <DndContext collisionDetection={closestCorners} onDragEnd={handleSubItemDragEnd}>
                                                            <SortableContext
                                                                items={subItems.map((item, i) => `${i}`)} // better than title
                                                                strategy={verticalListSortingStrategy}
                                                            >
                                                                {subItems.map((item, index) => (
                                                                    <ItemCard key={index} item={item} id={`${index}`} />
                                                                ))}
                                                            </SortableContext>
                                                        </DndContext>
                                                    )}


                                                    {toReorderCategory !== null && !reorderModeSubItem && subItems && subItems.map((file, fileIndex) => (
                                                        <div key={fileIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md h-fit'>
                                                            {/* 👇 SUB ITEM TOGGLE */}
                                                            {watch(`navSection.items.${toReorderCategory}.subItems.${fileIndex}.hidden`) ? (
                                                                <FaEyeSlash
                                                                    onClick={() =>
                                                                        toggleSubItem(
                                                                            toReorderCategory!,
                                                                            fileIndex,
                                                                            watch(`navSection.items.${toReorderCategory}.subItems.${fileIndex}.hidden`)
                                                                        )
                                                                    }
                                                                    className="absolute top-2 right-12 text-gray-400 cursor-pointer"
                                                                />
                                                            ) : (
                                                                <FaEye
                                                                    onClick={() =>
                                                                        toggleSubItem(
                                                                            toReorderCategory!,
                                                                            fileIndex,
                                                                            watch(`navSection.items.${toReorderCategory}.subItems.${fileIndex}.hidden`)
                                                                        )
                                                                    }
                                                                    className="absolute top-2 right-12 text-green-600 cursor-pointer"
                                                                />
                                                            )}

                                                            <div className='absolute top-2 right-2'>
                                                                <RiDeleteBinLine onClick={() => handleRemoveImage(index, fileIndex)} className='cursor-pointer text-red-600' />
                                                            </div>

                                                            <div className='grid grid-cols-2 gap-2'>

                                                                <div className='flex flex-col gap-2'>
                                                                    <Label className='font-bold'>Title</Label>
                                                                    <Input type='text' placeholder='Title' {...register(`navSection.items.${toReorderCategory}.subItems.${fileIndex}.title`, {
                                                                        required: "Value is required"
                                                                    })} />
                                                                    {errors.navSection?.items?.[toReorderCategory]?.subItems?.[fileIndex]?.title && <p className='text-red-500'>{errors.navSection?.items?.[toReorderCategory]?.subItems?.[fileIndex]?.title.message}</p>}
                                                                </div>

                                                                <div className='flex flex-col gap-2'>

                                                                    <Label className='font-bold'>Url</Label>
                                                                    <Input type='text' placeholder='Url' {...register(`navSection.items.${toReorderCategory}.subItems.${fileIndex}.url`, {
                                                                        required: "Value is required"
                                                                    })} />
                                                                    {errors.navSection?.items?.[toReorderCategory]?.subItems?.[fileIndex]?.url && <p className='text-red-500'>{errors.navSection?.items?.[toReorderCategory]?.subItems?.[fileIndex]?.url.message}</p>}

                                                                </div>

                                                            </div>

                                                        </div>
                                                    ))}



                                                </div>
                                                <div className='px-4'>
                                                    <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => {
                                                        if (toReorderCategory !== null) {
                                                            handleAddImage(toReorderCategory);
                                                        }
                                                    }}>Add Sub Item</Button>
                                                </div>
                                                <SheetFooter>
                                                </SheetFooter>
                                            </SheetContent>
                                        </Sheet>


                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => navSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`navSection.items.${index}.title`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.navSection?.items?.[index]?.title && <p className='text-red-500'>{errors.navSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 gap-2'>
                                                <div className='flex flex-col gap-2 mt-2'>
                                                    <Label className='font-bold'>Url</Label>
                                                    <Input type='text' placeholder='Url' {...register(`navSection.items.${index}.url`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.navSection?.items?.[index]?.url && <p className='text-red-500'>{errors.navSection?.items?.[index]?.url.message}</p>}
                                                </div>
                                            </div>

                                        </div>

                                        {/* <div>
                                            <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => { handleAddImage(index) }}>Add Sub Item</Button>
                                        </div> */}


                                        {/* <div className={` gap-2 mt-5 ${reorderModeSubItem ? "flex flex-col" : "grid grid-cols-2"}`}>

                                            {reorderModeSubItem &&

                                                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                                    <SortableContext items={watch(`navSection.items.${index}.subItems`).map((item) => item.title)} strategy={verticalListSortingStrategy}>
                                                        {watch(`navSection.items.${index}.subItems`)?.map((item, index) => (
                                                            <ItemCard key={index} item={item} id={item.id} />
                                                        ))}
                                                    </SortableContext>
                                                </DndContext>
                                            }

                                            {!reorderModeSubItem && watch(`navSection.items.${index}.subItems`).map((file, fileIndex) => (
                                                <div key={fileIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                                    <div className='absolute top-2 right-2'>
                                                        <RiDeleteBinLine onClick={() => handleRemoveImage(index, fileIndex)} className='cursor-pointer text-red-600' />
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`navSection.items.${index}.subItems.${fileIndex}.title`, {
                                                                    required: "Value is required"
                                                                })} />
                                                                {errors.navSection?.items?.[index]?.subItems?.[fileIndex]?.title && <p className='text-red-500'>{errors.navSection?.items?.[index]?.subItems?.[fileIndex]?.title.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Url</Label>
                                                                <Input type='text' placeholder='Url' {...register(`navSection.items.${index}.subItems.${fileIndex}.url`, {
                                                                    required: "Value is required"
                                                                })} />
                                                                {errors.navSection?.items?.[index]?.subItems?.[fileIndex]?.url && <p className='text-red-500'>{errors.navSection?.items?.[index]?.subItems?.[fileIndex]?.url.message}</p>}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))}
                                        </div> */}

                                        {/* <div className='flex justify-end'>
                                            <Button disabled={watch(`navSection.items.${index}.subItems`).length < 2} type="button" className={`text-white text-[16px] w-fit ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => setReorderModeSubItem(!reorderModeSubItem)}>{reorderModeSubItem ? "Done" : "Reorder"}</Button>
                                        </div> */}

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => navSectionAppend({ title: "", url: "", subItems: [], hidden: false })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                {/* <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div> */}

            </form>
        </div>
    )
}

export default Navbar