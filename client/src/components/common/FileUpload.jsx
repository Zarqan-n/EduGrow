import { useState } from 'react';

export default function FileUpload({ label, accept = 'image/*', onChange }) {
  // 1. Create a state to store the file name
  const [fileName, setFileName] = useState('');

  const handleInternalChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 2. Update the UI state with the file name
      setFileName(file.name);
      // 3. Still call the parent's onChange function
      onChange(e); 
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 transition cursor-pointer bg-white">
        <input
          type="file"
          accept={accept}
          onChange={handleInternalChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        {/* 4. Conditional Rendering: Show file name if it exists, otherwise show default text */}
        {fileName ? (
          <div className="flex flex-col items-center">
             <div className="bg-green-100 p-2 rounded-full mb-2">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <p className="text-sm font-semibold text-gray-900">File Selected:</p>
             <p className="text-sm text-blue-600 truncate max-w-xs">{fileName}</p>
             <p className="mt-2 text-xs text-gray-400">Click to change file</p>
          </div>
        ) : (
          <>
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-8-12l-8-8m8 8v12m0-12H12m16 32v-8m0 8h8m-8-8v-8m0 8h-8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          </>
        )}
      </div>
    </div>
  );
}
