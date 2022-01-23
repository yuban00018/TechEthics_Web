<template>
  <div class="bg">
    <div>
      <el-form
        ref="form"
        :model="applyForm"
        label-width="200px"
      >
        <br>
        <!--项目名(中文)-->
        <el-row>
          <el-form-item
            label="项目名(中文)："
            class="consent_apply"
            id="apply_titleChi"
          >
            <el-col :span="12">
              <el-input v-model="applyForm.title_chi"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--项目名(英文)-->
        <el-row>
          <el-form-item
            label="项目名(英文)："
            class="consent_apply"
            id="apply_titleEng"
          >
            <el-col :span="12">
              <el-input v-model="applyForm.title_eng"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--申请人姓名-->
        <el-row>
          <el-form-item
            label="申请人姓名："
            class="consent_apply"
            id="apply_applicant"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.applicant"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--职称/学位-->
        <el-row>
          <el-form-item
            label="职称/学位："
            class="consent_apply"
            id="apply_applicant"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.degree"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--邮箱-->
        <el-row>
          <el-form-item
            label="邮箱："
            class="consent_apply"
            id="apply_email"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.email"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--院系部门(中文)-->
        <el-row>
          <el-form-item
            label="院系部门(中文)："
            class="consent_apply"
            id="apply_departmentChi"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.department_chi"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--院系部分(英文)-->
        <el-row>
          <el-form-item
            label="院系部分(英文)："
            class="consent_apply"
            id="apply_departmentEng"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.department_eng"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--项目申请日期-->
        <el-row>
          <el-form-item label="项目申请日期（具体到月）" id="apply_applicationDate_label" class="consent_apply">
            <el-col :span="5">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="applyForm.application_date"
                style="width: 100%"
                id="apply_applicationDate"
                class="consent_apply"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <!--主要内容-->
        <el-row>
          <el-form-item
            label="主要内容："
            prop="desc"
            class="consent_apply"
            id="apply_program_project_abstract"
          >
            <el-col :span="12">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                v-model="applyForm.content"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--申报日期-->
        <el-row>
          <el-form-item label="申报日期（具体到月）" id="apply_consentDate_label" class="consent_apply">
            <el-col :span="5">
              <el-date-picker
                type="date"
                placeholder="当前日期"
                v-model="applyForm.consent_date"
                style="width: 100%"
                id="apply_consentDate"
                class="consent_apply"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <!--主任-->
        <el-row>
          <el-form-item
            label="主任："
            class="consent_apply"
            id="apply_chairman"
          >
            <el-col :span="6">
              <el-input v-model="applyForm.chairman"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-button type="success" @click="Submit" style="position:absolute;left: 21%;" >
            提交同意书
          </el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {submit} from "../../../api/consent";
import {getProjectInfoAPI} from "../../../api/applications";

export default {
  name: "consent_program_test",
  mounted() {
    this.confirm_notice();
    this.getProjectInfo();
  },
  watch: {
  },
  computed: {
  },
  data() {
    return {
      applyForm: {
        title_chi: "",
        title_eng: "",
        applicant: "",
        degree: "",
        email: "",
        department_chi: "",
        department_eng: "",
        application_date: "",
        content: "",
        consent_date: "",
        chairman: "",
      },
      status: -1,
      memberResList: [],
    };
  },
  methods: {
    Submit() {
      let application_id = Number(this.$route.query.application_id);
      // console.log(this.applyForm)
      // console.log(application_id)
      submit(this.applyForm, application_id)
      .then((res) => {
        let mark = 1;
        if (this.status !== 10)
          mark = 0;
        else {
          for (let tmp in this.memberResList)
            if (this.memberResList[tmp].state !== 1)
              mark = -1;
        }
        if (!mark)
          this.$message("当前项目进度有误！");
        else if (mark === -1)
          this.$message("当前有委员没有批准！");
        else {
          if (res.data.code === 200) {
            this.$message({
              message: "提交成功",
              type: "success",
            });
          } else {
            // console.log(application_id);
            // console.log("寄了");
            this.$message.error(res.data.message);
          }
        }
      }).catch((err) => {
        this.$message.error(err);
      });
      this.$router.replace("../applications").catch((err) => {
        this.$message.error(err);
      });
    },
    confirm_notice() {
      let data = ['您当前正在填写审查同意书！'];
      let newDatas = [];
      const h = this.$createElement;
      for (let i in data) {
        newDatas.push(h('p', null, data[i]));
      }
      this.$alert(h('div', null, newDatas), '注意事项', {
        showClose: false,
        confirmButtonText: '同意',
        callback: action => {
          this.$message({
            type: 'info',
            message: `您已知晓`
          });
        }
      });
    },
    getProjectInfo() {
      let application_id = Number(this.$route.query.application_id);
      getProjectInfoAPI(application_id)
      .then(res => {
        this.status = res.data.data.status;
        this.memberResList = res.data.data().memberResList;
      })
    }
  }
}
</script>
<style>
.consent_apply {
  margin-left: 5%;
}
</style>
