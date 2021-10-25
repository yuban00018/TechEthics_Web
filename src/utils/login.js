import request from "@/utils/request";
import axios from "axios";
export function login(password,userId){
  return request({
            method: "POST",
            url: "/api/login",
            data: {
              password: password,
              userId: userId,
            },
          })
}
