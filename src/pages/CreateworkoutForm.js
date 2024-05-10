import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";

import BgImage from "../assets/workout000.jpg";
import WorkOutPlan from "../services/WorkOutPlan";
import { NavBar } from "../components/NavBar";

const WorkoutPlanPage = () => {
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
    setWorkoutPlan({
      ...workoutPlan,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await WorkOutPlan.createWorkOutPlan(
        user.id,
        workoutPlan
      );
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
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

        <div
          className="border shadow-xl p-8 m-auto w-[800px] rounded-3xl mt-[130px] mr-[250px]"
          style={{ background: 'rgba(209, 213, 219, 0.7)' }} // Changed to use RGBA for semi-transparent background
        >
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
                className="bg-blue-600 p-3 rounded-xl"
                onClick={handleSubmit}
              >
                Create
              </button>
              <button
                type="button"
                className="bg-red-600 p-3 rounded-xl"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;
