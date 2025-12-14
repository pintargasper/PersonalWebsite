import React, {JSX} from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadAreaProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    singleImage?: boolean;
    small?: boolean;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ images, onImagesChange, singleImage = false }: ImageUploadAreaProps): JSX.Element => {

    const onDrop: (acceptedFiles: File[]) => void = (acceptedFiles: File[]): void => {
        const newImages: string[] = acceptedFiles.map((file: File): string => URL.createObjectURL(file));
        onImagesChange(singleImage ? newImages.slice(0, 1) : [...images, ...newImages]);
    };

    const handleRemoveImage: (idx: number) => void = (idx: number): void => {
        const newImages: string[] = images.filter((_: string, i: number): boolean => i !== idx);
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
                {images.map((img: string, idx: number): JSX.Element => (
                    <div key={idx} className="image-upload-image-wrapper">
                        <Image src={img} alt={`uploaded-${idx}`} width={220} height={150} className={"image-upload-preview"} />
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
                ))}
            </div>
        </div>
    );
};

export default ImageUploadArea;
