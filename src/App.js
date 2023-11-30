import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { storeUserData, resetUserData } from "./store/actions/UserActions";
function App() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        setUsers(data.users);
        const usersWithCart = data.users.map((user) => ({
          ...user,
          cart: [],
          isActive:false,
        }));
        // setUserData(usersWithCart);
        dispatch(storeUserData(usersWithCart));
        

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <Header />
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />

        
      </Routes>
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default App;
