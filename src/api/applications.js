import axios from "axios"

export function getList() {
  return axios({
    url:'/user/applicationList',
    method:'GET',
  })
}
// 通过当前表格行信息获取当前申请的所有信息
export function getDetail(row){
  // console.log("wqltest", row);
  return axios({
    method: "GET",
    url: "/user/applicationInfo?applicationId=" + row.id,
    data: {},
  })
}
