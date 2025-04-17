import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { convertFileToUrl } from '@/shared/utils/utils.ts'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

export function FileUploader({ files, onChange }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    }, [onChange]);
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <div 
        {...getRootProps()} 
        className="grid w-full items-center gap-1.5 border-2 border-dashed border-green-500 p-4 poin"
      >
        <input {...getInputProps()} />
        {files && files.length > 0 ? (
          <img
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[400px] overflow-hidden object-cover mx-auto"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <img 
              src="/upload-solid.svg"
              width={40}
              height={40}
              alt="upload"
            />
            <div className="file-upload_label">
              <p className="text-[14px]">
                <span className="text-green-500">Click to Upload</span> or drag and drop
              </p>
              <p>SVG, PNG, JPG, or GIF (max 800x400)</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default FileUploader;