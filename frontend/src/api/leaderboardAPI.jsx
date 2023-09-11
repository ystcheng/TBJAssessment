import axios from 'axios';
import { API_BASE_URL, LEADER_BOARD_END_POINT } from '../constants';


export const getLeaderboard = (type) => {
  const url = `${API_BASE_URL}/${LEADER_BOARD_END_POINT}/${type}`

  return axios.get(url).then(res => {
    return(res.data)
  })
}

export const getAllLeaderboard = (leaderboardTypes) => {
  const apiCalls = leaderboardTypes.map(type => getLeaderboard(type))

  return Promise.all(apiCalls).then(responses => {
    const data = {}
    leaderboardTypes.forEach((e, i) => data[e] = responses[i])

    return data
  })
}