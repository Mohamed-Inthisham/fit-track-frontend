import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CommentPopup from "./CommentPopup ";
import MealPlanService from "../services/MealPlanService";
import MealPhoto from "../assets/21631.jpg";
import CommentService from "../services/CommentService";
import { useNavigate } from "react-router-dom";

const MealPlanDisplay = ({ loggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const userId = loggedIn.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (loggedIn && loggedIn.id) {
          const response = await MealPlanService.getAll();
          console.log("meal", response);
          setPosts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [loggedIn]);
  console.log("meal", posts);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();

  const handleEditClick = (e, id) => {
    // Redirect to editUserDetails page with logged in user's details
    navigate(`/mealplan/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      {loading ? (
        <p className="text-center text-lg font-semibold">
          Loading meal plans...
        </p>
      ) : (
        <div>
          {posts.map((mealPlan, index) => (
            <div
              key={mealPlan.id}
              className="bg-gray-300 shadow-lg rounded-lg overflow-hidden mb-8 relative w-[1000px] ml-40 p-5"
            >
              {mealPlan.user.firstName} {mealPlan.user.lastName}
              <div className="flex flex-row">
                <img
                  className="w-1/2 h-full object-cover object-center"
                  src={mealPlan.user.profilePictureUrl}
                  alt="Meal Plan"
                />

                <div className="p-6 space-y-8">
                  <h2 className="text-xl font-bold mb-2">
                    {mealPlan.mealtime}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Ingredients:</span>{" "}
                    {mealPlan.ingredients}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Meal Type:</span>{" "}
                    {mealPlan.mealtype}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Portion Sizes:</span>{" "}
                    {mealPlan.portionSize}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Cooking Instructions:</span>{" "}
                    {mealPlan.cookingInstructions}
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
                      onClick={(e, id) => handleEditClick(e, mealPlan.id)}
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
export default MealPlanDisplay;
