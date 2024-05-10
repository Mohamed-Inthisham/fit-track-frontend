import React from "react";
import { SideBar } from "./SideBar";
import BgImage from "../assets//sports-equipment-around-clipboard.jpg";
import Back from "../assets/photo-musculary-afro-american-sports-mans-back.jpg";
import image1 from "../assets/wi1.jpeg";
import image2 from "../assets/wi2.jpeg";
import image3 from "../assets/wi4.jpeg";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const CreateWorkouPlan = () => {
  return (
    <div
        className="bg-cover  bg-center h-screen bg bg-white"
        >
      <NavBar />


              <div className="bg-[#D24545] text-white p-4 flex justify-between items-center ml-[340px] mt-[100px] w-[1200px]">
                <div className="flex items-center" >
                  {/* Your logo or site title goes here */}
                  <h1 className="text-xl font-semibold">Create Workout Plan</h1>
                </div>
                <div>
                  <Link to="/workoutform" className="bg-[#B80000] hover:bg-[#95190c] text-white py-2 px-4 rounded-full">
                    {/* <FaPlus className="inline-block mr-2" /> */}
                    Add New
                  </Link>
                </div>
              </div>

      

      
      <div className="flex mt-[-160px]">


        
        <SideBar />

        

        <div className="ml-[330px] bg-black">
              



            

            </div>

            
              

            

            
    


          <div className="mt-[230px] mr-[70px] ml-[100px] w-[1100px] ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mb-5 h-[-100px] w-[1050px]">
                <div>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img className="w-full h-[300px]" src={image1} alt="Java Basics" />
                    <div className="p-4">
                      <h5 className="text-lg font-bold mb-2">Dynamic Power: Energize Your Body Workout</h5>
                      <p className="text-gray-700">
                      Get ready to break a sweat and feel the burn with this high-energy workout! Designed to boost your strength, flexibility, and endurance, this dynamic routine will leave you feeling energized and empowered. Whether you're a fitness enthusiast or just starting your journey, this workout is perfect for anyone looking to challenge themselves and achieve their fitness goals. Get ready to unleash your inner athlete and transform your body one rep at a time!
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img className="w-full h-[300px]" src={image2}  alt="Introduction to HTML" />
                    <div className="p-4">
                      <h5 className="text-lg font-bold mb-2">Total Body Thrive: Energize, Tone, Transform</h5>
                      <p className="text-gray-700">
                      Revitalize your body and mind with our invigorating workout routine! Designed to boost your energy, tone your muscles, and enhance your overall well-being, our dynamic workout combines cardio, strength training, and flexibility exercises for a holistic fitness experience. Whether you're a beginner or a seasoned gym enthusiast, join us on a journey to unleash your full potential and achieve your fitness goals.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img className="w-full h-[300px]" src={image3}  alt="Introduction to CSS" />
                    <div className="p-4">
                      <h5 className="text-lg font-bold mb-2">Revitalize360: Transformative Fitness Fusion</h5>
                      <p className="text-gray-700">
                      Transform your body and mind with our invigorating workout regimen. Our expertly crafted routines blend strength training, cardio, and flexibility exercises to help you achieve your fitness goals while revitalizing your energy and boosting your confidence. Join us for a dynamic and empowering fitness experience that will leave you feeling stronger, healthier, and more vibrant than ever before.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>



          
        

        



      </div>
    </div>
  );
};

export default CreateWorkouPlan;
