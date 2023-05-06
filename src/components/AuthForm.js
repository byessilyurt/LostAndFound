function AuthForm({ isLogin }) {
  // isLogin will be props
  const fields = {
    // put login fields if isLogin is true
    title: isLogin ? "Login" : "Sign Up",
    subTitle: isLogin ? "Login to your account" : "Create an account",
    inputFields: [
      {
        label: isLogin ? "Email" : "Full Name",
        type: isLogin ? "email" : "text",
        placeholder: isLogin ? "Enter your email" : "Enter your full name",
        name: isLogin ? "email" : "fullName",
        error: isLogin ? "Invalid email" : "Invalid full name",
        onChange: () => {
          if (isLogin) {
            // do something
          } else {
            // do something
          }
        },
      },
      {
        label: isLogin ? "Password" : "Email",
        type: isLogin ? "password" : "email",
        placeholder: isLogin ? "Enter your password" : "Enter your email",
        name: isLogin ? "password" : "email",
        error: isLogin ? "Invalid password" : "Invalid email",
        onChange: () => {},
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
      onClick: () => {},
    },
    forgotPassword: {
      render: isLogin,
      label: "Forgot Password?",
      onClick: () => {},
    },
    authWith: {
      label: isLogin ? "Sign Up" : "Login",
      onClick: () => {},
    },
    footer: {
      label: isLogin ? "Don't have an account?" : "Already have an account?",
      buttonLabel: isLogin ? "Sign Up" : "Login",
      onClick: () => {},
    },
  };

  return (
    <div>
      <h1>{fields.title}</h1>
      <h2>{fields.subTitle}</h2>
      {fields.inputFields.map((field) => {
        if (field.render === false) {
          return null;
        }
        return (
          <div>
            <label>{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              onChange={field.onChange}
            />
            <p>{field.error}</p>
          </div>
        );
      })}
      <div>
        <label>{fields.checkBox.label}</label>
        <input
          type="checkbox"
          name={fields.checkBox.name}
          onChange={fields.checkBox.onChange}
        />
      </div>
      <button onClick={fields.button.onClick}>{fields.button.label}</button>
      <button onClick={fields.forgotPassword.onClick}>
        {fields.forgotPassword.label}
      </button>
      <button onClick={fields.authWith.onClick}>{fields.authWith.label}</button>
      <div>
        <p>{fields.footer.label}</p>
        <button onClick={fields.footer.onClick}>
          {fields.footer.buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
