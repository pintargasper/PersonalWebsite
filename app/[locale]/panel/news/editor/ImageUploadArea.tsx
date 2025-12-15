import React, {JSX} from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {fetchImage} from "@/api/filesApi";

interface ImageUploadAreaProps {
    images: (File | string)[];
    onImagesChange: (images: (File | string)[]) => void;
    singleImage?: boolean;
    small?: boolean;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ images, onImagesChange, singleImage = false }: ImageUploadAreaProps): JSX.Element => {
    const onDrop: (acceptedFiles: File[]) => void = (acceptedFiles: File[]): void => {
        onImagesChange(singleImage ? acceptedFiles.slice(0, 1) : [...images, ...acceptedFiles]);
    };

    const handleRemoveImage: (idx: number) => void = (idx: number): void => {
        const newImages: (File | string)[] = images.filter((_: File | string, i: number): boolean => i !== idx);
        onImagesChange(newImages);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] }, multiple: !singleImage });

    return (
        <div className={"image-upload-area"}>
            <div {...getRootProps()} className={"image-upload-dropzone"}>
                <input {...getInputProps()} />
                <p>{singleImage ? "Drag & drop an image here, or click to select" : "Drag & drop images here, or click to select"}</p>
            </div>
            <div className={"image-upload-list"}>
                {images.map((img: File | string, idx: number): JSX.Element => {
                    const width = 220;
                    const height = 150;
                    const src: string = typeof img === "string" ? fetchImage(img) : URL.createObjectURL(img);
                    return (
                        <div key={idx} className={"image-upload-image-wrapper"}>
                            <Image
                                src={src}
                                alt={`uploaded-${idx}`}
                                width={width}
                                height={height}
                                unoptimized={true}
                                loading={"eager"}
                                className={"image-upload-preview"}
                            />
                            <button
                                type={"button"}
                                onClick={(): void => handleRemoveImage(idx)}
                                className={"image-upload-remove-btn"}
                                aria-label={"Remove image"}
                                title={"Remove image"}
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageUploadArea;
