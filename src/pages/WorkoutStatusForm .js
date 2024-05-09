import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

const WorkoutStatusForm = () => {
  const [workoutStatus, setWorkoutStatus] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");

  const handleAddWorkout = () => {
    if (newWorkout.trim() !== "") {
      setWorkoutStatus([...workoutStatus, newWorkout]);
      setNewWorkout("");
    }
  };

  return (
    <div className="p-4 ml-[300px]">
      <h1 className="text-xl font-bold mb-4">Workout Status</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter workout status (e.g. Pushups * 20 done)"
          value={newWorkout}
          onChange={(e) => setNewWorkout(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 ml-2 rounded-lg"
          onClick={handleAddWorkout}
        >
          Add
        </button>
      </div>
      <ul>
        {workoutStatus.map((status, index) => (
          <li key={index}>{status}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutStatusForm;
