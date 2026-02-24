"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

interface ContactFormProps {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        pageTitle: string;
        mainTitle: string;
        subTitle: string;
    };
    secondSection: {
        mainTitle: string;
        subTitle: string;
        addressTitle: string;
        location: string;
        telephone: string;
        email: string;
        fax: string;
        timings: string;
        map: string;
    };
}

const ContactPage = () => {


    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormProps>();



    const handleAddContact = async (data: ContactFormProps) => {
        try {
            const response = await fetch(`/api/admin/contact`, {
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

    const fetchContactData = async () => {
        try {
            const response = await fetch(`/api/admin/contact`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchContactData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddContact)}>


                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Page Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.pageTitle", {
                                    required: "Page Title is required"
                                })} />
                                {errors.firstSection?.pageTitle && <p className='text-red-500'>{errors.firstSection?.pageTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.mainTitle", {
                                    required: "Main Title is required"
                                })} />
                                {errors.firstSection?.mainTitle && <p className='text-red-500'>{errors.firstSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.firstSection?.subTitle && <p className='text-red-500'>{errors.firstSection?.subTitle.message}</p>}
                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Main Title</Label>
                                <Input type='text' placeholder='Main Title' {...register("secondSection.mainTitle", {
                                    required: "Main Title is required"
                                })} />
                                {errors.secondSection?.mainTitle && <p className='text-red-500'>{errors.secondSection?.mainTitle.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("secondSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.secondSection?.subTitle && <p className='text-red-500'>{errors.secondSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Address Title</Label>
                                <Input type='text' placeholder='Address Title' {...register("secondSection.addressTitle", {
                                    required: "Address Title is required"
                                })} />
                                {errors.secondSection?.addressTitle && <p className='text-red-500'>{errors.secondSection?.addressTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Location</Label>
                                <Textarea placeholder='Description' {...register(`secondSection.location`, {
                                    required: "Value is required"
                                })} />
                                {errors.secondSection?.location && <p className='text-red-500'>{errors.secondSection?.location.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Telephone</Label>
                                <Input type='text' placeholder='Address Title' {...register("secondSection.telephone", {
                                    required: "Telephone is required"
                                })} />
                                {errors.secondSection?.telephone && <p className='text-red-500'>{errors.secondSection?.telephone.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Email</Label>
                                <Input type='text' placeholder='Address Title' {...register("secondSection.email", {
                                    required: "Email is required"
                                })} />
                                {errors.secondSection?.email && <p className='text-red-500'>{errors.secondSection?.email.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Fax</Label>
                                <Input type='text' placeholder='Address Title' {...register("secondSection.fax", {
                                    required: "Fax is required"
                                })} />
                                {errors.secondSection?.fax && <p className='text-red-500'>{errors.secondSection?.fax.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Timings</Label>
                                <Textarea placeholder='Description' {...register(`secondSection.timings`, {
                                    required: "Value is required"
                                })} />
                                {errors.secondSection?.timings && <p className='text-red-500'>{errors.secondSection?.timings.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Map</Label>
                                <Input type='text' placeholder='Address Title' {...register("secondSection.map", {
                                    required: "Fax is required"
                                })} />
                                {errors.secondSection?.map && <p className='text-red-500'>{errors.secondSection?.map.message}</p>}
                            </div>


                        </div>

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

export default ContactPage