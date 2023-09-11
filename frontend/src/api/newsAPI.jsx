import axios from "axios";
import { API_BASE_URL, NEWS_END_POINT } from "../constants";


export const getNews = () => {
  const url = `${API_BASE_URL}/${NEWS_END_POINT}/`
  return axios.get(url).then(res => {
    return(res.data)
  })
}