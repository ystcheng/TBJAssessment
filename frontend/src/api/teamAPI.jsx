import axios from "axios";
import { API_BASE_URL, TEAM_END_POINT } from "../constants";

export const getTeamRoster = (teamID) => {
  const option = "roster"
  const url = `${API_BASE_URL}/${TEAM_END_POINT}/${option}/${teamID}`
  return axios.get(url).then(res => res.data)
}