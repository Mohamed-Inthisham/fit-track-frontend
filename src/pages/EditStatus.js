import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "./SideBar";
import BckImage from "../assets/young-fitness-man-studio.jpg";
import WorkoutService from "../services/WorkoutService";
import { useNavigate, useParams } from "react-router-dom";

const StatusEdit = () => {
  const [status, setStatus] = useState({
    name: "",
    reps: 0,
    timePerRep: "",
    distance: "",
    typeOfWorkout: "",
    description: "",
    workoutLocation: "",
  });

  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus((prevStatus) => ({
      ...prevStatus,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const statusData = {
        ...status,
      };

      const response = await WorkoutService.updateStatus(id, statusData);
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WorkoutService.getOneStatus(id);
        setStatus(response.data);
        console.log("one status", response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await WorkoutService.deleteById(id);
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
    navigate("/home");
  };

  return (
    <div
      className="flex h-full  bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BckImage})` }}
    >
      <NavBar />
      <SideBar />
      <div className="mborder shadow-xl p-9 m-auto  w-[800px] rounded-3xl  mt-24 mr-[400px] bg-gray-300">
        <div className=" bg-white p-5">
          <form className="p-5 space-y-5  flex flex-col ">
            <div className="">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={status.name}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
            <div className=" flex flex-row gap-3">
              <div>
                <label>Reps:</label>
                <input
                  type="number"
                  name="reps"
                  value={status.reps}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Time per Rep:</label>
                <input
                  type="text"
                  name="timePerRep"
                  value={status.timePerRep}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
            </div>
            <div></div>
            <div>
              <label>Distance:</label>
              <input
                type="text"
                name="distance"
                value={status.distance}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
            <div>
              <label>Type of Workout:</label>
              <input
                type="text"
                name="typeOfWorkout"
                value={status.typeOfWorkout}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={status.description}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              ></textarea>
            </div>
            <div>
              <label>Workout Location:</label>
              <input
                type="text"
                name="workoutLocation"
                value={status.workoutLocation}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
          </form>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusEdit;
