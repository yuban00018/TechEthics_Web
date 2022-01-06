import axios from "axios";

// 获取所有的进程列表
export function getProgressList(){
  return axios({
    method:'GET',
    url:"/const/progressList",
  })
}
