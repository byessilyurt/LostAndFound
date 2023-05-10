import {React, useState} from "react";
import ItemDetailPage from "./ItemDetailPage";

function HomePage() {
  // Example of randomly generated item data
  const item = {
    name: "iPhone",
    type: "lost",
    date: "2022-04-25",
    location: "Wrocław, Poland",
    description: "Black iPhone with a cracked screen",
    image: "https://via.placeholder.com/150",
    contact: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "555-555-5555",
    },
    
  };
  const [showItem, setShowItem] = useState(false);

  const handleClick = () => {
    setShowItem(true);
  }


  return (
    <div>
      <button onClick={handleClick}>Show Item</button>
      {showItem && <ItemDetailPage item={item}/>}
    </div>
  );
}


export default HomePage;
