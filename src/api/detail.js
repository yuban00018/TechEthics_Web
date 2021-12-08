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

export function Confirm(id,state){
  return axios({
    method: "post",
    url: "/user/confirm",
    data: {
      applicationId: id,
      state: state,
    }
  })
}

export function otherManagement(id, ExecuteInfo, summary){
  return axios({
    method: "post",
    url: "/user/othersProcessManagement",
    data: {
      executeInfo: ExecuteInfo,
      summary: summary,
      id: id,
    },
  })
}

export function articleManagement(id, ExecuteInfo){
  return axios({
    method: "post",
    url: "/user/articleProcessManagement",
    data: {
      executeInfo: ExecuteInfo,
      id: id,
    },
  })
}

export function projectManagement(id, ExecuteInfo, summary){
  return axios({
    method: "post",
    url: "/user/projectProcessManagement",
    data: {
      executeInfo: ExecuteInfo,
      summary: summary,
      id: id,
    },
  })
}

export function Track(trackFile,id){
  return axios({
    method: "post",
    url: "/user/trackManagement",
    data: {
      trackFile: trackFile,
      id: id,
    },
  })
}

