import axios from "axios";

const BASE_URL = "http://localhost:8080/workoutplan";

class WorkOutPlan {
  createWorkOutPlan(userId, workoutPlan) {
    return axios.post(BASE_URL + "/" + userId, workoutPlan);
  }

  getAllPlans() {
    return axios.get(BASE_URL);
  }

  updateWorkOutPlan(userId, workoutPlan) {
    return axios.put(BASE_URL + "/" + userId, workoutPlan);
  }

  getPlanById(userId) {
    return axios.get(BASE_URL + "/" + userId);
  }

  deleteById(userId) {
    return axios.delete(BASE_URL + "/" + userId)
  }
}

export default new WorkOutPlan();
