import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  // You can use a state or context to check if the user is authenticated
  // For this example, let's assume we have a state called `isAuthenticated`
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <nav>
      <button
        onClick={() => {
          setIsAuthenticated(!isAuthenticated);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        authenticate
      </button>
      <ul className="flex gap-3">
        <li className="text-xl font-medium">
          <Link to="/">Landing Page</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/post-new-item">Post New Item</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
