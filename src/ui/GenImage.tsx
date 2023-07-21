'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function GenerateBase64Image() {
  const [file, setFile] = useState<File | null>(null);
  const [base64url, setBase64Url] = useState<string | null>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>('');

  const convertFileToBase64 = (file: File) => {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result as string;
        resolve(base64Data);
      };

      reader.onerror = () => {
        reject(new Error('Failed to convert file to base64'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      convertFileToBase64(selectedFile)
        .then((base64Data) => {
          setFile(selectedFile);
          setBase64Url(base64Data);
          setPreviewUrl(URL.createObjectURL(selectedFile));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log('baseURL', base64url);

  return (
    <div>
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          {previewUrl && (
            <Image
              className="object-cover rounded-lg shadow-md"
              src={previewUrl}
              alt="Preview"
              width={300}
              height={300}
            />
          )}
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            name="file"
            onChange={handleFileInputChange}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-sky-700
            hover:file:bg-violet-100"
          />
        </label>
      </form>
    </div>
  );
}
