import axios from "axios";
import { API_BASE_URL, DIVISIONS_END_POINT } from "../constants";


export const getDivision = (leagueName) => {
  const url = `${API_BASE_URL}/${DIVISIONS_END_POINT}/${leagueName}`
  return axios.get(url).then(res => {
    return(res.data)
  })
}

export const getAllLeagueDivision = (leagueNames) => {
  const apiCalls = leagueNames.map(leagueName => getDivision(leagueName))
  
  return Promise.all(apiCalls).then(responses => {
    const data = {}
    leagueNames.forEach((e, i) => data[e] = responses[i])
    return (data)
  })
}