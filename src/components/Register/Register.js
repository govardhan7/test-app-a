import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = userCredentials;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
      return;
    }

    setSuccessMessage("User successfully Registered. Now SignIn");
    toast.success("Registered in Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });
    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  return (
    <>
      <div className="registercontainer">
        <div className="container">
          <div className="registerheading">Signup</div>
          <div className="registerdescription">
            We do not share personal details with anyone
          </div>
        </div>
        <div className="registerform">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="firstName">Firstname</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={userCredentials.firstName}
                onChange={handleChange}
                required
                tabIndex="1"
                aria-label="First Name"
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={userCredentials.lastName}
                onChange={handleChange}
                required
                tabIndex="2"
                aria-label="Last Name"
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userCredentials.email}
                onChange={handleChange}
                required
                tabIndex="3"
                aria-label="Email"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={userCredentials.password}
                onChange={handleChange}
                required
                tabIndex="4"
                aria-label="Password"
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userCredentials.confirmPassword}
                onChange={handleChange}
                required
                tabIndex="5"
                aria-label="Confirm Password"
              />
            </div>
            {errorMessage && <div className="signup-error">{errorMessage}</div>}
            {successMessage && <div className="signup-success">{successMessage}</div>}
            <button type="submit" className="registerbutton" tabIndex="6">
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
