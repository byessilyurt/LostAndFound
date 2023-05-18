import { React, useReducer, useState, useRef, useEffect } from "react";
import FileUploader from "./FileUploader";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      lostItem: "",
      dateLost: "",
      location: "",
      description: "",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

function PostNewItemPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useReducer(formReducer, {});
  const autocompleteRef = useRef(null);

  const handleInputChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleFileUpload = (files) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("You have submitted the form");
    console.log(formData);
    console.log(selectedFiles);
    setFormData({
      reset: true,
    });
    setSelectedFiles([]); // Reset selected files
  };

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["geocode"],
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(51.0543, 17.001),
          new window.google.maps.LatLng(51.1485, 16.917)
        ),
        componentRestrictions: { country: "pl" },
      }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setFormData({
        name: "location",
        value: place.formatted_address,
      });
    });
  }, []);

  return (
    <div className="flex justify-center items-center bg-violet-500 h-screen">
      <div class="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <h2 className="text-2xl font-bold py-2 px-4 mb-3 text-gray-700">
          Post a New Item
        </h2>
        <hr className="border-gray-400 my-2 " />
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r-2 border-gray-300">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lostItem"
                >
                  Lost Item:
                </label>
                <input
                  type="text"
                  id="lostItem"
                  name="lostItem"
                  placeholder="Enter item name"
                  value={formData.lostItem || ""}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dateLost"
                >
                  Date Lost:
                </label>
                <input
                  type="date"
                  id="dateLost"
                  name="dateLost"
                  value={formData.dateLost || ""}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  ref={autocompleteRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fileUploader"
                >
                  Upload Images:
                </label>
                <div className="mt-2">
                  <FileUploader onUpload={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="reset"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostNewItemPage;