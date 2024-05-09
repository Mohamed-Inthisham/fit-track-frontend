import axios from "axios";

const BASE_URL = "http://localhost:8080/api/workoutPlans";
const BASE_URL_2 = "http://localhost:8080/api/workoutPlans/template/";
const BASE_URL_STATUS = "http://localhost:8080/status";

class WorkoutService {
  saveTemplate(workout, userId) {
    return axios.post(BASE_URL + "/template/" + userId, workout);
  }

  getTemplate(userId) {
    return axios.get(BASE_URL_2 + userId);
  }

  postWorkOutPlan(userId, workout) {
    return axios.post(BASE_URL_STATUS + "/" + userId, workout);
  }

  getAllStatus() {
    return axios.get(BASE_URL_STATUS);
  }

  getOneStatus(userId) {
    return axios.get(BASE_URL_STATUS + "/" + userId);
  }

  updateStatus(userId, status) {
    return axios.put(BASE_URL_STATUS + "/" + userId, status);
  }

  deleteById(statusId) {
    return axios.delete(BASE_URL_STATUS + "/" + statusId);
  }
}

export default new WorkoutService();
