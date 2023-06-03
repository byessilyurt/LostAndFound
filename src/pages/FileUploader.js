import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  ref,
} from "../firebase";

function FileUploader({ onUpload, reset }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFiles]);

    for (let file of newFiles) {
      const imageRef = ref(storageRef, `${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          onUpload({ file, url: downloadURL });
        });
      });
    }
  };

  const removeSelectedImage = async (index) => {
    const fileToRemove = selectedFiles[index];
    const imageRef = ref(storageRef, `${fileToRemove.name}`);
    await deleteObject(imageRef);

    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onUpload({ file: fileToRemove, url: null });
  };

  useEffect(() => {
    if (reset) {
      setSelectedFiles([]);
      onUpload({ file: null, url: null });
    }
  }, [reset, onUpload]);

  const imagePreviews = selectedFiles.map((file, index) => (
    <div
      key={file.name}
      className="inline-block m-2 border border-gray-300 p-1 rounded overflow-hidden"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="h-24 w-auto object-cover"
      />
      <button
        type="button"
        onClick={() => removeSelectedImage(index)}
        className="block bg-red-500 hover:bg-red-700 text-white text-xs font-bold mt-1 px-2 py-1 rounded"
      >
        Remove This Image
      </button>
    </div>
  ));

  return (
    <div className="w-full bg-gray-200 rounded-lg p-4">
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white">
        <div className="text-center">
          <AiOutlineCloudUpload className="h-12 w-12 mx-auto mb-3" />
          <p className="text-lg font-medium">
            Drop your image(s) here or browse
          </p>
          <p className="text-xs">(max file size 5mb)</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Select Files
          </button>
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          <div className="flex flex-wrap">{imagePreviews}</div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
