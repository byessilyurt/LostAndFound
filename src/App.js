import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import ItemDetail from "./pages/ItemDetailPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyAccount from "./pages/MyAccountPage";
import PostNewItem from "./pages/PostNewItemPage";
import ResetPassword from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignupPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/post-new-item" element={<PostNewItem />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
