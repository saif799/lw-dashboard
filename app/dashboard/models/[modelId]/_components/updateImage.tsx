"use client";

import { UploadButton } from "@/utils/uploadthing";
import { Edit2, Loader2Icon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export default function UpdateImage({
  imageType,
  modelId,
  oldImage,
  className,
  onUploadBegin,
  onUploadEnd,
}: {
  modelId: string;
  imageType: "desktop" | "mobile";
  oldImage?: string;
  className?: string;
  onUploadBegin: () => void;
  onUploadEnd: () => void;
}) {
  return (
    <UploadButton
      input={{ imageType, modelId, oldImage }}
      endpoint="imagesEditor"
      appearance={{
        allowedContent: "hidden",
        button: " p-0",
        container: ` ${className} p-0`,
      }}
      content={{
        button({ isUploading }) {
          if (isUploading)
            return <Loader2Icon className="text-black size-5 animate-spin" />;
          return <Edit2 className="size-5 text-black" />;
        },
      }}
      onUploadBegin={onUploadBegin}
      onClientUploadComplete={() => {
        toast.success("image uploaded successfully");
        onUploadEnd();
      }}
      onUploadError={() => {
        toast.error("image uploaded successfully");
        onUploadEnd();
      }}
    />
  );
}

export function Test({
  modelId,
  modelImage,
}: {
  modelId: string;
  modelImage?: string;
}) {
  const [isEditing, setIsEdeting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isEditing}
        className="absolute top-2 right-2 border bg-white rounded-md px-2  shadow-sm hover:bg-gray-100 aspect-square"
      >
        {!isEditing ? (
          <Ellipsis />
        ) : (
          <Loader2Icon className="text-black size-5 animate-spin" />
        )}{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center p-0">
          <UpdateImage
            imageType="desktop"
            modelId={modelId}
            oldImage={modelImage}
            onUploadBegin={() => {
              setIsEdeting(true);
            }}
            onUploadEnd={() => setIsEdeting(false)}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-center py-3 "
          onClick={() => toast.success("working")}
        >
          <button>
            <Trash2 className=" size-5 text-red-500" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
