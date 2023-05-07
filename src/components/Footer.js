import { Link } from "react-router-dom";
import logo from "../images/logo-white.svg";

function Footer() {
  return (
    <footer className="bg-foundColor h-[160px] w-full flex justify-between md:pl-[165px] md:pr-[214px] px-[56px] py-4">
      <img src={logo} alt="Logo" className="self-center" />

      <div className="flex gap-8 text-white self-center">
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/post-new-item">Post New Item</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
