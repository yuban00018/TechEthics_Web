import axios from "axios"

export function Submit(id){
  return axios({
    method: "get",
    url: "/user/submitApplicationDemo?applicationId=" + id,
    data: {},
  })
}

export function Delete(id){
  return axios({
    method: "get",
    url: "/user/deleteApplicationDemo?applicationId=" + id,
    data: {},
  })
}
