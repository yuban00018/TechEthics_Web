import axios from "axios";
export function login(code,url){
  return axios({
            method: "POST",
            url: "/login",
            data: {
              code: code,
              url: url,
            },
          })
}
