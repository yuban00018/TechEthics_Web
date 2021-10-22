import request from '@/utils/request.js'

export function getList() {
  return request({
    url:'/user/applicationList',
    method:'GET',
  })
}
