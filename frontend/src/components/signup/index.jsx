import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";

import { useDispatch } from "react-redux";
import { login } from "../../helpers/features/userSlice";
import DisplayMessage from "../../components/displayMessage";
const Signup = () => {
  const [errorEmail, setErrorEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/[a-zA-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one letter";
    }

    if (!values.firstname || values.firstname.length < 3) {
      errors.firstname = "First name must be at least 3 characters long";
    }

    if (!values.lastname || values.lastname.length < 3) {
      errors.lastname = "Last name must be at least 3 characters long";
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const loginResponse = await fetch(
          "http://localhost:3000/api/auth/login",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          localStorage.setItem("token", loginResult.token);

          const id = loginResult.userId;
          const userInfoResponse = await fetch(
            `http://localhost:3000/api/auth/${id}`
          );
          const userInfo = await userInfoResponse.json();

          if (userInfoResponse.ok) {
            dispatch(login({ user: userInfo }));
          }
          navigate("/");
        } else if (response.status === 400) {
          setErrorEmail(true);
          function deleteError() {
            setErrorEmail(false);
          }
          setTimeout(deleteError, 4000);
        }
      } else if (response.status === 400) {
        DisplayMessage(
          `This email ${values.email} is already in use.
          Please use a different email address or proceed to login`,
          "linear-gradient(to right, #ee8f8f, #ad0606)"
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log("jesuuuuuuuuuuuuuuuis dans 400 catch");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", firstname: "", lastname: "" }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      <Form className="form">
        <div className="input-names">
          <div className="input-name">
            <Field type="text" name="firstname" placeholder="First name" />
            <ErrorMessage
              name="firstname"
              component="div"
              className="error_login"
            />
          </div>
          <div className="input-name">
            <Field type="text" name="lastname" placeholder="Last name" />
            <ErrorMessage
              name="lastname"
              component="div"
              className="error_login"
            />
          </div>
        </div>
        <div className="input-wrapper">
          <Field
            type="email"
            name="email"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
          <ErrorMessage name="email" component="div" className="error_login" />
        </div>
        <div className="input-wrapper">
          <Field
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <ErrorMessage
            name="password"
            component="div"
            className="error_login"
          />
        </div>
        {errorEmail ? (
          <p className="error_login">This address is already used</p>
        ) : (
          ""
        )}
        <button type="submit" className="sign-in-button">
          Create your account
        </button>
      </Form>
    </Formik>
  );
};

export default Signup;
