import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SideBar } from "./SideBar";

import BgImage from "../assets/top-view-table-full-delicious-food-composition.jpg";
import MealPlanService from "../services/MealPlanService";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../config/Config";

const MealPlanEdit = () => {
  const [mealPlan, setMealPlan] = useState({
    mealtime: "",
    isVegan: false,
    isMeat: false,
    ingredients: "",
    cookingInstructions: "",
    portionSize: "",
    photoUrl: "",
  });

  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({});
  const storage = getStorage(app);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMealPlan((prevMealPlan) => ({
      ...prevMealPlan,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null; // Initialize with existing photo URL if available
      if (selectedFile) {
        const imageRef = ref(storage, `/images/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
        
      }

      const mealPlanData = {
        ...mealPlan,
        photoUrl: imageUrl,
      };

      const response = await MealPlanService.updatePlan(id, mealPlanData);
      alert("Edited Successfully")
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MealPlanService.getMealplanById(id);
        setMealPlan(response.data);
        console.log("one meal plan", response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await MealPlanService.deleteById(id);
      console.log(response);
      alert("Mealplan deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
    navigate("/home");
  };

  return (
    <div
      className="bg-cover bg-center max-h-max h-screen"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Change opacity here (0.5 for 50% opacity)
      }}
    >
      <div className="flex  ">
        <SideBar />

        <div className="border shadow-xl p-8 m-auto  w-[800px] rounded-3xl  mt-24 mr-[400px] bg-gray-300">
          <h2 className="text-center text-2xl font-bold mb-4">
            Edit Meal Plan
          </h2>
          <form className=" ">
            <div>
              <label htmlFor="mealtime">Meal Plan:</label>
              <ul>
                <li>
                  <select
                    id="mealtime"
                    name="mealtime"
                    value={mealPlan.mealtime}
                    onChange={handleChange}
                    className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                  >
                    <option value="">Select mealtime</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch </option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </li>
              </ul>
            </div>
            <div>
              <label htmlFor="mealtype">Meal Type:</label>
              <ul>
                <li>
                  <select
                    id="mealtype"
                    name="mealtype"
                    value={mealPlan.mealtype}
                    onChange={handleChange}
                    className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                  >
                    <option value="">Select meal type</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Meat">Meat </option>
                    <option value="Vege">Vege</option>
                  </select>
                </li>
              </ul>
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={mealPlan.ingredients}
                onChange={handleChange}
                className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500  bg-opacity-10"
              />
            </div>
            <div>
              <label htmlFor="cookingInstructions">Cooking Instructions:</label>
              <textarea
                id="cookingInstructions"
                name="cookingInstructions"
                value={mealPlan.cookingInstructions}
                onChange={handleChange}
                className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500  bg-opacity-10"
              />
            </div>
            <div>
              <label htmlFor="portionSize">Portion Size:</label>
              <input
                type="text"
                id="portionSize"
                name="portionSize"
                value={mealPlan.portionSize}
                onChange={handleChange}
                className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500  bg-opacity-10"
              />
              <div>
              <label htmlFor="media">Upload Photo:</label>
              <input
                type="file"
                id="media"
                onChange={handleFileChange}
                className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
              />
              {/* {previewUrl && (
                <img
                  src={previewUrl}
                  className="  w-[200px] h-[200px] "
                  alt="Selected"
                />
              )} */}
            </div>
            </div>

            <div className=" flex flex-col gap-y-4 text-white text-lg font-semibold">
              <button
                type="submit"
                className=" bg-green-600 p-3 rounded-xl"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                type="button"
                className=" bg-red-600 p-3 rounded-xl"
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealPlanEdit;
