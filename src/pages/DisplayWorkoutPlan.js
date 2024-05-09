import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CommentPopup from "./CommentPopup ";
import MealPlanService from "../services/MealPlanService";
import MealPhoto from "../assets/21631.jpg";
import CommentService from "../services/CommentService";
import { useNavigate } from "react-router-dom";
import WorkoutService from "../services/WorkoutService";
import WorkOutPlan from "../services/WorkOutPlan";

const DisplayWorkoutPlan = ({ loggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const userId = loggedIn.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (loggedIn && userId) {
          const response = await WorkOutPlan.getAllPlans();
          console.log("plan", response);
          setPosts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [loggedIn]);
  console.log("plan", posts);
  

  const navigate = useNavigate();

  const handleEditClick = (e, id) => {
    // Redirect to editUserDetails page with logged in user's details
    navigate(`/workoutplan/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      {loading ? (
        <p className="text-center text-lg font-semibold">
          Loading meal plans...
        </p>
      ) : (
        <div>
          {posts.map((status, index) => (
            <div
              key={status.id}
              className="bg-gray-300 shadow-lg rounded-lg overflow-hidden mb-8 relative w-[1000px] ml-40 p-5"
            >
              {status.user.firstName} {status.user.lastName}
              <div className="flex flex-row">
                <img
                  className="w-1/2 h-full object-cover object-center"
                  src={status.user.profilePictureUrl}
                  alt="Meal Plan"
                />

                <div className="p-6 space-y-8">
                  <h2 className="text-xl font-bold mb-2">
                    {status.workoutType}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Excercies Name : </span>{" "}
                    {status.excerciesName}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Repitition : </span>{" "}
                    {status.repitition}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Duration : </span>{" "}
                    {status.duration}
                  </p>

                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Description : </span>{" "}
                    {status.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 w-full justify-center">
                  <button
                    className="w-1/2 flex justify-center p-3 border gap-5 cursor-pointer"
                    // onClick={() => handleLikeClick(index, post.postId)}
                  >
                    <img
                      className={`w-7 h-7 ${"filter invert opacity-0"}`}
                      src="https://img.icons8.com/emoji/48/red-heart.png"
                      alt="red-heart"
                    />
                    Like
                  </button>
                  <div className="w-1/2 flex flex-row justify-center gap-5 p-3 border cursor-pointer">
                    <button
                    // onClick={() => handleOpenPopup(post.postId)}
                    >
                      <img
                        className="w-6 h-6 filter"
                        src="https://img.icons8.com/ios/50/000000/speech-bubble--v1.png"
                        alt="speech-bubble--v1"
                      />
                    </button>
                    Comment
                  </div>

                  <div className="w-1/2 flex flex-row justify-center gap-5 p-3 border cursor-pointer">
                    <button
                      className="w-6 h-6 filter"
                      onClick={(e, id) => handleEditClick(e, status.id)}
                    >
                      <img
                        className="w-6 h-6 filter"
                        src="https://img.icons8.com/ios/50/edit--v1.png"
                        alt="edit--v1"
                      />
                    </button>
                    Edit
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DisplayWorkoutPlan;
