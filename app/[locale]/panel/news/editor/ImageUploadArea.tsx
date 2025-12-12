import React, {JSX} from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadAreaProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ images, onImagesChange }: ImageUploadAreaProps): JSX.Element => {

  const onDrop:(acceptedFiles: File[]) => void = (acceptedFiles: File[]): void => {
    const newImages: string[] = acceptedFiles.map((file: File): string => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <div className={"image-upload-area"}>
      <div {...getRootProps()} className={"image-upload-dropzone"}>
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
      </div>
      <div className={"image-upload-list"}>
        {images.map((img: string, idx: number): JSX.Element => (
          <Image key={idx} src={img} alt={`uploaded-${idx}`} width={220} height={150} className={"image-upload-preview"} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadArea;
