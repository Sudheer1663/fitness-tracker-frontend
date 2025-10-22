import axios from "axios";

const BASE_URL = "http://localhost:8080/api/fitnessgoal";

export const getAllFitnessGoals = () => axios.get(`${BASE_URL}/all`).then(res => res.data);
export const getFitnessGoalsByGoal = (goal) => axios.get(`${BASE_URL}/goal/${goal}`).then(res => res.data);
     