import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";

import Post from "./Post";
import UserServise from "../services/UserService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import MealPlanDisplay from "./MealPlanDisplay";
import DisplayStatus from "./DisplayStatus";
import DisplayWorkoutPlan from "./DisplayWorkoutPlan";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      fetchUser();
    }
    setUser(JSON.parse(userData));
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user", {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserServise.getUser();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className=" mt-[70px] bg-gradient-to-r from-red-300 to-red-700 flex">
      <SideBar />
      <NavBar user={user} />
      <div className=" m-auto ">
        <Post />
        <MealPlanDisplay loggedIn={user} />
        <DisplayStatus loggedIn={user} />
        <DisplayWorkoutPlan loggedIn={user} />
      </div>
    </div>
  );
};

export default Home;
