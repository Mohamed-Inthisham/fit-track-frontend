import axios from "axios";

const BASE_URL = "http://localhost:8080/meals";

class MealPlanService {
  saveMealPlan(userId, mealPlan) {
    return axios.post(BASE_URL + "/" + userId, mealPlan);
  }

  getByUserId(userId) {
    return axios.get(BASE_URL + "/" + userId);
  }

  getAll() {
    return axios.get(BASE_URL);
  }

  updatePlan(userId, mealPlan) {
    return axios.put(BASE_URL + "/" + userId, mealPlan);
  }

  getMealplanById(mealId) {
    return axios.get(BASE_URL + "/meal/" + mealId);
  }

  deleteById(mealId) {
    return axios.delete(BASE_URL + "/" + mealId)
  }
}

export default new MealPlanService();
