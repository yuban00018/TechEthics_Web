import axios from "axios";

export function getProgressList(){
  return axios({
    method:'GET',
    url:"/const/progressList",
  })
}
