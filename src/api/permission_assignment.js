import axios from "axios";

export function getUserList(row){
  return axios({
    method: "GET",
    url: "/chairman/userList",
    data: {},
  })
}

export function assignIdentity(row,identity){
  return axios({
    method: "POST",
    url: "/chairman/assignIdentity",
    data: {
      userId:row.userId,
      identity:identity
    },
  })
}

