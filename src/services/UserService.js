import axios from "axios";

const BASE_URL = "http://localhost:8080/users";
// const BASE_URL_2 = "http://localhost:8080/users/register";
const BASE_URL_FOLLOW = "http://localhost:8080/";

class UserService {
  getUser() {
    return axios.get(BASE_URL);
  }

  getUserById(userId) {
    return axios.get(BASE_URL + "/" + userId);
  }

  followUsers(userID, followerId) {
    return axios.post(BASE_URL + "/" + userID + "/follow/" + followerId);
  }

  saveUser(user) {
    return axios.post(BASE_URL + "/register", user);
  }

  loginUser(user) {
    return axios.post(BASE_URL + "/login", user);
  }

  getfollowers(userID) {
    return axios.get(BASE_URL_FOLLOW + "followers/" + userID);
  }

  checkFollowers(userID, followerId) {
    return axios.get(BASE_URL + "/" + userID + "/follower/" + followerId);
  }

  updateUser(user,userID){
    return axios.put(BASE_URL + "/" + userID ,user)
  }
}

export default new UserService();
