"use client"

import { Label } from '@radix-ui/react-label';
import React, { useEffect } from 'react'
import { useForm,useFieldArray, Controller } from "react-hook-form";
import { RiDeleteBinLine } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/ui/file-uploader';
import { useRouter,useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader';

interface Certifications {
    files: {
        mainTitle: string;
        subTitle: string;
        file: string;
        thumbnail: string;
        thumbnailAlt: string;
    }[];
}

const IndiResource = () => {
    const router = useRouter();
            const { id } = useParams();

    const { control, register, handleSubmit, formState: { errors }, setValue, getValues,watch } = useForm<Certifications>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "files"
    });

    useEffect(()=>{
        console.log(watch("files"))
    },[watch("files")])

    const onSubmit = async () => {
        try {
            const response = await fetch(`/api/admin/awards?id=${id}`, {
                method: "POST",
                body: JSON.stringify(getValues("files")),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/awards");
            }
        } catch (error) {
            console.log("Error adding awards", error);
        }
    };

    const fetchResourceData = async () => {
        try {
            const response = await fetch(`/api/admin/awards?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("files", data.data.files);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching awards data", error);
        }
    }

    useEffect(() => {
        fetchResourceData();
    }, []);

  return (
    <div className='flex flex-col gap-5'>
        <h1 className='text-md font-semibold'>Files</h1>
        <div className='border-2 p-2 rounded-md grid grid-cols-2 gap-5'>


                    {fields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r pr-5 even:border-r-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => remove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>File</Label>
                                    <Controller
                                        name={`files.${index}.file`}
                                        control={control}
                                        rules={{ required: "File is required" }}
                                        render={({ field }) => (
                                            <FileUploader
                                                value={field.value}
                                                onChange={(url) => {
                                                    field.onChange(url); // update file URL
                                                  }}
                                            />
                                        )}
                                    />
                                    {errors.files?.[index]?.file && <p className='text-red-500'>{errors.files?.[index]?.file.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Main Title</Label>
                                    <Input type='text' placeholder='Main Title' {...register(`files.${index}.mainTitle`)} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Sub Title</Label>
                                    <Input type='text' placeholder='Sub Title' {...register(`files.${index}.subTitle`)} />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Thumbnail</Label>
                                                <Controller
                                                    name={`files.${index}.thumbnail`}
                                                    control={control}
                                                    rules={{ required: "Thumbnail is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                {errors.files?.[index]?.thumbnail && (
                                                    <p className="text-red-500">{errors.files?.[index]?.thumbnail.message}</p>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`files.${index}.thumbnailAlt`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.files?.[index]?.thumbnailAlt && <p className='text-red-500'>{errors.files?.[index]?.thumbnailAlt.message}</p>}
                                                </div>
                                            </div>


                                        </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end'>
                        <Button type='button' addItem className="cursor-pointer" onClick={() => append({ file: "", mainTitle: "",subTitle:"",thumbnail:"",thumbnailAlt:"" })}>Add Item</Button>
                    </div>

                <Button type='submit' onClick={handleSubmit(onSubmit)} className='w-full mx-auto cursor-pointer'>Submit</Button>
    </div>
  )
}

export default IndiResource