import { useState } from 'react';
import axios from 'axios';
import { FileUploadSchema } from './interface/FileUploadSchema';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      setError('Please upload only one file.');
      setResponse(null);
      return;
    }

    const file = acceptedFiles[0];
    try {

      // Validate file using Zod schema
      FileUploadSchema.parse({
        name: file.name,
        type: file.type,
      });

      // If validation successful, proceed with file upload
      const formData = new FormData();
      formData.append('file', file, file.name);

      const res = await axios.post('http://localhost:3000/api/v1/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully');
      setResponse(res.data.processedText); 
      setError(null);
    } catch (err) {
      // If validation fails or an error occurs, set error state
      const errorMessage = JSON.parse((err as Error).message)[0].message; 
      setError(errorMessage);
      setResponse(null);
    }
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div>
      {response && (
        <div className="result-box">
          <p>{response}</p>
        </div>
      )}
      
      {error && <p className="error-message">{error}</p>}

      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
      </div>
    </div>
  );
};

export default FileUpload;