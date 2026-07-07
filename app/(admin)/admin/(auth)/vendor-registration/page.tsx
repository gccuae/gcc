"use client"

import React, { useEffect, useState } from 'react'
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import AdminItemContainer from '@/app/components/common/AdminItemContainer';


type Enquiry = {
    _id: string;
    metaTitle: string;
    metaDescription: string;
    script: string;
    vendorName: string,
    tradeLicense: string,
    classification: string,
    website: string,
    services: string,
    expertise: string,
    email: string,
    phone: string,
    address: string,
    icvCertificate: string[],
    companyDocuments: string[],
    additionalAttachments: string[],
}

interface SeoFormProps {
    metaTitle: string;
    metaDescription: string;
    script: string;
}

const AdminEnquiry = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [enquiries, setEnquiries] = useState<Enquiry[]>([])
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const { register, handleSubmit, setValue } = useForm<SeoFormProps>();

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        router.push(`${pathname}?page=${newPage}`);
    };

    useEffect(() => {
        const fetchEnquiriesData = async () => {
            try {
                const response = await fetch(`/api/admin/vendor/enquiry?page=${page}&limit=10`);
                if (response.ok) {
                    const data = await response.json();
                    setEnquiries(data.data);
                    setTotalPages(data.totalPages);
                    // Populate SEO fields
                    if (data.seo) {
                        setValue("metaTitle", data.seo.metaTitle);
                        setValue("metaDescription", data.seo.metaDescription);
                        setValue("script", data.seo.script);
                    }
                }
            } catch (error) {
                console.error("Error fetching enquiries:", error);
            }
        };
        fetchEnquiriesData();
    }, [page, refetch]);

    const toggleSelectAll = () => {
        if (selectedIds.length === enquiries.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(enquiries.map((item) => item._id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            alert("No enquiries selected");
            return;
        }
        try {
            const response = await fetch(`/api/admin/vendor/bulk-delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedIds }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setSelectedIds([]);
                setRefetch((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleteConfirmOpen(false);
        }
    };

    const exportToJSON = () => {
        if (!enquiries.length) {
            alert("No data to export");
            return;
        }
        const jsonData = enquiries.map((item) => ({
            vendorName: item.vendorName,
            tradeLicense: item.tradeLicense,
            classification: item.classification,
            website: item.website,
            services: item.services,
            expertise: item.expertise,
            email: item.email,
            phone: item.phone,
            address: item.address,
            icvCertificate: item.icvCertificate,
            companyDocuments: item.companyDocuments,
            additionalAttachments: item.additionalAttachments,
        }));
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "vendor-enquiries.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleSeoSubmit = async (data: SeoFormProps) => {
        try {
            const response = await fetch(`/api/admin/vendor/enquiry`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error("Error saving SEO data:", error);
        }
    };

    return (
        <div className='flex flex-col gap-5'>

            {/* ── SEO Section ── */}
            <form onSubmit={handleSubmit(handleSeoSubmit)} className='flex flex-col gap-5'>
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
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Script</Label>
                            <Textarea {...register("script")} />
                        </div>
                    </div>
                </AdminItemContainer>
                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Save SEO</Button>
                </div>
            </form>

            {/* ── Enquiries List ── */}
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Enquiries</h1>
                <button
                    onClick={exportToJSON}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Export To JSON
                </button>
            </div>

            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-10 justify-end px-5">
                    {selectedIds.length > 0 && (
                        <div className="relative">
                            <MdDelete className="text-red-600 cursor-pointer text-2xl" onClick={() => setIsDeleteConfirmOpen(true)} />
                            <span className="absolute -top-1 left-4 bg-red-600 text-white flex items-center justify-center text-[10px] rounded-full h-[15px] w-[15px]">
                                {selectedIds.length}
                            </span>
                        </div>
                    )}
                    {enquiries && enquiries.length > 0 && (
                        <input
                            type="checkbox"
                            checked={selectedIds.length === enquiries.length}
                            onChange={toggleSelectAll}
                        />
                    )}
                </div>

                {enquiries && enquiries.length > 0 ? (
                    enquiries.map((item, i) => (
                        <div className='w-full relative' key={i}>
                            <div className='flex h-12 items-center px-5 justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                <div>
                                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">{item.vendorName}</h5>
                                </div>
                                <div className='flex items-center gap-10'>
                                    <button onClick={() => setSelectedEnquiry(item)}>
                                        <LuMessageSquareShare />
                                    </button>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item._id)}
                                        onChange={() => toggleSelect(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No enquiries available</div>
                )}
            </div>

            {enquiries && enquiries.length > 0 && (
                <div className='mb-10'>
                    <SmartPagination page={page} totalPages={totalPages} setPage={changePage} />
                </div>
            )}

            {/* ── Enquiry Detail Modal ── */}
            {selectedEnquiry && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-20">
                        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="grid grid-cols-1 gap-4 text-sm h-[300px] overflow-auto">
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Vendor Name</label>
                                        <span className="text-gray-900">{selectedEnquiry.vendorName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Trade License</label>
                                        <span className="text-gray-900">{selectedEnquiry.tradeLicense}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Classification</label>
                                        <span className="text-gray-900">{selectedEnquiry.classification}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Website</label>
                                        <span className="text-gray-900">{selectedEnquiry.website}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Services</label>
                                        <span className="text-gray-900">{selectedEnquiry.services}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Expertise</label>
                                        <span className="text-gray-900">{selectedEnquiry.expertise}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Email</label>
                                        <span className="text-gray-900">{selectedEnquiry.email}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Phone</label>
                                        <span className="text-gray-900">{selectedEnquiry.phone}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold text-gray-600">Address</label>
                                        <span className="text-gray-900">{selectedEnquiry.address}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <label className="font-semibold text-gray-600">ICV Certificate</label>
                                        <Link href={selectedEnquiry.icvCertificate[0]} className='text-xl'><FaFileAlt /></Link>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <label className="font-semibold text-gray-600">Company Documents</label>
                                        <Link href={selectedEnquiry.companyDocuments[0]} className='text-xl'><FaFileAlt /></Link>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-gray-600">Additional Attachments</label>
                                        <div className='flex gap-1'>
                                            {selectedEnquiry.additionalAttachments.map((item, i) => (
                                                <Link key={i} href={item} className='text-xl'><FaFileAlt /></Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setSelectedEnquiry(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isDeleteConfirmOpen &&
                <div className="relative z-20" aria-labelledby="delete-confirm-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="p-5 flex flex-col gap-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                                <h3 id="delete-confirm-title" className="text-lg font-semibold text-gray-900">
                                    Delete {selectedIds.length} {selectedIds.length === 1 ? "enquiry" : "enquiries"}?
                                </h3>
                                <p className="text-sm text-gray-600">
                                    This action cannot be undone. Are you sure you want to proceed?
                                </p>
                                <div className="flex justify-end gap-3 mt-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                        onClick={() => setIsDeleteConfirmOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500"
                                        onClick={handleBulkDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default AdminEnquiry