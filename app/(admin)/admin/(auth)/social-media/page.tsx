"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImageUploader } from "@/components/ui/image-uploader";

interface GroupCompanyFormProps {
    socialSection: {
        hidden: boolean;
        items: {
            hidden: boolean;
            title: string;
            link: string;
            image: string;
            imageAlt: string;
        }[]
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


    const forthStatus = watch("socialSection.hidden");

    const toggleSection = (section: string, value: boolean) => {
        setValue(`${section}.hidden` as Path<GroupCompanyFormProps>, !value);
    };

    const {
        fields: forthSectionItems,
        append: forthSectionAppend,
        remove: forthSectionRemove,
    } = useFieldArray({
        control,
        name: "socialSection.items",
    });


    const handleAddGroupCompany = async (data: GroupCompanyFormProps) => {
        try {
            const response = await fetch(`/api/admin/social-media`, {
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
            const response = await fetch(`/api/admin/social-media`);
            if (response.ok) {
                const data = await response.json();
                setValue("socialSection", data.data.socialSection);
                setValue("socialSection.items", data.data.socialSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching social section data", error);
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

                {/* <input type="hidden" {...register("status")} /> */}

                {/* <div className="flex items-center gap-2 justify-end">
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
                </div> */}


                <AdminItemContainer>
                    <Label main>Social Media Section</Label>

                    {forthStatus ? (
                        <FaEyeSlash
                            onClick={() => toggleSection("socialSection", forthStatus)}
                            className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                        />

                    ) : (
                        <FaEye
                            onClick={() => toggleSection("socialSection", forthStatus)}
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
                                        className="grid grid-cols-1 gap-2 relative border-b pb-5 last:border-b-0"
                                    >
                                        <div className="absolute top-1 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => forthSectionRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="grid grid-cols-2 gap-2">

                                                <div className="absolute top-1 right-14">
                                                    {watch(`socialSection.items.${index}.hidden`) ? (
                                                        <FaEyeSlash
                                                            onClick={() => setValue(`socialSection.items.${index}.hidden`, !watch(`socialSection.items.${index}.hidden`))}
                                                            className="cursor-pointer text-gray-400"
                                                        />
                                                    ) : (
                                                        <FaEye
                                                            onClick={() => setValue(`socialSection.items.${index}.hidden`, !watch(`socialSection.items.${index}.hidden`))}
                                                            className="cursor-pointer text-green-600"
                                                        />
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="flex flex-col gap-2">
                                                        <Label className="font-bold">Title</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Title"
                                                            {...register(`socialSection.items.${index}.title`, {
                                                                required: "Title is required",
                                                            })}
                                                        />
                                                        {errors.socialSection?.items?.[index]?.title && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.socialSection?.items?.[index]?.title
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
                                                            {...register(`socialSection.items.${index}.link`, {
                                                                required: "Value is required",
                                                            })}
                                                        />
                                                        {errors.socialSection?.items?.[index]?.link && (
                                                            <p className="text-red-500">
                                                                {
                                                                    errors.socialSection?.items?.[index]?.link
                                                                        .message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <Label className='font-bold'>Image</Label>
                                                    <Controller
                                                        name={`socialSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                            isLogo
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                recommendedDimension="Recommended: 800 x 738 (px)"
                                                            />
                                                        )}
                                                    />
                                                    {errors.socialSection?.items?.[index]?.image && (
                                                        <p className="text-red-500">{errors.socialSection?.items?.[index]?.image.message}</p>
                                                    )}
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`socialSection.items.${index}.imageAlt`)} />
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
                                            hidden: false,
                                            title: "",
                                            link: "",
                                            image: "",
                                            imageAlt: ""
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
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
