import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import PostService from "../services/PostService";
import CommentPopup from "./CommentPopup ";
import UserService from "../services/UserService";
import LikeService from "../services/LikeService";

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedPostId, setLikedPostId] = useState(null);
  const [loggedIn, setLoggedIn] = useState({});
  const [refetch, setReFetch] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await PostService.getPost();
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          setLikedPosts(response.data.map(() => false));
        } else {
          console.error("Response data is not an array:", response);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setLoggedIn(JSON.parse(userData));
  }, []);
  console.log(loggedIn.id);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOpenPopup = (postId) => {
    setSelectedPostId(postId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPostId(null);
  };

  const handleLikeClick = async (index, pId) => {
    try {
      const updatedLikedPosts = [...likedPosts];
      updatedLikedPosts[index] = !updatedLikedPosts[index];
      setLikedPosts(updatedLikedPosts);
      setLikedPostId(pId);

      const response = await LikeService.setLike(loggedIn.id, pId);
      setReFetch(true);
      if (response) {
        console.log("res");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LikeService.getLikes();
        if (Array.isArray(response.data)) {
          setLikes(response.data);
          const updatedLikedPosts = posts.map((post) => {
            const likedByCurrentUser = response.data.some(
              (like) => like.postId === post.postId && like.userId === loggedIn.id
            );
            return likedByCurrentUser;
          });
          setLikedPosts(updatedLikedPosts);
        } else {
          console.error("Response data is not an array:", response);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log("liked post", likedPostId);
  return (
    <div>
      {posts?.map((post, index) => (
        <div
          className="mt-5 mb-16 ml-100 w-[800px] text-black rounded-xl bg-background space-y-10"
          key={index}
        >
          <div className="w-full sm:max-w-[800px] p-4 space-y-1 bg-gray-100 rounded-md m-auto">
            <div className="flex flex-col sm:flex-row items-center juc space-y-3 sm:space-y-0 sm:space-x-3">
              <img
                className="h-10 w-10 rounded-full"
                src={post.user.profilePictureUrl}
                alt=""
              />
              <h3 className="font-bold text-sm sm:text-base first-letter:capitalize">
                {post.user.firstName} {post.user.lastName}
              </h3>
            </div>
            <div>
              <h2>{post.content}</h2>
            </div>
            {post.mediaList && post.mediaList.length > 1 ? (
              <Slider {...sliderSettings}>
                {post.mediaList.map((media, index) => (
                  <img
                    className="p-2 max-h-[600px] w-full m-auto"
                    src={media}
                    alt="Gym"
                    key={index}
                  />
                ))}
              </Slider>
            ) : post.mediaList && post.mediaList.length === 1 ? (
              <img
                className="p-2 w-full h-[400px] m-auto"
                src={post.mediaList[0]}
                alt="Gym"
              />
            ) : null}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4  w-full justify-center">
                <button
                  className="w-1/2 flex justify-center p-3 border gap-5 cursor-pointer"
                  onClick={() => handleLikeClick(index, post.postId)}
                >
                  <img
                    className={`w-7 h-7 ${
                      likedPosts[index] ? "" : "filter invert opacity-0"
                    }`}
                    src="https://img.icons8.com/emoji/48/red-heart.png"
                    alt="red-heart"
                  />
                  Like
                </button>
                <div
                  className="w-1/2 flex flex-row justify-center gap-5 p-3 border cursor-pointer"
                  onClick={() => handleOpenPopup(post.postId)}
                >
                  <button>
                    <img
                      className="w-6 h-6 filter"
                      src="https://img.icons8.com/ios/50/000000/speech-bubble--v1.png"
                      alt="speech-bubble--v1"
                    />
                  </button>
                  Comment
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showPopup && (
        <CommentPopup postId={selectedPostId} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Post;
