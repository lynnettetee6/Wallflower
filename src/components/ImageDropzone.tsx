
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onImageUpload: (base64: string) => void;
  imagePreview: string | null;
  setImagePreview: (value: string | null) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload, imagePreview, setImagePreview }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === 'string') {
          onImageUpload(event.target.result);
          setImagePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload, setImagePreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.jpg'] },
    maxSize: 5 * 1024 * 1024, // 5MB
  });
  
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    onImageUpload('');
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed border-amber-800/50 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-amber-700 hover:bg-amber-100/50',
        isDragActive && 'border-amber-700 bg-amber-100/50'
      )}
    >
      <input {...getInputProps()} />
      {imagePreview ? (
        <div className="relative group inline-block">
          <img src={imagePreview} alt="Preview" className="w-24 h-24 mx-auto rounded-full object-cover" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-amber-900">
          <UploadCloud className="w-10 h-10" />
          <p className="font-semibold">Drag & drop an image here</p>
          <p className="text-sm text-amber-800/80">or click to select</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
