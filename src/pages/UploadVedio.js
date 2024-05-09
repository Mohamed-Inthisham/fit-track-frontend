import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import PostService from "../services/PostService";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../config/Config";
import toast from "react-hot-toast";

const storage = getStorage(app);

const CreatePost = () => {
  const [loggedIn, setLoggedIn] = useState({});
  const [post, setPost] = useState({
    content: "",
    mediaList: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // fetchUser();
    }
    setLoggedIn(JSON.parse(userData));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (post.content.trim() === "") {
      toast.error("Post content cannot be empty");
      return;
    }

    const files = e.target.media.files;
    if (files.length === 0) {
      toast.error("Please select a video file");
      return;
    }

    const videoFile = files[0];
    const videoRef = ref(storage, `/videos/${videoFile.name}`);
    await uploadBytes(videoRef, videoFile);
    const videoUrl = await getDownloadURL(videoRef);

    const postData = {
      ...post,
      mediaList: [videoUrl], // Storing video URL as mediaList
    };

    PostService.savePost(postData, loggedIn.id)
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <div className="">
      <div className="flex ">
        <SideBar />
        <div className="m-auto mt-24 bg-gray-300 mr-[400px]">
          <div className="border shadow-xl p-8 rounded-lg w-[800px]">
            <h2 className="text-center text-2xl font-bold mb-4">
              Create a New Post(Vedio)
            </h2>
            <form className="space-y-9" onSubmit={handleSubmit}>
              <div className=" flex flex-row space-x-4">
                <img
                  src={loggedIn.profilePictureUrl}
                  className=" w-[50px] h-[50px] rounded-full"
                />
                <p>
                  {loggedIn.firstName} {loggedIn.lastName}
                </p>
              </div>
              <div className="space-y-3">
                <label htmlFor="caption">Caption:</label>
                <textarea
                  id="caption"
                  name="content"
                  onChange={(e) => handleChange(e)}
                  className="w-full border-none p-2"
                />
              </div>
              <div className="flex flex-col space-y-6">
                <label htmlFor="media">Upload video:</label>
                <input
                  type="file"
                  id="media"
                  accept="video/*" // Accept video files
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
