"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { FileUploader } from "@/components/ui/file-uploader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GroupCompanyFormProps {
    metaTitle: string;
    metaDescription: string;
    status: string;
    firstSection: {
        hidden: boolean;
        title: string;
    };
    secondSection: {
        hidden: boolean;
        address: string;
        map: string;
        email: string;
        phone: string;
    };
    thirdSection: {
        hidden: boolean;
        title: string;
        items: {
            title: string;
            link: string;
        }[]
    };
    forthSection: {
        hidden: boolean;
        items: {
            title: string;
            link: string;
        }[]
    };
    fifthSection: {
        hidden: boolean;
        title: string;
        file: string;
        buttonText: string;
    }
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


    const firstStatus = watch("firstSection.hidden");
    const secondStatus = watch("secondSection.hidden");
    const thirdStatus = watch("thirdSection.hidden");
    const forthStatus = watch("forthSection.hidden");
    const fifthStatus = watch("fifthSection.hidden");

    const toggleSection = (section: string, value: boolean) => {
        setValue(`${section}.hidden` as Path<GroupCompanyFormProps>, !value);
    };

    const {
        fields: thirdSectionItems,
        append: thirdSectionAppend,
        remove: thirdSectionRemove,
    } = useFieldArray({
        control,
        name: "thirdSection.items",
    });

    const {
        fields: forthSectionItems,
        append: forthSectionAppend,
        remove: forthSectionRemove,
    } = useFieldArray({
        control,
        name: "forthSection.items",
    });


    const handleAddGroupCompany = async (data: GroupCompanyFormProps) => {
        try {
            const response = await fetch(`/api/admin/footer`, {
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


    const fetchGroupCompanyData = async () => {
        try {
            const response = await fetch(`/api/admin/footer`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("status", data.data.status);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("forthSection", data.data.forthSection);
                setValue("forthSection.items", data.data.forthSection.items);
                setValue("fifthSection", data.data.fifthSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
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
                        onClick={() => handleSubmit((data) => handleAddGroupCompany({ ...data, status: watch("status") }))()}
                        className="bg-green-700"
                    >
                        Save
                    </Button>
                </div>

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
                        </div>

                        {/* <div>
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
                                                    rules={{ required: "Logo is required" }}
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
                        </div> */}
                    </div>
                </AdminItemContainer>


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
                                <Label className="font-bold">Address</Label>
                                <Textarea
                                    placeholder="Address"
                                    {...register("secondSection.address", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.secondSection?.address && (
                                    <p className="text-red-500">
                                        {errors.secondSection?.address.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Map</Label>
                                <Input
                                    type="text"
                                    placeholder="Map"
                                    {...register("secondSection.map", {
                                        required: "Map is required",
                                    })}
                                />
                                {errors.secondSection?.map && (
                                    <p className="text-red-500">
                                        {errors.secondSection?.map.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Email</Label>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...register("secondSection.email", {
                                        required: "Email is required",
                                    })}
                                />
                                {errors.secondSection?.email && (
                                    <p className="text-red-500">
                                        {errors.secondSection?.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Phone</Label>
                                <Input
                                    type="text"
                                    placeholder="Phone"
                                    {...register("secondSection.phone", {
                                        required: "Phone is required",
                                    })}
                                />
                                {errors.secondSection?.phone && (
                                    <p className="text-red-500">
                                        {errors.secondSection?.phone.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* <div>
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
                                                    rules={{ required: "Logo is required" }}
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
                        </div> */}
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Third Section</Label>

                    {thirdStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("thirdSection", thirdStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("thirdSection", thirdStatus)}
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
                                    {...register("thirdSection.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.thirdSection?.title && (
                                    <p className="text-red-500">
                                        {errors.thirdSection?.title.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {thirdSectionItems.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => thirdSectionRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        {...register(`thirdSection.items.${index}.title`, {
                                                            required: "Title is required",
                                                        })}
                                                    />
                                                    {errors.thirdSection?.items?.[index]?.title && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.thirdSection?.items?.[index]?.title
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Link</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Link"
                                                        {...register(`thirdSection.items.${index}.link`, {
                                                            required: "Value is required",
                                                        })}
                                                    />
                                                    {errors.thirdSection?.items?.[index]?.link && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.thirdSection?.items?.[index]?.link
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
                                        thirdSectionAppend({
                                            title: "",
                                            link: "",
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Forth Section</Label>

                    {forthStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("forthSection", forthStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("forthSection", forthStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}

                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {forthSectionItems.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => forthSectionRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        {...register(`forthSection.items.${index}.title`, {
                                                            required: "Title is required",
                                                        })}
                                                    />
                                                    {errors.forthSection?.items?.[index]?.title && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.forthSection?.items?.[index]?.title
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Link</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Link"
                                                        {...register(`forthSection.items.${index}.link`, {
                                                            required: "Value is required",
                                                        })}
                                                    />
                                                    {errors.forthSection?.items?.[index]?.link && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.forthSection?.items?.[index]?.link
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
                                        forthSectionAppend({
                                            title: "",
                                            link: "",
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>

                    {fifthStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("fifthSection", fifthStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("fifthSection", fifthStatus)}
                            className="absolute top-4 right-4 text-green-600 cursor-pointer"
                        />
                    )}

                    <div className='p-5 rounded-md flex flex-col gap-2'>


                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>File</Label>
                            <Controller
                                name="fifthSection.file"
                                control={control}
                                render={({ field }) => (
                                    <FileUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Label className='font-bold'>Button Text</Label>
                            <Input type='text' placeholder='Button Text' {...register("fifthSection.buttonText")} />
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


                {/* <div className="flex">
                    <Button
                        type="submit"
                        className="cursor-pointer text-white text-[16px] w-full"
                    >
                        Submit
                    </Button>
                </div> */}
            </form>
        </div>
    );
};

export default GroupCompanyPage;
