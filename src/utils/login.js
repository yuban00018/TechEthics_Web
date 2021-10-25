import request from "@/utils/request";
import axios from "axios";
export function login(password,userId){
  return axios({
            method: "POST",
            url: "/login",
            data: {
              password: password,
              userId: userId,
            },
          })
}
