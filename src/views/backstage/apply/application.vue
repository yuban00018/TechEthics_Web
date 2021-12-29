<template>
  <div class="bg">
    <div>
      <el-form
        ref="form"
        :model="form"
        label-width="160px"
      >
        <br>
        <!--项目单位-->
        <el-row>
          <el-form-item
            label="项目单位"
            class="apply"
            id="apply_program_institution"
          >
            <el-col :span="6">
              <el-input v-model="form.institution"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--项目名称-->
        <el-row>
          <el-form-item
            label="项目名称"
            class="apply"
            id="apply_program_name"
          >
            <el-col :span="12">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--申请类型-->
        <el-row>
          <el-form-item
            label="项目类型"
            id="application_type"
          >
            <el-checkbox-group
              style="text-align: left"
              v-model="application_type"
              :max="1">
              <el-checkbox border v-for="type in applicationType" :label="type" :key="type">{{ type }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!--起止日期-->
        <el-row>
          <el-form-item label="起止日期（具体到月）" id="apply_program_timeLabel01">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="form.time1"
                style="width: 100%"
                id="apply_program_time1"
                class="apply"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" id="apply_program_timeCol01"
            > 到
            </el-col
            >
            <el-col :span="8">
              <el-date-picker
                placeholder="结束日期"
                v-model="form.time2"
                style="width: 100%"
                id="apply_program_time2"
                class="apply"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <!--项目类别-->
        <el-row>
          <el-form-item label="项目类别" style="text-align: left">
            <el-radio-group v-model="watch_project_type">
              <el-col :span="20">
                <el-radio border label="A.新药物临床实验" class="apply"></el-radio>
                <el-radio border label="B.新器械临床实验" class="apply"></el-radio>
                <el-radio border label="C.新技术应用" class="apply"></el-radio>
                <el-radio border label="D.人体标本收集" class="apply"></el-radio>
                <el-radio label="E.其他（请注明）" class="apply"></el-radio>
              </el-col>
              <el-col :span="4">
                <el-input
                  @input="change($event)"
                  :disabled="disable_type_input"
                  v-model="project_typeE"
                  id="apply_program_programInput"
                ></el-input>
              </el-col>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <!--办公电话-->
        <el-row>
          <el-form-item
            label="办公电话"
            class="apply"
            id="apply_program_office_phone"
          >
            <el-col :span="6">
              <el-input v-model="form.office_phone"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--传真-->
        <el-row>
          <el-form-item label="传真" class="apply" id="apply_program_fax">
            <el-col :span="6">
              <el-input v-model="form.fax"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--手机-->
        <el-row>
          <el-form-item label="手机" class="apply" id="apply_program_phone">
            <el-col :span="6">
              <el-input v-model="form.phone"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--邮箱-->
        <el-row>
          <el-form-item label="电子邮箱" class="apply" id="apply_program_email">
            <el-col :span="6">
              <el-input v-model="form.email"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--研究方向-->
        <el-row>
          <el-form-item
            label="目前主要研究方向"
            class="apply"
            id="apply_program_project_direction"
          >
            <el-col :span="12">
              <el-input v-model="form.project_direction"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--经费来源-->
        <el-row>
          <el-form-item label="经费来源">
            <el-col :span="12">
              <el-checkbox-group v-model="fundingSourceList" :max="1" style="text-align: left">
                <el-checkbox border label="政府"></el-checkbox>
                <el-checkbox border label="基金会"></el-checkbox>
                <el-checkbox border label="公司"></el-checkbox>
                <el-checkbox border label="国际组织"></el-checkbox>
                <el-checkbox border label="其他"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
        <!--研究摘要-->
        <el-row>
          <el-form-item
            label="研究内容摘要："
            prop="desc"
            class="apply"
            id="apply_program_project_abstract"
          >
            <el-col :span="12">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                v-model="form.project_abstract"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!--附件上传-->
        <el-row>
          <el-form-item label="附件上传">
            <el-col :span="4">
              <el-upload
                ref="uploadPDF"
                class="upload-demo"
                action="/api/file/upload"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-error="handleError"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                multiple
                :limit="3"
                accept=".pdf"
                :on-exceed="handleExceed"
                :file-list="fileList"
                style="text-align: left"
              >
                <div v-if="this.form.application_id==-1" slot="tip" class="el-upload__tip">最多只能上传3份PDF文件</div>
                <div v-if="this.form.application_id!==-1" slot="tip" class="el-upload__tip">新上传的材料将会覆盖原有的申请材料</div>
                <el-button type="primary">项目附件</el-button>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <el-button v-if="this.form.application_id===-1" type="success" @click="Submit"
                 style="position:absolute;left: 160px;"
      >提交申请
      </el-button>
      <el-button v-if="this.form.application_id!==-1" type="warning" @click="Update"
                 style="position:absolute;left: 160px;"
      >修改并提交
      </el-button>
    </div>
  </div>
</template>

<script>
import {submit, update} from "@/api/application";
import axios from "axios";
import {Preview} from "@/api/download";

export default {
  name: "apply_program_test",
  mounted() {
    this.confirm_notice()
    this.form.application_id = Number(this.$route.query.applicationId);
    if (isNaN(Number(this.$route.query.applicationId))) {
      this.form.application_id = -1;
    } else {
      this.getProjectInfo();
    }
  },
  watch: {
    Watch_project_type(val) {
      switch (val) {
        case 'A.新药物临床实验':
          this.form.project_type = '新药物临床实验';
          this.disable_type_input = true;
          this.project_typeE = "";
          break;
        case 'B.新器械临床实验':
          this.form.project_type = '新器械临床实验';
          this.disable_type_input = true;
          this.project_typeE = "";
          break;
        case 'C.新技术应用':
          this.form.project_type = '新技术应用';
          this.disable_type_input = true;
          this.project_typeE = "";
          break;
        case 'D.人体标本收集':
          this.form.project_type = '人体标本收集';
          this.disable_type_input = true;
          this.project_typeE = "";
          break;
        case 'E.其他（请注明）':
          this.form.project_type = this.project_typeE;
          this.disable_type_input = false;
          break;
      }
    }
  },
  computed: {
    headers() {
      return {
        Authorization: localStorage.getItem("TokenKey"),
      }
    },
    Watch_project_type() {
      return this.watch_project_type;
    }
  },
  data() {
    return {
      applicationType: ['文章', '项目', '其他'],
      application_type: [],
      disable_type_input: true,
      project_typeE: "",
      watch_project_type: "",
      fileList: [],
      fundingSourceList: [],
      form: {
        institution: localStorage.getItem("institution"),
        name: "",
        time1: "",
        time2: "",
        office_phone: localStorage.getItem("office_phone"),
        fax: localStorage.getItem("fax"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
        project_direction: "",
        project_abstract: "",
        type: 0,//这个是funding source但我不知道为什么被命名为type了，请千万注意！！！
        project_type: "",
        desc: "",
        apply: -1,
        application_id: -1,
        application_pdfs: [],
      }
    };
  },
  methods: {
    handleError() {
      this.$message.error(
        '上传失败，请检查网络'
      );
    },
    getProjectInfo() {
      axios({
        method: "get",
        url: "/user/applicationInfo?applicationId=" + this.form.application_id,
        data: {},
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.form.institution = res.data.data.institution;
            this.form.name = res.data.data.name;
            this.form.project_direction = res.data.data.direction;
            this.form.project_abstract = res.data.data.projectAbstract;
            this.form.application_pdfs.push(res.data.data.applicationPdf1);
            this.form.application_pdfs.push(res.data.data.applicationPdf2);
            this.form.application_pdfs.push(res.data.data.applicationPdf3);
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    confirm_notice() {
      let data = ['1、 本部伦理审查所有环节均不收取任何费用', '2、 本部伦理审查范围：', '（1） 拟开展的实验项目（项目申报阶段）;'
        , '3、 完成整个审查流程一般需要10个工作日，如信息不完整或申请表填写问题较多时，审查时间将会延长，因此请申请人务必按要求认真准备申请材料，如有问题请及时邮件沟通。',
        '4、 附件要求：', '（1） 按申请表内容提供有关附件；', '（2） 根据审查意见提供其他有关材料；'];
      let newDatas = [];
      const h = this.$createElement;
      for (let i in data) {
        newDatas.push(h('p', null, data[i]));
      }
      this.$alert(h('div', null, newDatas), '申请须知', {
        showClose: false,
        confirmButtonText: '同意',
        callback: action => {
          this.$message({
            type: 'info',
            message: `您已同意须知`
          });
        }
      });
    },
    //文本改变事件
    change(event) {
      this.$forceUpdate();
      this.form.project_type = this.project_typeE;
    },
    //信息本地保存
    saveInfo() {
      localStorage.setItem("email", this.form.email);
      localStorage.setItem("fax", this.form.fax);
      localStorage.setItem("id", this.form.id);
      localStorage.setItem("institution", this.form.institution);
      localStorage.setItem("name", this.form.name);
      localStorage.setItem("office_phone", this.form.office_phone);
      localStorage.setItem("phone", this.form.phone);
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 400) {
        this.$refs['uploadPDF'].clearFiles();
        return this.$message.error(response.message);
      }
    },
    handleRemove(file, fileList) {
      return this.$message.info("已移除" + file.name);
    },
    handlePreview(file) {
      Preview(file.response.data);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    Submit: function () {
      this.saveInfo();
      if (this.$refs['uploadPDF'].uploadFiles.length === 0) {
        this.$message.error('您忘记上传文件了!');
        return;
      }
      this.$refs['uploadPDF'].uploadFiles.forEach(file => {
        this.form.application_pdfs.push(file.response.data)
      })
      while (this.form.application_pdfs.length < 3) {
        this.form.application_pdfs.push("")
      }
      switch (this.fundingSourceList[0]) {
        case '政府':
          this.form.type = 0
          break;
        case '基金会':
          this.form.type = 1
          break;
        case '公司':
          this.form.type = 2
          break;
        case '国际组织':
          this.form.type = 3
          break;
        case '其他':
          this.form.type = 4
          break;
      }
      switch (this.application_type[0]) {
        case '文章':
          this.form.apply = 0
          break;
        case '项目':
          this.form.apply = 1
          break;
        case '其他':
          this.form.apply = 2
          break;
      }
      submit(this.form).then(res => {
        if (res.data.code === 200) {
          this.saveInfo();
          this.$message({
            message: '成功，请在我的申请中提交项目',
            type: 'success'
          });
          this.$router.replace("/backstage/applications").catch((err) => {
            this.$message.error(err);
          });
        } else this.$message.error(res.data.message);
      })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    Update: function () {
      this.saveInfo();
      if (this.$refs['uploadPDF'].uploadFiles.length === 0) {
        this.$message.info('您没有更新附件！');
      } else {
        this.$message.info('您上传的新附件已经覆盖了旧附件！');
        this.form.application_pdfs = []
        this.$refs['uploadPDF'].uploadFiles.forEach(file => {
          this.form.application_pdfs.push(file.response.data)
        })
      }
      while (this.form.application_pdfs.length < 3) {
        this.form.application_pdfs.push("")
      }
      switch (this.fundingSourceList[0]) {
        case '政府':
          this.form.type = 0
          break;
        case '基金会':
          this.form.type = 1
          break;
        case '公司':
          this.form.type = 2
          break;
        case '国际组织':
          this.form.type = 3
          break;
        case '其他':
          this.form.type = 4
          break;
      }
      switch (this.application_type[0]) {
        case '文章':
          this.form.apply = 0
          break;
        case '项目':
          this.form.apply = 1
          break;
        case '其他':
          this.form.apply = 2
          break;
      }
      update(this.form).then(res => {
        if (res.data.code === 200) {
          this.saveInfo();
          this.$message({
            message: '修改成功，请在我的申请中提交项目',
            type: 'success'
          });
          this.$router.replace("/backstage/applications").catch((err) => {
            this.$message.error(err);
          });
        } else this.$message.error(res.data.message);
      })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  }
}
</script>

<style>
</style>
