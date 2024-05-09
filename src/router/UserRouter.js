import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Follow from "../components/Follow";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Post from "../pages/Post";
import AllUsers from "../pages/AllUsers";
import CreatePost from "../pages/UploadVedio";
import Comments from "../pages/Comments";
import UploadVedio from "../pages/UploadVedio";
import UploadPhoto from "../pages/UploadPhoto";
import Profile from "../pages/Profile";

import FriendProfile from "../pages/FriendProfile";
import CreateStatus from "../pages/CreateStatus";
import MealPlanPage from "../pages/MealPlan";
import CreateWorkouPlan from "../pages/CreateWorkouPlan";
import CreateWorkoutForm from "../pages/CreateworkoutForm";
import EditUploadedPost from "../pages/EditUploadedPost";
import MealPlanDisplay from "../pages/MealPlanDisplay";
import MealPlanEdit from "../pages/EditMealPlan";
import StatusEdit from "../pages/EditStatus";
import EditWorkOutPlan from "../pages/EditWorkOutPlan";
import Workout from "../pages/Workout"

const UserRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/coments" element={<Comments />} />
          <Route path="/uploadVedio" element={<UploadVedio />} />
          <Route path="/uploadPhoto" element={<UploadPhoto />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/status" element={<CreateStatus />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/mealplan" element={<MealPlanPage />} />
          <Route path="/workoutplan" element={<CreateWorkouPlan />} />
          <Route path="/workoutform" element={<CreateWorkoutForm />} />
          <Route path="/editpost" element={<EditUploadedPost />} />
          <Route path="/friend/:id" element={<FriendProfile />} />
          <Route path="/mealplandisplay" element={<MealPlanDisplay />} />
          <Route path="/mealplan/:id" element={<MealPlanEdit />} />
          <Route path="/status/:id" element={<StatusEdit />} />
          <Route path="/workoutplan/:id" element={<EditWorkOutPlan />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default UserRouter;
