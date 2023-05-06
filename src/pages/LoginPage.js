import AuthForm from "../components/AuthForm";
import AuthHero from "../components/AuthHero";

function LoginPage() {
  return (
    <div>
      <AuthForm isLogin={true} />
      <AuthHero />
    </div>
  );
}

export default LoginPage;
