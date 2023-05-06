import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import ItemDetail from "./pages/ItemDetailPage";
import LandingPage from "./pages/LandingPage";
import MyAccount from "./pages/MyAccountPage";
import PostNewItem from "./pages/PostNewItemPage";
import ResetPassword from "./pages/ResetPasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
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
