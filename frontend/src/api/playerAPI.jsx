import axios from "axios";
import { API_BASE_URL, PLAYER_END_POINT } from "../constants";

const getHitterHistory = (playerID) => {
  const type = "hitting"
  const url = `${API_BASE_URL}/${PLAYER_END_POINT}/${playerID}/${type}`

  return axios.get(url).then(res => res.data)
}

const getPitcherHistory = (playerID) => {
  const type = "pitching"
  const url = `${API_BASE_URL}/${PLAYER_END_POINT}/${playerID}/${type}`

  return axios.get(url).then(res => res.data)
}

export const getPlayerHistory = (playerID, playerType) => {
  if (playerType === 'hitting')
    return getHitterHistory(playerID)
  else
    return getPitcherHistory(playerID) 
}