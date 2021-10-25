import request from '@/utils/request.js'
import axios from "axios";

export function getList() {
  return request({
    url:'/api/user/applicationList',
    method:'GET',
  })
}
export function getDetail(row){
  return request({
    method: "GET",
    url: "/api/user/applicationInfo?applicationId=" + row.id,
    data: {},
  })
}
