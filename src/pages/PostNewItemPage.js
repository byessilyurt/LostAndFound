import { React, useReducer, useState, useRef, useEffect } from "react";
import MapsLocationPicker from "../components/MapsLocationPicker";
import FileUploader from "./FileUploader";
import { getStorage } from "firebase/storage";
// reset={formData.reset}

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      itemType: "",
      lostItem: "",
      dateLost: "",
      location: "",
      description: "",
      tags: [],
      images: [],
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

function PostNewItemPage() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [fileData, setFileData] = useState([]);
  const [message, setMessage] = useState("");
  const [mapLocation, setMapLocation] = useState({lat: 'Wroclaw', lng: 'Poland'}); //this needs to be worked on
  const autocompleteRef = useRef(null);

  const storage = getStorage();

  const handleInputChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    if (event.target.name === "location") {
      const [lat, lng] = event.target.value.split(', '); // Assuming the value is in "lat, lng" format
      setMapLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  };

  const handleTagsChange = (event) => {
    setFormData({
      name: "tags",
      value: Array.from(event.target.selectedOptions, (option) => option.value),
    });
  };

  const handleFileUpload = (uploadData) => {
    if (formData.reset) {
      setFileData([]);
      setFormData({ reset: false });
      setMessage(""); // Reset message
    } else {
      setFileData((prevState) => [...prevState, uploadData]);
      if (uploadData.url === null) {
        setMessage("File removed from database.");
      } else {
        setMessage("File uploaded to database.");
      }
    }
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(fileData);
    const combinedData = {
      ...formData,
      images: fileData.map((data) => data.url),
    };

    alert("You have submitted the form");
    console.log(combinedData);
    setFormData({
      reset: true,
    });
    setFileData([]); // Reset selected files
    setMessage("");
    setTimeout(() => setFormData({ reset: false }), 100);
    window.location.href = './home';
  };

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["geocode"],
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
    setFormData({
      name: "location",
      value: `${mapLocation.lat}, ${mapLocation.lng}`,
    });
  }, [mapLocation]);

  return (
    <div className="flex justify-center items-center bg-foundColor bg-opacity-20 h-screen">
      <div className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto overflow-y-auto h-[calc(100vh-3rem)]">
        <h2 className="text-2xl font-bold py-2 px-4 mb-3 text-gray-700">
          Post a New Item
        </h2>
        <hr className="border-gray-400 my-2 " />
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r-2 border-gray-300 pr-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemType"
                >
                  Item Type:
                </label>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="lost"
                    name="itemType"
                    value="lost"
                    checked={formData.itemType === "lost"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="lost">Lost</label>
                  <input
                    type="radio"
                    id="found"
                    name="itemType"
                    value="found"
                    checked={formData.itemType === "found"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="found">Found</label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lostItem"
                >
                  Item Name:
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
                  Date:
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
              <MapsLocationPicker setLocation={setMapLocation} />
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tags"
                >
                  Tags:
                </label>
                <select
                  multiple={true}
                  id="tags"
                  name="tags"
                  onChange={handleTagsChange}
                  value={formData.tags || []}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select...</option>
                  <option value="phone">Phone</option>
                  <option value="airpods">AirPods</option>
                  <option value="wallet">Wallet</option>
                  <option value="watch">Watch</option>
                  <option value="laptop">Laptop</option>
                  <option value="bag">Bag</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>
            </div>
            <div className="pl-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fileUploader"
                  >
                    Upload Images:
                  </label>
                  <div className="mt-2">
                    <FileUploader onUpload={handleFileUpload} reset={formData.reset}/>
                  </div>
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
