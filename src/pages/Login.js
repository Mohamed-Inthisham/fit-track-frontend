import React, { useState } from "react";
import LoginImage from "../assets/gum-login.jpg";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const Login = () => {
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const loginUser = async (e) => {
    console.log(user);

    e.preventDefault();
    UserService.loginUser(user)
      .then((response) => {
        console.log(response);
        navigate("/home");
        alert("Welcom!");
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data);
      });
  };
  return (
    <div className=" flex flex-row">
      <div className="w-3/5">
        <img className="h-screen " src={LoginImage} alt="Login Image" />
      </div>
      <div className="w-2/5">
        <div className="bg-black bg-opacity-40 absolute inset-0 "></div>
        <div className="bg-white h-full shadow-md rounded-md space-y-10 p-8 w-100 relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            type="text"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="Username"
            className="w-full px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
          />
          <button
            onClick={loginUser}
            className="w-full bg-blue-500 mb-5 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            google login
          </button>
          <div className="flex flex-row">
            <p className="mr-1">Don't have an Account?</p>
            <Link to="/register">
              <p className="ml-1 text-blue-600 underline cursor-pointer">
                Register now!
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
