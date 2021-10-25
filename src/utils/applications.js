import request from '@/utils/request.js'
import axios from "axios";

export function getList() {
  return request({
    url:'/user/applicationList',
    method:'GET',
  })
}
export function getDetail(row){
  return request({
    method: "GET",
    url: "/user/applicationInfo?applicationId=" + row.id,
    data: {},
  })
}
