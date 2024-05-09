import React from "react";
import { SideBar } from "./SideBar";
import BgImage from "../assets//sports-equipment-around-clipboard.jpg";
import Back from "../assets/photo-musculary-afro-american-sports-mans-back.jpg";
import Front from "../assets/man-holding-heavy-chain-hands.jpg";
import Arms from "../assets/5209.jpg";
import Legs from "../assets/legs.jpg";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const CreateWorkouPlan = () => {
  return (
    <div
      className="bg-cover  bg-center h-screen "
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Change opacity here (0.5 for 50% opacity)
      }}
    >

      <NavBar />
      <div className="flex">
        <SideBar />

        <div className="border shadow-xl p-10 m-auto flex flex-col  rounded-3xl ml-[400px] items-center   mt-24  bg-gray-300">
          
          
          <div className=" flex gap-5 ">
            <Link to='/workoutform'>
              <div className=" justify-center items-center flex flex-col text-xl gap-4 font-bold cursor-pointer hover:bg-blue-500 p-3 ">
                {/* <img src={Back} className=" w-[300px] h-[200px] rounded-lg" /> */}
                <h2 className="text-center text-2xl font-bold mb-4">
            Create Workout Plan
          </h2>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkouPlan;
