import axios from "axios";

const BASE_URL = "http://localhost:8080/users/";

class LikeService {
  setLike(userId, postId) {
    return axios.post(BASE_URL + userId + "/post/" + postId);
  }

  getLikes(){
    return axios.get(BASE_URL + "likes" )
  }
  
}
export default new LikeService();
