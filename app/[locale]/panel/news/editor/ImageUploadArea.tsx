import React from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadAreaProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ images, onImagesChange }) => {
  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <div style={{ width: '220px', padding: '16px', borderRight: '1px solid #eee', height: '100%', overflowY: 'auto' }}>
      <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '12px', textAlign: 'center', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select</p>
      </div>
      <div style={{ marginTop: '16px' }}>
        {images.map((img, idx) => (
          <Image key={idx} src={img} alt={`uploaded-${idx}`} width={220} height={150} style={{ width: '100%', marginBottom: '8px', borderRadius: '4px', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadArea;
