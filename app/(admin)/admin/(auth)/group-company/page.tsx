"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CompanyCard from "./CompanyCard";

interface GroupCompanyFormProps {
    metaTitle: string;
    metaDescription: string;
    script: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    bannerHidden: boolean;
    firstSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: {
            logo: string;
            logoAlt: string;
            number: string;
            value: string;
        }[];
    };
    secondSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: {
            link: string;
            hideCompany: boolean;
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            category: string;
        }[];
    };
}

const GroupCompanyPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch
    } = useForm<GroupCompanyFormProps>();


    const bannerStatus = watch("bannerHidden");
    const firstStatus = watch("firstSection.hidden");
    const secondStatus = watch("secondSection.hidden");

    const toggleSection = (section: string, value: boolean) => {
        if (section === "bannerHidden") {
            setValue("bannerHidden", !value);
        } else {
            setValue(`${section}.hidden` as Path<GroupCompanyFormProps>, !value);
        }
    };

    const {
        fields: firstSectionItems,
        append: firstSectionAppend,
        remove: firstSectionRemove,
    } = useFieldArray({
        control,
        name: "firstSection.items",
    });

    const {
        fields: secondSectionItems,
        append: secondSectionAppend,
        remove: secondSectionRemove,
        move,
    } = useFieldArray({
        control,
        name: "secondSection.items",
    });

    const [category, setCategory] = useState<string>("");
    const [reorderMode, setReorderMode] = useState(false);

    const [categoryList, setCategoryList] = useState<
        { _id: string; category: string }[]
    >([]);

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/group-company/category");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    };

    useEffect(() => {
        handleFetchCategory();
    }, []);

    const handleAddGroupCompany = async (data: GroupCompanyFormProps) => {
        try {
            const response = await fetch(`/api/admin/group-company`, {
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
    };

    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/group-company/category", {
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
    };

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(
                `/api/admin/group-company/category?id=${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ name: category }),
                },
            );
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
                fetchGroupCompanyData();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(
                `/api/admin/group-company/category?id=${id}`,
                {
                    method: "DELETE",
                },
            );
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleFetchCategory();
                fetchGroupCompanyData();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    };

    const fetchGroupCompanyData = async () => {
        try {
            const response = await fetch(`/api/admin/group-company`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("script", data.data.script);
                setValue("bannerHidden", data.data.bannerHidden);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    };

    const getTaskPos = (id: number | string) =>
        secondSectionItems.findIndex((item: { id: string }) => item.id == id);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        if (originalPos !== -1 && newPos !== -1) {
            move(originalPos, newPos);
        }
    };

    useEffect(() => {
        fetchGroupCompanyData();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleAddGroupCompany)}
            >
                <AdminItemContainer>
                    <Label className="" main>
                        Banner
                    </Label>

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

                    <div className="p-5 rounded-md grid grid-cols-2 gap-5">
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
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Alt Tag</Label>
                                <Input
                                    type="text"
                                    placeholder="Alt Tag"
                                    {...register("bannerAlt")}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Page Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Page Title"
                                    {...register("pageTitle")}
                                />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>First Section</Label>

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

                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("firstSection.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.firstSection?.title && (
                                    <p className="text-red-500">
                                        {errors.firstSection?.title.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm font-bold">Description</Label>
                                <Controller
                                    name="firstSection.description"
                                    control={control}
                                    rules={{ required: "Description is required" }}
                                    render={({ field }) => {
                                        return (
                                            <Textarea value={field.value} onChange={field.onChange} />
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {firstSectionItems.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => firstSectionRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Logo</Label>
                                                <Controller
                                                    name={`firstSection.items.${index}.logo`}
                                                    control={control}
                                                    // rules={{ required: "Logo is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            isLogo
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 100 x 100 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.firstSection?.items?.[index]?.logo && (
                                                    <p className="text-red-500">
                                                        {errors.firstSection?.items?.[index]?.logo.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Alt Tag</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Alt Tag"
                                                        {...register(
                                                            `firstSection.items.${index}.logoAlt`,
                                                            {
                                                                required: "Value is required",
                                                            },
                                                        )}
                                                    />
                                                    {errors.firstSection?.items?.[index]?.logoAlt && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.firstSection?.items?.[index]?.logoAlt
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Number</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Number"
                                                        {...register(`firstSection.items.${index}.number`, {
                                                            required: "Number is required",
                                                        })}
                                                    />
                                                    {errors.firstSection?.items?.[index]?.number && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.firstSection?.items?.[index]?.number
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Value</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Value"
                                                        {...register(`firstSection.items.${index}.value`, {
                                                            required: "Value is required",
                                                        })}
                                                    />
                                                    {errors.firstSection?.items?.[index]?.value && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.firstSection?.items?.[index]?.value
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="button"
                                    addItem
                                    onClick={() =>
                                        firstSectionAppend({
                                            logo: "",
                                            logoAlt: "",
                                            number: "",
                                            value: "",
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                {/* <AdminItemContainer>
                    <div className="flex justify-between items-center p-5">
                        <h1 className="text-md font-semibold">Team Category</h1>
                        <Dialog>
                            <DialogTrigger
                                className="bg-primary text-white px-3 py-1 rounded-md font-semibold"
                                onClick={() => setCategory("")}
                            >
                                Add Category
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Category</DialogTitle>
                                    <DialogDescription>
                                        <Input
                                            type="text"
                                            placeholder="Category Name"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose
                                    className="bg-black text-white px-2 py-1 rounded-md"
                                    onClick={handleAddCategory}
                                >
                                    Save
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="px-5 flex flex-col gap-4 py-3">
                        {categoryList.map((item) => (
                            <div
                                className="flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all"
                                key={item._id}
                            >
                                <div>
                                    <p>{item.category}</p>
                                </div>
                                <div className="flex gap-8 items-center">
                                    <Dialog>
                                        <DialogTrigger onClick={() => setCategory(item.category)}>
                                            <FaEdit className="text-lg cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Category</DialogTitle>
                                                <DialogDescription>
                                                    <Input
                                                        type="text"
                                                        placeholder="Category Name"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose
                                                className="bg-black text-white px-2 py-1 rounded-md"
                                                onClick={() => handleEditCategory(item._id)}
                                            >
                                                Save
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger>
                                            <MdDelete className="text-lg cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                                                    No
                                                </DialogClose>
                                                <DialogClose
                                                    className="bg-black text-white px-2 py-1 rounded-md"
                                                    onClick={() => handleDeleteCategory(item._id)}
                                                >
                                                    Yes
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </AdminItemContainer> */}

                <AdminItemContainer>
                    <Label main>Second Section</Label>

                    {secondStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("secondSection", secondStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("secondSection", secondStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}

                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("secondSection.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.secondSection?.title && (
                                    <p className="text-red-500">
                                        {errors.secondSection?.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Description</Label>
                                <Controller
                                    name="secondSection.description"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Textarea value={field.value} onChange={field.onChange} />
                                        );
                                    }}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center my-5">
                                    <Label className="font-bold">Items</Label>
                                    <Button
                                        disabled={secondSectionItems.length < 2}
                                        type="button"
                                        className={`text-white text-[16px] ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`}
                                        onClick={() => setReorderMode(!reorderMode)}
                                    >
                                        {reorderMode ? "Done" : "Reorder"}
                                    </Button>
                                </div>
                                <div className="border p-2 rounded-md flex flex-col gap-5">
                                    {reorderMode && (
                                        <DndContext
                                            collisionDetection={closestCorners}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={secondSectionItems.map((item) => item.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {secondSectionItems?.map((item, index) => (
                                                    <CompanyCard key={index} item={item} id={item.id} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}

                                    {!reorderMode &&
                                        secondSectionItems.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                            >
                                                <div className="absolute top-2 right-2">
                                                    <RiDeleteBinLine
                                                        onClick={() => secondSectionRemove(index)}
                                                        className="cursor-pointer text-red-600"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Image</Label>
                                                        <Controller
                                                            name={`secondSection.items.${index}.image`}
                                                            control={control}
                                                            rules={{ required: "Image is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 600 x 600 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.secondSection?.items?.[index]?.image && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.secondSection?.items?.[index]?.image
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(
                                                                    `secondSection.items.${index}.imageAlt`,
                                                                    {
                                                                        required: "Value is required",
                                                                    },
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]
                                                                ?.imageAlt && (
                                                                    <p className="text-red-500">
                                                                        {
                                                                            errors.secondSection?.items?.[index]
                                                                                ?.imageAlt.message
                                                                        }
                                                                    </p>
                                                                )}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Logo</Label>
                                                        <Controller
                                                            name={`secondSection.items.${index}.logo`}
                                                            control={control}
                                                            // rules={{ required: "Logo is required" }}
                                                            render={({ field }) => (
                                                                <ImageUploader
                                                                    isLogo
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    recommendedDimension="Recommended: 200 x 51 (px)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.secondSection?.items?.[index]?.logo && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.secondSection?.items?.[index]?.logo
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Alt Tag</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Alt Tag"
                                                                {...register(
                                                                    `secondSection.items.${index}.logoAlt`,
                                                                    {
                                                                        required: "Value is required",
                                                                    },
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]
                                                                ?.logoAlt && (
                                                                    <p className="text-red-500">
                                                                        {
                                                                            errors.secondSection?.items?.[index]
                                                                                ?.logoAlt.message
                                                                        }
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <Label className="font-bold">Title</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder="Title"
                                                                {...register(
                                                                    `secondSection.items.${index}.title`,
                                                                    {
                                                                        required: "Value is required",
                                                                    },
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]?.title && (
                                                                <p className="text-red-500">
                                                                    {
                                                                        errors.secondSection?.items?.[index]?.title
                                                                            .message
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label className="">Category</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.category`}
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
                                                                        <SelectItem
                                                                            key={index}
                                                                            value={item.category}
                                                                        >
                                                                            {item.category}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.category && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.secondSection?.items?.[index]?.category
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-2 mt-2    ">
                                                    <Controller
                                                        name={`secondSection.items.${index}.hideCompany`}
                                                        control={control}
                                                        defaultValue={false}
                                                        render={({ field }) => (
                                                            <div className="flex items-center gap-3 cursor-pointer">
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={(checked) =>
                                                                        field.onChange(!!checked)
                                                                    }
                                                                />
                                                                <label className="text-sm font-medium cursor-pointer">
                                                                    {field.value
                                                                        ? "Click to show company"
                                                                        : "Click to hide company"}
                                                                </label>
                                                            </div>
                                                        )}
                                                    />

                                                    {errors.secondSection?.items?.[index]
                                                        ?.hideCompany && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.secondSection?.items?.[index]
                                                                        ?.hideCompany.message
                                                                }
                                                            </p>
                                                        )}
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Link</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Link"
                                                            {...register(`secondSection.items.${index}.link`)}
                                                        />
                                                        {errors.secondSection?.items?.[index]?.link && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.secondSection?.items?.[index]?.link
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="flex justify-end mt-2">
                                    <Button
                                        type="button"
                                        addItem
                                        onClick={() =>
                                            secondSectionAppend({
                                                hideCompany: false,
                                                link: "",
                                                title: "",
                                                image: "",
                                                imageAlt: "",
                                                logo: "",
                                                logoAlt: "",
                                                category: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="p-5 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                                type="text"
                                placeholder=""
                                {...register("metaTitle")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Description</Label>
                            <Input
                                type="text"
                                placeholder=""
                                {...register("metaDescription")}
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <Label className="font-bold">Script</Label>
                            <Textarea placeholder="" {...register("script")} />
                        </div>
                    </div>
                </AdminItemContainer>

                <div className="flex">
                    <Button
                        type="submit"
                        className="cursor-pointer text-white text-[16px] w-full"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GroupCompanyPage;
