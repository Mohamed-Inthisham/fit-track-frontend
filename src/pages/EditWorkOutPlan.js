import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkOutPlan from "../services/WorkOutPlan";
import BgImage from "../assets/top-view-table-full-delicious-food-composition.jpg";
import { SideBar } from "./SideBar";
import { NavBar } from "../components/NavBar";

const EditWorkOutPlan = () => {
  const { id } = useParams();

  const [workoutPlan, setWorkoutPlan] = useState({
    workoutType: "",
    duration: "",
    excerciesName: "",
    repitition: "",
    description: "",
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutPlan((prevWorkoutPlan) => ({
      ...prevWorkoutPlan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workoutData = {
        ...workoutPlan,
      };

      const response = await WorkOutPlan.updateWorkOutPlan(id, workoutData);
      console.log(response);
      alert("Edited Successfully")
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WorkOutPlan.getPlanById(id);
        setWorkoutPlan(response.data);
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
      const response = await WorkOutPlan.deleteById(id);
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
    navigate("/home");
  };

  return (
    <div>
      <div
        className="bg-cover bg-center max-h-max h-screen"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >

        <NavBar />
        <div className="flex">
          <SideBar />

          <div className="border shadow-xl p-8 m-auto w-[800px] rounded-3xl mt-24 mr-[400px] bg-gray-300">
            <h2 className="text-center text-2xl font-bold mb-4">
              Create Workout Plan
            </h2>
            <form>
              <div>
                <label htmlFor="workoutType">Workout Type:</label>
                <select
                  id="workoutType"
                  name="workoutType"
                  value={workoutPlan.workoutType}
                  onChange={handleChange}
                  className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                >
                  <option value="">Select workout type</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>
              <div>
                <label htmlFor="excerciesName">Excercies Name:</label>
                <input
                  type="text"
                  id="excerciesName"
                  name="excerciesName"
                  value={workoutPlan.excerciesName}
                  onChange={handleChange}
                  className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                />
              </div>
              <div>
                <label htmlFor="duration">Duration (minutes):</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={workoutPlan.duration}
                  onChange={handleChange}
                  className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                />
              </div>
              <div>
                <label htmlFor="repitition">Repitition:</label>
                <textarea
                  id="repitition"
                  name="repitition"
                  value={workoutPlan.repitition}
                  onChange={handleChange}
                  className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={workoutPlan.description}
                  onChange={handleChange}
                  className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-opacity-10"
                />
              </div>
              <div className="flex flex-col gap-y-4 text-white text-lg font-semibold">
                <button
                  type="submit"
                  className="bg-green-600 p-3 rounded-xl"
                  onClick={handleSubmit}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-red-600 p-3 rounded-xl"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkOutPlan;
