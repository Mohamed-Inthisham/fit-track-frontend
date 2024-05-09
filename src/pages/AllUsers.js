import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Input } from "@material-tailwind/react";
import UserServise from "../services/UserService";
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
        const response = await UserServise.getUser();
        setUsers(response.data);
        // Initialize follow status based on current user's followed users
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
  }, [user]); // Refetch data when user changes

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);
console.log("user",user)
  const handleFollowClick = async (userId) => {
    try {
      // Toggle follow status
      const updatedFollowStatus = { ...followStatus };
      updatedFollowStatus[userId] = !updatedFollowStatus[userId];
      setFollowStatus(updatedFollowStatus);

      const response = await UserServise.followUsers(user.id, userId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const viewUser = (e, id) => {
    e.preventDefault();
    
    navigate(`/friend/${id}`);
  };

  return (
    <div className="flex flex-col " key={user.userId}>
      <NavBar />

      <div className="flex flex-1 ">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-40 ">
          <div className="grid grid-cols-4  p-4 ml-[300px] ">
            {users?.map((u, index) =>
              u.userId !== user.id ? (
                <div className="p-3 m-auto space-y-4 cursor-pointer" key={index} onClick={(e, id )=> viewUser(e, u.userId)}>
                  <div className=" p-4 w-[200px] h-[200px]">
                    <img
                      src={u.profilePictureUrl}
                      alt={`${u.firstName} profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                   
               
                  </div>
                  <button
                    onClick={() => handleFollowClick(u.userId)}
                    className="bg-blue-600 rounded-lg w-full"
                  >
                    {followStatus[u.userId] ? "Unfollow" : "Follow"}
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
