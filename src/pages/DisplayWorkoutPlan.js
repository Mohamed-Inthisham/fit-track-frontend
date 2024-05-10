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
 
  

  const navigate = useNavigate();

  const handleEditClick = (e, id) => {
    // Redirect to editUserDetails page with logged in user's details
    navigate(`/workoutplan/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      {loading ? (
        <p className="text-center text-lg font-semibold">
          Loading workout plans...
        </p>
      ) : (
        <div>
          {posts.map((status, index) => (
            <div
              key={status.id}
              className="bg-gray-300 shadow-lg rounded-lg overflow-hidden mb-8 relative w-[1000px] ml-80 p-5"
            >
              {status.user ? (
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={status.user.profilePictureUrl || "default-user-image.png"}
                    alt={`${status.user.firstName} ${status.user.lastName}`}
                  />
                  <span className="font-bold">
                    {status.user.firstName} {status.user.lastName}
                  </span>
                </div>
              ) : (
                <p className="text-red-500">User information not available</p>
              )}
              <div className="flex flex-row">
  <div className="p-6 w-full">
    <h2 className="text-xl font-bold mb-4">
      Workout Type :     {status.workoutType}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-200 p-4 rounded-lg shadow flex flex-col overflow-hidden">
        <span className="font-semibold">Exercise Name:</span>
        <div className="text-gray-700 mt-1 break-words">{status.excerciesName}</div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow flex flex-col overflow-hidden">
        <span className="font-semibold">Repetition:</span>
        <div className="text-gray-700 mt-1 break-words">{status.repitition}</div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow flex flex-col overflow-hidden">
        <span className="font-semibold">Duration:</span>
        <div className="text-gray-700 mt-1 break-words">{status.duration}</div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow flex flex-col overflow-hidden">
        <span className="font-semibold">Description:</span>
        <div className="text-gray-700 mt-1 break-words">{status.description}</div>
      </div>
    </div>
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
