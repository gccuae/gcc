"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useParams,useRouter } from 'next/navigation';

interface OpeningFormProps {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        title: string;
        jobTitle:string;
        department: string;
        location: string;
        employmentType:string;
    };
    secondSection: {
        title: string;
        description: string;
    };
    thirdSection: {
        title: string;
        description: string;
    };
    forthSection: {
        title: string;
        description: string;
    };
}

const OpeningsForm = ({editMode}:{editMode?:boolean}) => {

    const {id} = useParams();
    const router = useRouter();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<OpeningFormProps>();

        const [departmentList, setDepartmentList] = useState<{ _id: string, name: string }[]>([]);
        const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
    
        const handleFetchDepartment = async() => {
            try {
                const response = await fetch("/api/admin/current-openings/department");
                if(response.ok) {
                    const data = await response.json();
                    setDepartmentList(data.data);
                }
            } catch (error) {
                console.log("Error fetching department", error);
            }
        }

        const handleFetchLocation = async() => {
            try {
                const response = await fetch("/api/admin/current-openings/location");
                if(response.ok) {
                    const data = await response.json();
                    setLocationList(data.data);
                }
            } catch (error) {
                console.log("Error fetching location", error);
            }
        }



    const handleAddOpening = async (data: OpeningFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/current-openings?id=${id}` : `/api/admin/current-openings`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/current-openings");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    }

    const fetchOpeningData = async () => {
        try {
            const response = await fetch(`/api/admin/current-openings?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("forthSection", data.data.forthSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching opening data", error);
        }
    }



    useEffect(() => {
        if(editMode){
            handleFetchDepartment().then(()=>handleFetchLocation()).then(()=>fetchOpeningData());
        }else{
            handleFetchDepartment().then(()=>handleFetchLocation());
        }
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddOpening)}>


                <AdminItemContainer>
                <Label main>First Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Job Title</Label>
                            <Input type='text' placeholder='Title' {...register("firstSection.jobTitle", {
                                required: "Title is required"
                            })} />
                            {errors.firstSection?.jobTitle && <p className='text-red-500'>{errors.firstSection?.jobTitle.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                    <Label className=''>Department</Label>
                    <Controller
                        name={`firstSection.department`}
                        control={control}
                        rules={{ required: "Department is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departmentList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.firstSection?.department && <p className="text-red-500">{errors.firstSection?.department.message}</p>}

                </div>

                <div className='flex flex-col gap-2'>
                    <Label className=''>Location</Label>
                    <Controller
                        name={`firstSection.location`}
                        control={control}
                        rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.firstSection?.location && <p className="text-red-500">{errors.firstSection?.location.message}</p>}

                </div>

                <div className='flex flex-col gap-2'>
                    <Label className=''>Employment Type</Label>
                    <Controller
                        name={`firstSection.employmentType`}
                        control={control}
                        rules={{ required: "Employment Type is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Employment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value={"Full Time"}>
                                            Full Time
                                        </SelectItem>
                                        <SelectItem value={"Part Time"}>
                                            Part Time
                                        </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.firstSection?.employmentType && <p className="text-red-500">{errors.firstSection?.employmentType.message}</p>}

                </div>

                    </div>
                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>Second Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                        </div>

                        
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="secondSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                    </div>

                </div>
                </AdminItemContainer>



                <AdminItemContainer>
                <Label main>Third Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name={`thirdSection.description`} control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                        
                    </div>

                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>Forth Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("forthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.forthSection?.title && <p className='text-red-500'>{errors.forthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="forthSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                        
                    </div>

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

export default OpeningsForm