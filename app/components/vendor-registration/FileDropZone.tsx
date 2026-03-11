"use client";

import React, { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileDropFieldProps {
    register: UseFormRegisterReturn;
    multiple?: boolean;
    hint?: string;
}

const FileDropField: React.FC<FileDropFieldProps> = ({
    register,
    multiple = false,
    hint = "Click to upload or drag & drop files",
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const { ref, onChange, ...restRegister } = register;

    return (
        <div>
            <div onClick={() => inputRef.current?.click()} className={`cursor-pointer border-2 border-dashed rounded-xl px-6 py-10 text-center transition-all
          ${files.length > 0 ? "border-green-500 bg-green-50" : "border-[#C2C2C2]/50 hover:border-black dark:hover:border-white" } `}
            >
                <p className="text-sm text-gray-500 dark:text-white/60">
                    {files.length > 0
                        ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                        : hint}
                </p>

                {files.length > 0 && (
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                        {files.map((file) => (
                            <li key={file.name} className="truncate">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                )}

                <p className="text-xs text-gray-400 mt-2">
                    PDF, DOC, DOCX, JPG, PNG
                </p>
            </div>

            <input
                type="file"
                multiple={multiple}
                className="hidden"
                {...restRegister}
                ref={(el) => {
                    ref(el);
                    inputRef.current = el;
                }}
                onChange={(e) => {
                    const selectedFiles = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                    setFiles(selectedFiles);

                    // IMPORTANT: forward event to react-hook-form
                    onChange(e);
                }}
            />
        </div>
    );
};

export default FileDropField;
