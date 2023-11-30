import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { storeUserData, resetUserData } from "../../store/actions/UserActions";


const Login = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.userData);
// console.log(usersData);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  // const [usersData, setUserData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userExist = usersData.find(
      (user) =>
        user.email === userCredentials.email &&
        user.password === userCredentials.password
    );

    if (userExist) {
      toast.success("Logged in Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      });
      const updatedUsers = usersData.map((user) => ({
        ...user,
        isActive: user.email === userCredentials.email && user.password === userCredentials.password,
      }));
      console.log(updatedUsers);
      // dispatch(resetUserData());

      dispatch(storeUserData(updatedUsers));
      navigate("/");
    } else {
      toast.error("Invalid email or password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  return (
    <>
      <div className="logincontainer">
        <div className="container">
          <div className="loginheading">Login</div>
          <div className="logindescription">
            Get access to your orders, Wishlist, and Recommendations
          </div>
        </div>
        <div className="loginform">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userCredentials.email}
                onChange={handleChange}
                required
                tabIndex="1"
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
                tabIndex="2"
                aria-label="Password"
              />
            </div>
            <button type="submit" className="loginbutton" tabIndex="3">
              Login
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;
