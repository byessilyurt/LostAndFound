import { React, useReducer, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapsLocationPicker from "../components/MapsLocationPicker";
import FileUploader from "./FileUploader";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import { addItemToFirestore } from "../firebase/utils";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      status: "",
      title: "",
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
  const navigate = useNavigate();
  const [mapLocation, setMapLocation] = useState({
    lat: "51.107883",
    lng: "17.038538",
  });
  const autocompleteRef = useRef(null);

  const storage = getStorage();

  const handleInputChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    if (event.target.name === "location") {
      const [lat, lng] = event.target.value.split(", "); // Assuming the value is in "lat, lng" format
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
      if (uploadData.url !== null) {
        setFileData((prevState) => [...prevState, uploadData]);
        setMessage("File uploaded to database.");
      } else {
        setFileData((prevState) =>
          prevState.filter((file) => file.file !== uploadData.file)
        );
        setMessage("File removed from database.");
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    toast.info("Submitting form...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });

    await new Promise((r) => setTimeout(r, 1000));

    let newFileData = fileData.map((image) => image.url);
    const combinedData = {
      ...formData,
      images: [...newFileData],
    };

    toast.success("Form submitted successfully, redirecting home!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    console.log(combinedData);
    setFormData({
      reset: true,
    });
    setFileData([]);
    setMessage("");
    setTimeout(() => setFormData({ reset: false }), 100);
    addItemToFirestore(combinedData);
    setTimeout(() => {
      navigate("/home");
    }, 3000);
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
      <div className="w-full md:w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto overflow-y-auto h-[calc(100vh-3rem)]">
        <h2 className="text-2xl font-bold py-2 px-4 mb-3 text-gray-700">
          Post a New Item
        </h2>
        <hr className="border-gray-400 my-2 " />
        <form onSubmit={handleFormSubmit}>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="md:border-r-2 border-gray-300 md:pr-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status:
                </label>
                <div className="mt-2">
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    >
                      <option value="">Select item type...</option>
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Item Name:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter item name"
                  value={formData.title || ""}
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
              <MapsLocationPicker
                mapLocation={mapLocation}
                setMapLocation={setMapLocation}
                found={formData.status === "found"}
              />
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
            <div className="md:pl-4 mt-4 md:mt-0">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fileUploader"
                  >
                    Upload Images:
                  </label>
                  <div className="mt-2">
                    <FileUploader
                      reset={formData.reset}
                      onUpload={handleFileUpload}
                    />
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
