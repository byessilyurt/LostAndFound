import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { defaultImage } from "../firebase/utils";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { photoURL } = user || {};
  const profileImage = photoURL || defaultImage;

  return (
    <nav className="bg-white h-[80px] w-full flex items-center justify-between md:px-[165px] sm:px-[50px] px-[30px]">
      <Link to="/home">
        {" "}
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 sm:h-20 sm:w-20 "
        />{" "}
      </Link>
      <ul className="flex md:gap-9 sm:gap-5 gap-4 items-center sm:text-base text-xs font-semibold mx-0">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/chats">Chats</Link>
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
              className="w-10 h-10 sm:w-[48px] sm:h-[48px] rounded-[12px]"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
