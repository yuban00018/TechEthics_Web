import axios from "axios"
import {IntegerObject} from "../../static/plugins/pdfjs/build/pdf.worker";

export function submit(form, application_id) {
  // console.log("api: ", application_id);
  // console.log(localStorage.getItem("userId"))
  // console.log(typeof localStorage.getItem("userId"))
  return axios({
    url:'/user/submitConsent',
    method:'post',
    data:{
      id: 0,
      user_id: localStorage.getItem("userId"),
      application_id: application_id,
      title_chi: form.title_chi,
      title_eng: form.title_eng,
      applicant: form.applicant,
      degree: form.degree,
      email: form.email,
      department_chi: form.department_chi,
      department_eng: form.department_eng,
      application_date: form.application_date,
      content: form.content,
      consent_date: form.consent_date,
      chairman: form.chairman,
    }
  })
}
