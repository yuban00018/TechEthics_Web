import axios from "axios";
export function getMemberList(){
  return axios({
    method: "get",
    url: "/chairman/memberList",
    data: {},
  })
}
