import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "./SideBar";
import BckImage from "../assets/workout_running.jpg";
import WorkoutService from "../services/WorkoutService";

const CreateStatus = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState({});
  const [templates, setTemplates] = useState([]);
  const [statusData, setStatusData] = useState({});

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    // Add logic here to handle opening the popup form
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const userData = localStorage.getItem("user");
        setLoggedIn(JSON.parse(userData));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
    // Add logic here to handle closing the popup form
  };
  const [formData, setFormData] = useState({
    name: "",
    reps: 0,
    timePerRep: "",
    distance: "",
    typeOfWorkout: "",
    description: "",
    workoutLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await WorkoutService.saveTemplate(formData, loggedIn.id);
      console.log("user", loggedIn.id);
      console.log(response.data);
      closePopup();

      setFormData({
        name: "",
        reps: 0,
        timePerRep: "",
        distance: "",
        typeOfWorkout: "",
        description: "",
        workoutLocation: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (loggedIn.id === undefined) {
      return;
    }
    const fetchData = async () => {
      try {
        console.log("meka uala", loggedIn.id);
        const response = await WorkoutService.getTemplate(loggedIn.id);
        console.log(response);
        if (Array.isArray(response.data)) {
          setTemplates(response.data);
        } else {
          console.error("Response data is not an array:", response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [loggedIn]);

  const handleTemplateClick = (template) => {
    setStatusData({
      ...formData,
      name: template.name || "",
      reps: template.reps || 0,
      timePerRep: template.timePerRep || "",
      distance: template.distance || "",
      typeOfWorkout: template.typeOfWorkout || "",
      description: template.description || "",
      workoutLocation: template.workoutLocation || "",
    });
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();

    try {
      const response = await WorkoutService.postWorkOutPlan(
        loggedIn.id,
        statusData
      );
      console.log(response.data);
      setStatusData({
        name: "",
        reps: 0,
        timePerRep: "",
        distance: "",
        typeOfWorkout: "",
        description: "",
        workoutLocation: "",
      });
      setShowSuccessMessage(true); 
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = async () => {
    setStatusData({
      name: "",
      reps: 0,
      timePerRep: "",
      distance: "",
      typeOfWorkout: "",
      description: "",
      workoutLocation: "",
    });
  };
  return (
    <div
    className="bg-cover bg-center max-h-max h-screen"
    style={{
      backgroundImage: `url(${BckImage})`,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Change opacity here (0.5 for 50% opacity)
      width:"100%",
      maxHeight:"1400px"
    }}
  >
    <div className="flex  ">
      <NavBar />
      <SideBar />
      <div className="mborder shadow-xl p-9 m-auto  w-[780px]  rounded-3xl  mt-24 mr-[400px] bg-gray-300">
        <div className="bg-white grid grid-cols-3  gap-4 p-5">
          {templates.map((temp, index) => (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              key={index}
              onClick={() => handleTemplateClick(temp)}
            >
              {temp.name}
            </button>
          ))}
        </div>

        <div className=" bg-white p-4">
          <button
            className="bg-red-500 text-white w-[200px] h-[50px] px-4 py-2 rounded col-span-3"
            onClick={openPopup}
          >
            Create Template
          </button>
          {showSuccessMessage && <div className="text-green-500 text-center mt-2">Successfully added!</div>}

          <form className="p-5 space-y-0  flex flex-col ">
            <div className="">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={statusData.name}
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
                  value={statusData.reps}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Time per Rep:</label>
                <input
                  type="text"
                  name="timePerRep"
                  value={statusData.timePerRep}
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
                value={statusData.distance}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
            <div>
              <label>Type of Workout:</label>
              <input
                type="text"
                name="typeOfWorkout"
                value={statusData.typeOfWorkout}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={statusData.description}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              ></textarea>
            </div>
            <div>
              <label>Workout Location:</label>
              <input
                type="text"
                name="workoutLocation"
                value={statusData.workoutLocation}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
              />
            </div>
          </form>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
              onClick={handleSubmitStatus}
            >
              Create
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleClear}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mx-auto"
        style={{
          
          paddingTop: '75px', 
          paddingLeft: '300px' 
          
        }}>
          
          <div className="bg-white p-8 rounded-md overflow-y-auto max-h-[80vh]"
          style={{
          
            width: '500px',
            height:'900px' 
           
            
          }}>
            <h2 className="text-2xl font-bold mb-4">Create Template</h2>
            
            <form onSubmit={handleSubmit} className=" p-5 space-y-8 ">
              <div className=" ">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Reps:</label>
                <input
                  type="number"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Time per Rep:</label>
                <input
                  type="text"
                  name="timePerRep"
                  value={formData.timePerRep}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Distance:</label>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Type of Workout:</label>
                <input
                  type="text"
                  name="typeOfWorkout"
                  value={formData.typeOfWorkout}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                ></textarea>
              </div>
              <div>
                <label>Workout Location:</label>
                <input
                  type="text"
                  name="workoutLocation"
                  value={formData.workoutLocation}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Create
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CreateStatus;
