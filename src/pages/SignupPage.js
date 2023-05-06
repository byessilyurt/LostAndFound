import React from "react";
import AuthForm from "../components/AuthForm";
import AuthHero from "../components/AuthHero";

function SignupPage() {
  return (
    <div>
      <AuthForm isLogin={false} />
      <AuthHero />
    </div>
  );
}

export default SignupPage;
