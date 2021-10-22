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
              <div style="position: absolute;left:-6px;top: 0px;">
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
              </div>
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
              <el-checkbox-group v-model="form.temp" :max="1">
                <div style="position:absolute; left:0px;">
                  <el-checkbox border
                               label="政府"
                               name="temp"
                               class="apply"
                               @click="fundingSource(0)"
                  ></el-checkbox>
                  <el-checkbox  border
                                label="基金会"
                                name="temp"
                                class="apply"
                                @click="fundingSource(1)"
                  ></el-checkbox>
                  <el-checkbox border
                               label="公司"
                               name="temp"
                               class="apply"
                               @click="fundingSource(2)"
                  ></el-checkbox>
                  <el-checkbox border
                               label="国际组织"
                               name="temp"
                               class="apply"
                               @click="fundingSource(3)"
                  ></el-checkbox>
                  <el-checkbox border
                               label="其他"
                               name="temp"
                               class="apply"
                               @click="fundingSource(4)"
                  ></el-checkbox>
                </div>
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
                <div style="position:absolute;left:0px;top:0px;">
                  <el-button type="primary">项目附件(压缩包)</el-button>
                </div>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div style="position:absolute;left:-20px;margin-top:5px;">
        <el-button type="success" id="submitButton" @click="Submit"
        >提交申请
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "application"
}
</script>

<style scoped>

</style>
