import axios from "axios"

export function submit(form) {
  return axios({
    url:'/user/createApplicationForProjectDemo',
    method:'post',
    data:{
      application_file: form.application_file,
      application_type: form.apply,
      email: form.email,
      fax: form.fax,
      funding_source: form.type,
      id: 0,
      institution: form.institution,
      name: form.name,
      office_phone: parseInt(form.office_phone),
      phone: parseInt(form.phone),
      project_abstract: form.project_abstract,
      project_direction: form.project_direction,
      project_type: form.project_type,
      schedule_time: form.time1 + "-" + form.time2,
      user_id: parseInt(localStorage.getItem("userId"))
    }
  })
}

export function update(form) {
  return axios({
    method: "post",
    url: "/user/updateApplicationDemoForProject",
    data: {
      application_file: form.application_file,
      application_type: form.apply, //项目类型可修改，待增加按钮
      email: form.email,
      fax: form.fax,
      funding_source: form.type,
      id: form.application_id,
      institution: form.institution,
      name: form.name,
      office_phone: parseInt(form.office_phone),
      phone: parseInt(form.phone),
      project_abstract: form.project_abstract,
      project_direction: form.project_direction,
      project_type: form.project_type,
      schedule_time: form.time1 + "-" + form.time2,
      user_id: parseInt(localStorage.getItem("userId")),
    },
  })
}
