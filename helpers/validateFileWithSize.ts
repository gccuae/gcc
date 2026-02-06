const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
];


export const validateFilesWithSize = (maxSize: number) => {
    return (files?: FileList) => {
        if (!files || files.length === 0) return true;

        for (const file of Array.from(files)) {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                return "Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed.";
            }

            if (file.size > maxSize) {
                return `Each file must be less than ${Math.round(
                    maxSize / (1024 * 1024)
                )}MB`;
            }
        }

        return true;
    };
};
