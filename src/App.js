//npm install react-native-web

import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Home from "./pages/HomePage";
import MyAccount from "./pages/MyAccountPage";
import PostNewItem from "./pages/PostNewItemPage";
import ResetPassword from "./pages/ResetPasswordPage";
import AuthPage from "./pages/AuthPage";
import ConversationPage from "./pages/ConversationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chats from "./components/Chats";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [authenticated, setAuthenticated] = useState(user ? true : false);
  const shouldShowHeaderFooter = !(
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/"
  );

  return (
    <div className="App">
      <ToastContainer />
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route
          path="/"
          Component={AuthPage}
          element={authenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/login"
          element={<AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/home"
          element={authenticated ? <Home /> : <Navigate to="/signup" />}
        />
        <Route
          path="/post-new-item"
          element={authenticated ? <PostNewItem /> : <Navigate to="/signup" />}
        />
        <Route
          path="/chats"
          element={authenticated ? <Chats /> : <Navigate to="/signup" />}
        />
        <Route
          path="/my-account"
          element={authenticated ? <MyAccount /> : <Navigate to="/signup" />}
        />
        <Route
          path="/conversation/:itemOwnerId"
          element={<ConversationPage />}
        />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
