import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, Loader } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
  progress: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isAnalyzing, progress }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive 
            ? 'border-blue-400 bg-blue-500/10 scale-105' 
            : 'border-white/30 hover:border-white/50 hover:bg-white/5'
        } ${isAnalyzing ? 'pointer-events-none opacity-60' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isAnalyzing && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          disabled={isAnalyzing}
        />

        {uploadedFile && !isAnalyzing ? (
          <div className="flex flex-col items-center space-y-3">
            <CheckCircle className="w-12 h-12 text-green-400" />
            <div>
              <p className="text-white font-medium">{uploadedFile.name}</p>
              <p className="text-white/60 text-sm">{formatFileSize(uploadedFile.size)}</p>
            </div>
            <div className="text-green-400 text-sm font-medium">✅ File uploaded successfully!</div>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader className="w-12 h-12 text-blue-400 animate-spin" />
            <div className="w-full max-w-xs">
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-white/80 text-sm mt-2">Analyzing... {progress}%</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-lg mb-2">Drop your resume here</p>
              <p className="text-white/70 text-sm">or click to browse files</p>
            </div>
            <div className="flex items-center space-x-4 text-white/60 text-xs">
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </span>
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                DOCX
              </span>
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                TXT
              </span>
            </div>
          </div>
        )}
      </div>

      {uploadedFile && (
        <div className="text-center">
          <button
            onClick={() => {
              setUploadedFile(null);
              const input = document.getElementById('file-input') as HTMLInputElement;
              if (input) input.value = '';
            }}
            className="text-white/60 hover:text-white text-sm underline transition-colors"
            disabled={isAnalyzing}
          >
            Upload a different file
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;