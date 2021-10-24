import request from '@/utils/request.js'

export function submit(form) {
  return request({
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
