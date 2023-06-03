//npm install react-native-web

import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { firebaseApp, analytics } from "./firebase";
import Home from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import MyAccount from "./pages/MyAccountPage";
import PostNewItem from "./pages/PostNewItemPage";
import ResetPassword from "./pages/ResetPasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";

function App() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const shouldShowHeaderFooter = !(
    location.pathname === "/login" || location.pathname === "/signup"
  );

  return (
    <div className="App">
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route
          path="/"
          Component={Home} // Update this line when landing page is ready
          element={authenticated ? <div /> : <div />}
        />
        <Route
          path="/login"
          element={<AuthPage setAuthenticated={setAuthenticated} />}
        />
        <Route path="/signup" element={<AuthPage />} />
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
          path="/my-account"
          element={authenticated ? <MyAccount /> : <Navigate to="/signup" />}
        />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
