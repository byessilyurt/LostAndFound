import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import profileImage from "../images/profile.jpg";

function Header() {
  return (
    <nav className="bg-white h-[80px] w-full flex items-center justify-between md:px-[165px] px-[50px]">
      <Link to="/home">
        {" "}
        <img src={logo} alt="Logo" />{" "}
      </Link>
      <ul className="flex md:gap-9 sm:gap-5 gap-4 items-center text-base font-semibold">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/post-new-item">Post New Item</Link>
        </li>
        <li>
          <div className="bg-lightGray w-px h-[32px]"></div>
        </li>
        <li>
          <Link to="/my-account">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-[48px] h-[48px] rounded-[12px]"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
