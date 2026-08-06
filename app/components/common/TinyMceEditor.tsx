"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const DEFAULT_CONTENT_CSS =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

const DEFAULT_CONTENT_STYLE = `
  @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  body { padding: 10px; }
`;

const CAREER_CONTENT_STYLE = `
  :root {
    --text-lg: clamp(1em, 2.5vw, 1.1875rem);
    --para-color: #515151;
    --accent-color: #7AC142;
  }

  body { padding: 10px; }

  .job-detail-responsibility h3 {
    font-size: var(--text-lg);
    font-weight: 500;
    color: var(--para-color);
  }

  .job-detail-responsibility .empty-paragraph {
    height: 15px;
    margin: 0;
    padding: 0;
  }

  .job-detail-responsibility p {
    font-size: var(--text-lg);
    font-weight: 300;
    color: var(--para-color);
  }

  .job-detail-responsibility ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
  .job-detail-responsibility ol li {
    font-size: var(--text-lg);
    font-weight: 300;
    color: var(--para-color);
    margin-bottom: 0.75rem;
  }

  .job-detail-responsibility ul {
    list-style-type: square;
    list-style-position: inside;
  }
  .job-detail-responsibility ul li {
    font-size: var(--text-lg);
    font-weight: 300;
    color: var(--para-color);
    margin-bottom: 0.75rem;
  }
  .job-detail-responsibility ul li::marker {
    color: var(--accent-color);
  }
`;

export default function TinyEditor({
  setNewsContent,
  newsContent,
  isLoading,
  useCareerStyles = false,
}: {
  newsContent?: string;
  setNewsContent: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  useCareerStyles?: boolean;
}) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const uploadImageToDropbox = useCallback(
    async (file: File | Blob, filename = "image.png") => {
      const formData = new FormData();
      formData.append("file", file, filename);
      formData.append("fileType", "image");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Image upload failed");
      }

      return data.url as string;
    },
    [],
  );

  const withUploadFeedback = useCallback(async <T,>(fn: () => Promise<T>) => {
    let notification: { close: () => void } | null = null;
    try {
      setIsUploadingImage(true);
      if (editorRef.current) {
        notification = editorRef.current.notificationManager.open({
          text: "Uploading image...",
          type: "info",
          timeout: 0,
        });
      }
      const result = await fn();
      editorRef.current?.notificationManager.open({
        text: "Image uploaded successfully",
        type: "success",
        timeout: 2000,
      });
      return result;
    } catch (error) {
      console.error("TinyMCE image upload error:", error);
      editorRef.current?.notificationManager.open({
        text: "Image upload failed",
        type: "error",
        timeout: 3000,
      });
      throw error;
    } finally {
      setIsUploadingImage(false);
      notification?.close();
    }
  }, []);

  const filePickerCallback = useCallback(
    (cb: (url: string, meta?: { title: string }) => void) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (!file) return;

        try {
          const uploadedUrl = await withUploadFeedback(() =>
            uploadImageToDropbox(file, file.name),
          );
          cb(uploadedUrl, { title: file.name });
        } catch {
          // error notification already handled in withUploadFeedback
        }
      });

      input.click();
    },
    [uploadImageToDropbox, withUploadFeedback],
  );

  const imagesUploadHandler = useCallback(
    async (blobInfo: { blob: () => Blob; filename: () => string }) => {
      return await withUploadFeedback(() =>
        uploadImageToDropbox(blobInfo.blob(), blobInfo.filename()),
      );
    },
    [uploadImageToDropbox, withUploadFeedback],
  );

  // Stable init object — only changes if useCareerStyles actually flips.
  const editorInit = useMemo(
    () => ({
      height: 500,
      menubar: false,
      theme: "silver",
      image_title: true,
      automatic_uploads: false,
      file_picker_types: "image",
      paste_data_images: true,

      content_css: useCareerStyles ? false : DEFAULT_CONTENT_CSS,
      body_class: useCareerStyles ? "job-detail-responsibility" : "",
      content_style: useCareerStyles
        ? CAREER_CONTENT_STYLE
        : DEFAULT_CONTENT_STYLE,

      plugins: [
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "help",
        "wordcount",
      ],

      toolbar:
        "undo redo | blocks | " +
        "bold italic forecolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help | code | image",

      file_picker_callback: filePickerCallback,
      images_upload_handler: imagesUploadHandler,
    }),
    [useCareerStyles, filePickerCallback, imagesUploadHandler],
  );

  if (!mounted || isLoading) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center border border-black/10 rounded-md">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={newsContent || "<p></p>"}
        onEditorChange={(content) => setNewsContent(content)}
        init={editorInit}
      />
      {isUploadingImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/20">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}