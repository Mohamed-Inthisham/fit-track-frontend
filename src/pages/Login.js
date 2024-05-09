import React, { useState } from 'react';
import LoginImage from '../assets/login4.jpg';
import google from '../assets/google.jpg';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import '../css/login.css'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    UserService.loginUser(user)
      .then((response) => {
        console.log(response);
        navigate('/home');
        alert('Welcome!');
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data);
      });
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(${LoginImage})`, backgroundSize: 'cover' }}
    >
      <div
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg h-auto p-20 rounded-lg shadow-lg"
        style={{ minWidth: '400px', minHeight: '700px' }}
      >
        <h2 className="text-xl font-semibold mb-5 text-center bebas-neue-regular">FIT TRACK</h2>
        <h2 className="text-xl font-semibold mt-[50px] mb-4 text-center ">Login</h2>
        <form className="space-y-10">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
          />
          <button
            type="submit"
            onClick={loginUser}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center items-center"
          >
            <img src={google} alt="Google logo" className="mr-2" style={{ height: '20px' }} />
            Login With
          </button>
        </form>
        <div className="flex flex-row justify-center mt-4">
          <p className="mr-1">Don't have an Account?</p>
          <Link to="/register">
            <p className="text-blue-600 underline cursor-pointer">Register now!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
