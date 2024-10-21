'use client';

import * as React from 'react';

import toast from "react-hot-toast";
import { useEdgeStore } from '@/lib/edgestore';


interface FileUploadComponentProps {
  onUploadComplete: (url: string) => void;  // Callback when upload is complete
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onUploadComplete }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<number>(0);

  const handleUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
            console.log(progress); // Log progress
            
          },
        });

        console.log("Upload Response:", res); // Log the entire response

        if (res.url) {
          setUrls(res.url); // Set the URL state
          onUploadComplete(res.url); // Call the upload complete callback
          console.log(urls)
        } else {
          toast.error("Tekrar Deneyiniz");
          setProgress(0);
        }
      } catch (error) {
        console.error("Upload Error:", error); // Log the error
        toast.error("Upload failed: " + error);
      }
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="*/*" // Allow any file type
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {progress > 0 && (
        <div style={{ width: '100%', background: '#e0e0e0', borderRadius: '4px', marginTop: '10px' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '10px',
              background: '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.2s ease-in-out'
            }} 
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || progress > 0}
        className={`mt-4 px-4 py-2 rounded-md text-white 
          ${(!file || progress > 0) 
            ? 'bg-blue-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
      >
        {progress === 0 ? "Upload" : `Uploading... ${progress}%`}
      </button>
    </div>
  );
};

export default FileUploadComponent;
