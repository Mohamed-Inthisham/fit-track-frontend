import React, { useEffect, useState } from "react";
import Image1 from "../assets/gym2.jpg";
import { json } from "react-router-dom";

const Follow = ({ users }) => {
  
  return (
    <div className=" flex border bg-gray-700 flex-row gap-5 mt-9 p-5">
      {users?.map((user, index) => (
        <div className="bg-white rounded-xl w-[150px] h-[200px] flex flex-col" key={index}>
          <div className="flex flex-row gap-4 p-4">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={Image1}
              alt="Rounded Image"
            />
        
          </div>

          <div className="w-[100px] h-[100px] mb-5 m-auto">
            <img className="w-full h-full" src={Image1} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Follow;
