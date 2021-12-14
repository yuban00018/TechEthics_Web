import axios from "axios"

export function getList() {
  return axios({
    url:'/user/applicationList',
    method:'GET',
  })
}
export function getDetail(row){
  return axios({
    method: "GET",
    url: "/user/applicationInfo?applicationId=" + row.id,
    data: {},
  })
}
