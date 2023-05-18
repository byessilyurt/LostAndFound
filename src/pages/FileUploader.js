import { React, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

function FileUploader({ onUpload }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    onUpload(Array.from(files));
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("selectedFile", selectedFiles[i]);
    }
    onUpload(formData, selectedFiles);
    setSelectedFiles([]);
  };

  const removeSelectedImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const imagePreviews = selectedFiles.map((file, index) => (
    <div key={file.name}>
      <img src={URL.createObjectURL(file)} alt={file.name} />
      <button onClick={() => removeSelectedImage(index)}>Remove This Image</button>
    </div>
  ));

  return (
    <div class="w-full bg-gray-200 rounded-lg p-4">
      <div class="border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white">
        <div class="text-center">
          <AiOutlineCloudUpload class="h-12 w-12 mx-auto mb-3" />
          <p class="text-lg font-medium">Drop your image(s) here or browse</p>
          <p class="text-xs">(max file size 5mb)</p>
          <input type="file" onChange={handleFileChange} class="hidden" multiple />
          <button
            onClick={handleUpload}
            class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          {imagePreviews}
        </div>
      )}
    </div>
  );
}

export default FileUploader;