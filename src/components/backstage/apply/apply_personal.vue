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
          <el-form-item label="项目类别">
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
          <el-form-item label="经费来源(单选)">
            <el-col :span="12">
              <el-checkbox-group v-model="form.temp">
                <el-checkbox
                  label="政府"
                  name="temp"
                  class="apply"
                  @click="fundingSource(0)"
                ></el-checkbox>
                <el-checkbox
                  label="基金会"
                  name="temp"
                  class="apply"
                  @click="fundingSource(1)"
                ></el-checkbox>
                <el-checkbox
                  label="公司"
                  name="temp"
                  class="apply"
                  @click="fundingSource(2)"
                ></el-checkbox>
                <el-checkbox
                  label="国际组织"
                  name="temp"
                  class="apply"
                  @click="fundingSource(3)"
                ></el-checkbox>
                <el-checkbox
                  label="其他"
                  name="temp"
                  class="apply"
                  @click="fundingSource(4)"
                ></el-checkbox>
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
                class="upload-demo"
                action="/api/file/upload"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                multiple
                :limit="1"
                accept=".rar,.zip,.7z"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button type="primary">项目附件(压缩包)</el-button>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <el-button type="success" id="submitButton" @click="Submit"
      >提交申请
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "apply_program_test",
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
        Authorization: localStorage.getItem("token"),
      }
    },
    Watch_project_type() {
      return this.watch_project_type;
    }
  },
  data() {
    return {
      fileList: [],
      disable_type_input: true,
      project_typeE: "",
      watch_project_type: "",
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
        temp: [],
        project_type: "",
        desc: "",
        application_file: ""
      },
    };
  },
  methods: {
    //确认申请须知
    confirm_notice: function () {
      let data = ['1、 本部伦理审查所有环节均不收取任何费用', '2、 本部伦理审查范围：', '（1） 拟开展的实验项目（项目申报阶段）;'
        , '3、 完成整个审查流程一般需要10个工作日，如信息不完整或申请表填写问题较多时，审查时间将会延长，因此请申请人务必按要求认真准备申请材料，如有问题请及时邮件沟通。',
        '4、 附件要求：', '（1） 按申请表内容提供有关附件；', '（2） 根据审查意见提供其他有关材料；'];
      //2.新建newDatas数组
      let newDatas = [];
      const h = this.$createElement;
      //3.通过循环data数组，调用h方法，将每项值传给h,h('标签名',样式,具体内容)
      for (let i in data) {
        //4.将data数据push进newDatas数组中
        newDatas.push(h('p', null, data[i]));
      }
      ;
      this.$alert(h('div', null, newDatas), '申请须知', {
        showClose: false,
        confirmButtonText: '同意',
        callback: action => {
          this.$message({
            type: 'info',
            message: `您正在进行文章申请`
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
      //console.log(response.data);
      this.form.application_file = response.data;
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
      this.form.application_file = null;
    },
    handlePreview(file) {
      console.log(file.name);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    clickEvent01: function () {
      var temp = document.getElementById("apply_program_first");
      temp.style.display = "none";
      temp = document.getElementById("apply_program_next");
      temp.style.display = "inline";
    },
    onSubmit() {
      console.log("submit!");
    },
    Submit: function () {
      this.saveInfo();
      if (this.form.application_file == "") {
        this.$message.error('您忘记上传文件了!');
        return;
      }
      switch (this.form.temp[0]) {
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
      axios({
        method: "post",
        url: "/user/createApplicationForProjectDemo",
        data: {
          application_file: this.form.application_file,
          application_type: 0,
          email: this.form.email,
          fax: this.form.fax,
          funding_source: this.form.type,
          id: 0,
          institution: this.form.institution,
          name: this.form.name,
          office_phone: parseInt(this.form.office_phone),
          phone: parseInt(this.form.phone),
          project_abstract: this.form.project_abstract,
          project_direction: this.form.project_direction,
          project_type: this.form.project_type,
          schedule_time: this.form.time1 + "-" + this.form.time2,
          user_id: parseInt(localStorage.getItem("userId")),
        },
      })
        .then(res => {
          if (res.data.code == 200) {
            this.saveInfo();
            this.$message({
              message: '成功，请在我的申请中提交项目',
              type: 'success'
            });
            this.$router.replace("/backstage/myapplications").catch((err) => {
              err;
            });
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    fundingSource: function (choice) {
      this.form.type = choice;
    },
  },
  mounted() {
    this.confirm_notice();
  },
}
</script>

<style>
::v-deep .el-radio{
  display: block;
  line-height: 23px;
  white-space: normal;
  margin-right: 0;
}
.bg {
  background-image: linear-gradient(#ffffff, #ffffff);
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0px;
  right: 0px;
  overflow: auto;
}
#submitButton {
  position: absolute;
  left: 180px;
}
</style>
