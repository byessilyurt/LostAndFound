import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "../firebase";
import { useState } from "react";

function AuthForm({ isLogin, setAuthenticated }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged in successfully");

        // Signed in
        const user = userCredential.user;
        if (user != null) {
          setAuthenticated(true);
          navigate("/home");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        // ..
      });
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user != null) {
          setAuthenticated(true);
          navigate("/home");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user != null) {
          setAuthenticated(true);
          navigate("/home");
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    console.log(provider);
  };

  const githubAuth = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        if (user != null) {
          setAuthenticated(true);
          navigate("/home");
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const fields = {
    // put login fields if isLogin is true
    title: isLogin ? "Login" : "Sign Up",
    subTitle: isLogin
      ? "Login to your account to continue with Lost&Found."
      : "Create an account to get started with Lost&Found.",
    inputFields: [
      {
        label: isLogin ? "Email" : "Full Name",
        type: isLogin ? "email" : "text",
        placeholder: isLogin ? "name@example.com" : "Enter your full name",
        name: isLogin ? "email" : "fullName",
        error: isLogin ? "Invalid email" : "Invalid full name",
        onChange: (e) => {
          setEmail(e.target.value);
          // if (isLogin) {
          //   // do something
          // } else {
          // setEmail(e.target.value);
          // // do something
          // }
        },
      },
      {
        label: isLogin ? "Password" : "Email",
        type: isLogin ? "password" : "email",
        placeholder: isLogin ? "min. 8 characters" : "Enter your email",
        name: isLogin ? "password" : "email",
        error: isLogin ? "Invalid password" : "Invalid email",
        onChange: (e) => {
          setPassword(e.target.value);
          // if (isLogin) {
          //   // do something
          // } else {
          // setPassword(e.target.value);
          // // do something
          // }
        },
      },
      {
        render: !isLogin, // if isLogin is false, render this field
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password",
        error: "Invalid password",
        onChange: () => {},
      },
      {
        render: !isLogin, // if isLogin is false, render this field
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        name: "confirmPassword",
        error: "Invalid password",
        onChange: () => {},
      },
    ],
    checkBox: {
      render: isLogin,
      label: "Remember me",
      name: "rememberMe",
      onChange: () => {},
    },
    button: {
      label: isLogin ? "Login" : "Sign Up",
      onClick: () => {
        // if(isLogin)
        signup();
        // else
        login();
      },
    },
    forgotPassword: {
      render: isLogin,
      label: "Forgot Password?",
      onClick: () => {},
    },
    authWith: {
      label: isLogin ? "Login with" : "Sign Up with",
      onClick: () => {},
    },
    footer: {
      label: isLogin ? "Don't have an account?" : "Already have an account?",
      buttonLabel: isLogin ? "Sign Up" : "Login",
      onClick: () => {},
    },
  };
  return (
    <div className="md:mx-[165px] mx-20 md:mt-20 mt-8">
      <img src={logo} alt="Logo" className="md:mb-[190px] mb-20" />
      <h1 className="text-6xl font-bold">{fields.title}</h1>
      <h2 className="text-sm font-light mt-4">{fields.subTitle}</h2>
      <div className="mt-8">
        {fields.inputFields.map((field) => {
          if (field.render === false) {
            return null;
          }
          return (
            <div className="mb-4">
              <label className="text-sm font-light block mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                onChange={field.onChange}
                className="w-[350px] h-[44px] px-3 py-3 border border-lightGray rounded-[8px] text-sm placeholder-lightGray"
              />
            </div>
          );
        })}
        <div className="w-[350px] h-[44px] flex items-center justify-between mt-4">
          {fields.checkBox.render && (
            <div className="flex items-center">
              <input
                type="checkbox"
                name={fields.checkBox.name}
                onChange={fields.checkBox.onChange}
                className="mr-2"
              />
              <label className="text-sm">{fields.checkBox.label}</label>
            </div>
          )}
          <button
            onClick={fields.button.onClick}
            className={`bg-foundColor ${
              isLogin ? "w-[190px]" : "w-[350px]"
            } h-[44px] rounded-[8px] text-white font-bold text-sm`}
          >
            {fields.button.label}
          </button>
        </div>
        {fields.forgotPassword.render && (
          <button
            onClick={fields.forgotPassword.onClick}
            className="w-[350px] h-[44px] mt-4 text-foundColor font-bold text-sm"
          >
            {fields.forgotPassword.label}
          </button>
        )}
        <div className="flex items-center justify-center gap-2 mt-4 w-[350px] h-[44px] text-sm font-normal">
          {fields.authWith.label}
          <button
            onClick={fields.authWith.onClick}
            className="flex gap-2 text-2xl ml-2 text-black"
          >
            <AiFillGoogleCircle
              onClick={() => {
                googleAuth();
              }}
            />
            <AiFillGithub
              onClick={() => {
                githubAuth();
              }}
            />
          </button>
        </div>
        <div className="flex justify-center items-center md:mt-[112px] mt-20 w-[350px] h-[44px]">
          <p className="text-sm font-normal inline mr-2">
            {fields.footer.label}
          </p>
          <Link
            onClick={fields.footer.onClick}
            className="text-sm font-semibold text-foundColor"
            to={isLogin ? "/signup" : "/login"}
          >
            {fields.footer.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
