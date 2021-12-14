import axios from "axios";

export function LoadList(type){
  if(type === "secretary"){
    return axios({
      url: "/secretary/auditSet",
      method: "get"
    })
  } else if(type === "chairman"){
    return axios({
      url: "/chairman/auditSet",
      method: "get",
    })
  } else if(type === "member"){
    return axios({
      url: "/member/auditSet",
      method: "get",
    })
  } else if(type === "leader"){
    return axios({
      url: "/leader/auditSet",
      method: "get"
    })
  }
}

export function Approve(type,id){
  if(type === "secretary"){
    return axios({
      method: "post",
      url: "/secretary/approval",
      data: {
        applicationId: id,
        rejectReason: "",
        state: 1
      }
    })
  } else if(type === "member"){
    return axios({
      method: "post",
      url: "/member/approval",
      data: {
        applicationId: id,
        rejectReason: "",
        state: 1,
      }
    })
  } else if(type === "leader"){
    return axios({
      method: "post",
      url: "/leader/approval",
      data: {
        applicationId: id,
        rejectReason: "",
        state: 1
      }
    })
  }
}

export function Reject(type,id,reason){
  if(type === "secretary"){
    return axios({
      method: "post",
      url: "/secretary/approval",
      data: {
        applicationId: id,
        rejectReason: reason,
        state: 0
      }
    })
  } else if(type === "member"){
    return axios({
      method: "post",
      url: "/member/approval",
      data: {
        applicationId: id,
        rejectReason: reason,
        state: 0,
      }
    })
  } else if(type === "leader"){
    return axios({
      method: "post",
      url: "/leader/approval",
      data: {
        applicationId: id,
        rejectReason: reason,
        state: 0
      }
    })
  } else if(type === "chairman"){
    return axios({
      method: "post",
      url: "/chairman/approvalTrack",
      data: {
        applicationId: id,
        rejectReason: reason,
        state: 0,
      }
    })
  }
}

export function Assign(id,member_list){
  return axios({
    method: "post",
    url: "/chairman/assign",
    data: {
      applicationId: id,
      userIdList: member_list,
    },
  })
}