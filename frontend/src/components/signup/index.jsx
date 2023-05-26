import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./style.css";

import { useDispatch } from "react-redux";
import { login } from "../../helpers/features/userSlice";

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
    let item = {
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
    };
    let loginItem = {
      email: values.email,
      password: values.password,
    };

    let response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(response);
    let result = await response.json();
    console.log(result);
    if (response.status === 201) {
      //le login direct apres le signup
      let response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginItem),
      });

      let result = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", result.token);

        const id = result.userId;
        let getinfos = await fetch(`http://localhost:3000/api/auth/${id}`);

        let resultGetInfos = await getinfos.json();

        if (response.status === 200) {
          dispatch(
            login({
              user: resultGetInfos,
            })
          );
        }
        navigate("/");
      } else if (response.status === 400) {
        setErrorEmail(true);
        function deleteError() {
          setErrorEmail(false);
        }
        setTimeout(deleteError, 4000);
      }
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
