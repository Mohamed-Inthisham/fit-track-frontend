import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { NavBar } from "../components/NavBar";
import UploadedPosts from "./UploadedPosts";
import MealPlanDisplay from "./MealPlanDisplay";

const FriendProfile = () => {
  const { id } = useParams();
  const [loggedIn, setLoggedIn] = useState({});
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [user, setUser] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    followersCount: "",
    followingCount: "",
    phoneNumber: "",
    profilePictureUrl: "",
    username: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setLoggedIn(JSON.parse(userData));
  }, []);
  console.log("lol", id);
  const [activeTab, setActiveTab] = useState("post");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(id);
        setUser(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(loggedIn.id);
        setLoggedUser(response.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return (
    <div className="bg-gray-200  min-h-screen flex">
      <NavBar />
      <div className="bg-white rounded-lg shadow-md mt-[70px] w-1/4">
        <div className="flex items-center bg-slate-500 text-white  h-[300px] m-auto justify-center flex-col">
          <img
            src={loggedUser.profilePictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <p className="text-3xl font-semibold">{`${loggedUser.firstName} ${loggedUser.lastName}`}</p>
            <p className="text-white text-2xl">{loggedUser.email}</p>
          </div>
        </div>
        <div className=" flex flex-row  justify-between  font-bold">
          <div className="w-1/2 p-4 m-auto flex  justify-center bg-blue-500 text-xl">
            Followers : {loggedUser.followersCount}
          </div>
          <div className="w-1/2 flex p-4 justify-center m-auto bg-green-400 text-xl">
            Following : {loggedUser.followingCount}
          </div>
        </div>
        <form className=" p-8">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-semibold mb-2"
            >
              User Name:
            </label>
            <label
              id="username"
              name="username"
              //   onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            >
              {loggedIn.username}
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email:
            </label>
            <label
              type="email"
              id="email"
              name="email"
              //   onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            >
              {loggedIn.email}
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-semibold mb-2"
            >
              Phone Number:
            </label>
            <label
              id="phoneNumber"
              name="phoneNumber"
              //   onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            >
              {loggedIn.phoneNumber}
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-lg font-semibold mb-2">
              Address:
            </label>
            <label
              id="bio"
              name="bio"
              //   onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            >
              {loggedIn.bio}
            </label>
          </div>
        </form>
      </div>
      <div className=" mr-auto mt-[70px]  w-full">
        <div className=" bg-yellow-50 p-5 flex flex-row">
          <div className=" w-[300px] flex">
            <div className=" rounded-full w-[300px] h-[300px]">
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div className=" text-3xl font-medium ml-10 flex">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="flex justify-around w-full bg-blue-300">
            <button
              className={`px-4 py-2 ${
                activeTab === "post" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("post")}
            >
              Post
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "workout"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("workout")}
            >
              Workout
            </button>

            <button
              className={`px-4 py-2 ${
                activeTab === "mealPlan"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("mealPlan")}
            >
              Meal Plan
            </button>
          </div>
          {/* Render content based on active tab */}
          {activeTab === "post" && (
            <div className="mt-5">
              <UploadedPosts loggedIn={user} />
            </div>
          )}

          {activeTab === "workout" && (
            <div className="mt-5">Workout Content Goes Here</div>
          )}
          {activeTab === "mealPlan" && (
            <div className="mt-5">
              <MealPlanDisplay loggedIn={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
