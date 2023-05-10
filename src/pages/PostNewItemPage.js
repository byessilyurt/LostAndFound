import { React, useReducer, useState, useRef, useEffect } from "react";
import FileUploader from "./FileUploader";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      lostItem: "",
      dateLost: Date,
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
  const [selectedFiles, setSelectedFiles] = useState([null]);
  const [formData, setFormData] = useReducer(formReducer, {});
  const autocompleteRef = useRef(null);

  const handleInputChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleFileUpload = (files) => {
    // Handle the uploaded files here
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert("you have sumbitted form");
    console.log(formData);
    console.log(selectedFiles);
    setFormData({
      reset: true,
    });
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
    <div class="flex justify-center items-center bg-violet-500">
      <div class="w-3/4 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <h2 class="bg-beige-500 text-xl font-bold py-2 px-4 mb-2 rounded-t">
          Post a New Item
        </h2>
        <hr class="border-gray-400 my-2 " />
        <form method="post" onSubmit={handleFormSubmit}>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1 border-r-2 border-gray-300">
              <div class="md:flex md:items-center mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="lostItem"
                  >
                    Lost Item:
                  </label>
                  <input
                    type="text"
                    name="lostItem"
                    id="lostItem"
                    value={formData.lostItem || ""}
                    onChange={handleInputChange}
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="dateLost"
                  >
                    Date Lost:
                  </label>
                  <input
                    type="date"
                    name="dateLost"
                    id="dateLost"
                    value={formData.dateLost || ""}
                    onChange={handleInputChange}
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="location"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Enter location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                    ref={autocompleteRef}
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="description"
                  >
                    Description:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> 
              <div class="col-span-1 flex flex-wrap items-center justify-center">
                <label class="ml-auto">
                  <FileUploader onUpload={handleFileUpload} />
                </label>
              </div>
            </div>
            <br></br>
            <div class="flex justify-end mt-4">
              <button
                type="reset"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Reset
              </button>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostNewItemPage;
