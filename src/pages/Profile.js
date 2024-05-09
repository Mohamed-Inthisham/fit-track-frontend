import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import UploadedPosts from "./UploadedPosts";
import UserService from "../services/UserService";
import MealPlanDisplay from "./MealPlanDisplay";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    phoneNumber: "",
  });
  const [loggedIn, setLoggedIn] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [originalData, setOriginalData] = useState({}); // State to hold original data when entering edit mode

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setLoggedIn(JSON.parse(userData));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(loggedIn.id, user);
      if (response.status === 200) {
        setEditMode(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const navigate = useNavigate();
  const updateUser = async (userID, user) => {
    try {
      const response = await UserService.updateUser(user, userID);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(loggedIn.id);
        setUser(response.data);
        console.log("user", response);
      } catch (error) {}
    };
    fetchData();
  }, [loggedIn.id]);
  console.log("getting user", user);

  const handleEdit = () => {
    setOriginalData({ ...loggedIn }); // Save original data when entering edit mode
    setEditMode(true);
  };

  const handleCancel = () => {
    setUser({ ...originalData }); // Reset to original data when canceling edit mode
    setEditMode(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <NavBar />
      <div className="bg-white rounded-lg shadow-md mt-[70px] w-1/4">
        <div className="flex items-center bg-slate-500 text-white h-[300px] m-auto justify-center flex-col">
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <p className="text-3xl font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-white text-2xl">{loggedIn.email}</p>
          </div>
        </div>
        <div className="flex justify-between font-bold p-4">
          <div className="w-1/2 p-4 bg-blue-500 text-xl text-white rounded-l">
            Followers: {user.followersCount}
          </div>
          <div className="w-1/2 p-4 bg-green-400 text-xl text-white rounded-r">
            Following: {user.followingCount}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-lg font-semibold mb-2"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
              disabled={!editMode}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-lg font-semibold mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
              disabled={!editMode}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
              disabled={!editMode}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-lg font-semibold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
              disabled={!editMode}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block text-lg font-semibold mb-2"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
              disabled={!editMode}
            />
          </div>
          {/* Include other input fields similarly */}
          {editMode ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Edit
            </button>
          )}
        </form>
      </div>
      <div className="flex m-auto flex-col">
        <UploadedPosts loggedIn={loggedIn} />
        <MealPlanDisplay loggedIn={loggedIn} />
      </div>
    </div>
  );
};

export default Profile;
