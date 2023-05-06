import AuthForm from "../components/AuthForm";
import AuthHero from "../components/AuthHero";

import { useLocation } from "react-router-dom";

function AuthPage() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login" ? true : false;

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="w-full md:w-640px">
        <AuthForm isLogin={isLogin} />
      </div>
      <div className="hidden md:block md:w-800px">
        <AuthHero />
      </div>
    </div>
  );
}

export default AuthPage;
