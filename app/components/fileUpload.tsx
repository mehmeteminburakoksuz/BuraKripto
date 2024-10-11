'use client';

import * as React from 'react';
import { useEdgeStore } from '../lib/edgestore';
import toast from "react-hot-toast";
import { Button } from './ui/button';

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
        const res = await edgestore.myPubliImages.upload({
          file,
          input: { type: "post" }, // Include the required input property
          onProgressChange: (progress) => {
            setProgress(progress);
            console.log(progress); // Log progress
          },
        });

        console.log("Upload Response:", res); // Log the entire response

        if (res.url) {
          setUrls(res.url); // Set the URL state
          onUploadComplete(res.url); // Call the upload complete callback
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
      <Button variant={"default"} onClick={handleUpload} disabled={!file || progress > 0}>
        {progress === 0 ? "Upload" : `Uploading... ${progress}%`}
      </Button>
    </div>
  );
};

export default FileUploadComponent;
