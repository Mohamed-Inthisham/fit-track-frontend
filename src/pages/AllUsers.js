import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import UserService from "../services/UserService";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followStatus, setFollowStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUser();
        setUsers(response.data);
        const followedUsers = response.data.reduce((acc, u) => {
          acc[u.userId] = user.following.includes(u.userId);
          return acc;
        }, {});
        setFollowStatus(followedUsers);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, []);

  const handleFollowClick = async (userId) => {
    const updatedFollowStatus = { ...followStatus };
    updatedFollowStatus[userId] = !updatedFollowStatus[userId];
    setFollowStatus(updatedFollowStatus);
    try {
      const response = await UserService.followUsers(user.id, userId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const viewUser = (e, id) => {
    e.preventDefault();
    navigate(`/friend/${id}`);
  };

  if (loading) return <p>Loading...</p>; // Display a loading message if data is still fetching

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="w-full max-w-4xl">
            <ul className="space-y-4">
              {users?.map((u, index) => (
                u.userId !== user.id && (
                  <li
                    key={u.userId}
                    className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg cursor-pointer"
                    onClick={(e) => viewUser(e, u.userId)}
                  >
                    <img
                      src={u.profilePictureUrl}
                      alt={`${u.firstName} profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-900 truncate">{`${u.firstName} ${u.lastName}`}</p>
                      <p className="text-sm text-gray-500 truncate">{u.email}</p>
                    </div>
                    <button
                      onClick={() => handleFollowClick(u.userId)}
                      className={`px-4 py-2 rounded text-white ${followStatus[u.userId] ? 'bg-red-600' : 'bg-blue-600'}`}
                    >
                      {followStatus[u.userId] ? "Unfollow" : "Follow"}
                    </button>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
