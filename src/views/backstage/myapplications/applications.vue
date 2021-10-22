<template>
  <div>
    <template>
      <el-table
        ref="multipleTable"
        :data="projectList.userApplicationList"
        style="width: 96%; height: 100%"
        id="list"
      >
        <!--此处为展开栏-->
        <el-table-column type="expand" width="1">
          <template slot-scope="props">
            <el-form inline class="table-expand">
              <el-form-item label="项目类别">
                <span>{{ props.row.projectType }}</span>
              </el-form-item>
              <el-form-item label="研究方向">
                <span>{{ props.row.direction }}</span>
              </el-form-item>
              <br />
              <el-form-item label="项目摘要">
                <span>{{ props.row.projectAbstract }}</span>
              </el-form-item>
              <br />
              <el-form-item label="项目单位">
                <span>{{ props.row.institution }}</span>
              </el-form-item>
              <br />
              <el-form-item label="学院秘书经办人" v-if="props.row.secretaryAgent!='none'">
                <span>{{ props.row.secretaryAgent }}</span>
              </el-form-item>
              <el-form-item label="部门领导经办人" v-if="props.row.leaderAgent!='none'">
                <span>{{ props.row.leaderAgent }}</span>
              </el-form-item>
              <el-form-item label="委员长经办人" v-if="props.row.chairmanAgent!='none'">
                <span>{{ props.row.chairmanAgent }}</span>
              </el-form-item>
              <br />
              <!--委员经办人应当实现显示多个经办人-->
              <el-form-item label="委员经办人" v-if="props.row.memberResList!=''">
                <!--<span>{{ props.row.memberAgent }}</span>-->
                <span v-for="member in props.row.memberResList">
                  {{member.userId}}
                  <span v-if="member.state==-2">未审批</span>
                  <span v-if="member.state==-1">驳回</span>
                  <span v-if="member.state==0">驳回修改</span>
                  <span v-if="member.state==1">已批准</span>
                  <br/>
                </span>
              </el-form-item>
              <br v-if="props.row.memberResList!=''"/>
              <el-form-item label="预定的起止时间">
                <span>{{ props.row.scheduleTime }}</span>
              </el-form-item>
              <el-form-item label="申请创建时间">
                <span>{{ props.row.creationTime }}</span>
              </el-form-item>
              <br />
              <el-form-item label="申请同意时间" v-if="props.row.beginTime!=''">
                <span>{{ props.row.beginTime }}</span>
              </el-form-item>
              <!--
              <el-form-item label="执行期">
                <span>{{ props.row.executionTime }}</span>
              </el-form-item>-->
              <el-form-item label="结束时间"  v-if="props.row.endTime!=''">
                <span>{{ props.row.endTime }}</span>
              </el-form-item>
              <br />
              <el-form-item
                v-if="
                  props.row.rejectReason != '' && props.row.rejectReason != null
                "
                label="驳回原因"
              >
                <span>{{ props.row.rejectReason }}</span>
              </el-form-item>
              <br />

              <el-form-item label="下载">
                <el-button
                  size="mini"
                  type="primary"
                  @click="download(props.row.applicationFile)"
                >下载附件</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="download(props.row.applicationPdf)"
                >下载PDF</el-button
                >
                <el-button
                  :disabled="props.row.executeInfo == ''"
                  size="mini"
                  type="primary"
                  @click="download(props.row.executeInfo)"
                >下载执行情况表格</el-button
                >
                <el-button
                  :disabled="props.row.summary == ''"
                  size="mini"
                  type="primary"
                  @click="download(props.row.summary)"
                >下载总结</el-button
                >
                <el-button
                  :disabled="props.row.trackFile == ''"
                  size="mini"
                  type="primary"
                  @click="download(props.row.trackFile)"
                >下载后跟踪文件</el-button
                >
              </el-form-item>
              <br />
              <el-form-item
                v-if="
                  props.row.status == '未提交' || props.row.status == '驳回修改'
                "
                label
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="confirmSubmit(props.row.id)"
                  >提交</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="confirmDelete(props.row.id)"
                  >删除</el-button
                  >
                  <el-button
                    size="mini"
                    type="warning"
                    @click="
                      updateProjectDialogVisible = true;
                      updateId = props.row.id;
                      getProjectInfo(props.row.id);
                    "
                  >修改</el-button
                  >
                </template>
              </el-form-item>
              <br />
              <el-form-item
                v-if="
                  props.row.status == '确认项目状态' ||
                  props.row.status == '暂未立项'
                "
                label="项目状态确认"
              >
                <el-select
                  size="mini"
                  v-model="value"
                  filterable
                  placeholder="确认项目状态"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  size="mini"
                  type="primary"
                  @click="confirmProject(props.row.id)"
                >确认项目状态</el-button
                >
              </el-form-item>

              <el-form-item
                v-if="
                  props.row.status.search('执行情况表') != -1 &&
                  props.row.status.search('待审核') == -1 &&
                  props.row.type == '其他'
                "
                label="执行情况表"
              >
                <el-upload
                  class="upload"
                  action="/api/file/upload"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="uploadExecuteInfo"
                  multiple
                  accept=".pdf"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary"
                  >上传执行情况表</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item
                v-if="
                  props.row.status.search('总结') != -1&&
                  props.row.status.search('待审核') == -1 &&
                  props.row.type == '其他'
                "
                label="总结"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="upload"
                    action="/api/file/upload"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="uploadSummary"
                    multiple
                    accept=".pdf"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">上传总结</el-button>
                  </el-upload>
                </template>
              </el-form-item>

              <el-form-item
                v-if="
                  props.row.status.search('待提交') != -1 &&
                  props.row.status.search('跟踪') == -1 &&
                  props.row.type == '其他'
                "
                label=""
              >
                <el-button
                  size="medium"
                  type="success"
                  @click="othersProcessManagement(props.row.id)"
                >确认上传</el-button
                >
              </el-form-item>

              <el-form-item
                v-if="
                  props.row.status == '执行情况表待提交' &&
                  props.row.type == '文章'
                "
                label="执行情况表"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="upload"
                    action="/api/file/upload"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="uploadExecuteInfo"
                    multiple
                    accept=".pdf"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary"
                    >上传执行情况表</el-button
                    >
                    <div slot="tip" class="el-upload__tip">只能上传pdf</div>
                  </el-upload>
                  <el-button
                    size="medium"
                    type="success"
                    @click="articleProcessManagement(props.row.id)"
                  >确认上传</el-button
                  >
                </template>
              </el-form-item>

              <el-form-item
                v-if="
                  props.row.status.search('执行情况表') != -1 &&
                  props.row.status.search('待审核') == -1 &&
                  props.row.type == '项目'
                "
                label="执行情况表"
              >
                <el-upload
                  class="upload"
                  action="/api/file/upload"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="uploadExecuteInfo"
                  multiple
                  accept=".pdf"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary"
                  >上传执行情况表</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item
                v-if="
                  props.row.status.search('总结') != -1 &&
                  props.row.status.search('待审核') == -1 &&
                  props.row.type == '项目'
                "
                label="总结"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="upload"
                    action="/api/file/upload"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="uploadSummary"
                    multiple
                    accept=".pdf"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">上传总结</el-button>
                  </el-upload>
                </template>
              </el-form-item>

              <el-form-item
                v-if="
                  props.row.status.search('待提交') != -1 &&
                  props.row.status.search('跟踪') == -1 &&
                  props.row.type == '项目'
                "
                label=""
              >
                <el-button
                  size="medium"
                  type="success"
                  @click="projectProcessManagement(props.row.id)"
                >确认上传</el-button
                >
              </el-form-item>

              <el-form-item
                v-if="props.row.status == '跟踪情况表待提交'"
                label="跟踪情况表"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="upload"
                    action="/api/file/upload"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="uploadTrackFile"
                    multiple
                    accept=".pdf"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary"
                    >上传跟踪情况表</el-button
                    >
                    <div slot="tip" class="el-upload__tip">只能上传pdf</div>
                  </el-upload>
                  <el-button
                    size="medium"
                    type="success"
                    @click="trackManagement(props.row.id)"
                  >确认上传</el-button
                  >
                </template>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          width="125"
          prop="id"
          label="项目编号"
        ></el-table-column>
        <!--<el-table-column width="200" prop="ordernum" label="ordernum"></el-table-column>-->
        <el-table-column
          width="400"
          prop="name"
          label="项目名称"
        ></el-table-column>
        <!--<el-table-column width="200" prop="userId" label="用户Id"></el-table-column>-->
        <el-table-column
          width="200"
          prop="creationTime"
          label="创建时间"
        ></el-table-column>
        <el-table-column prop="beginTime" label="开始时间"></el-table-column>
        <el-table-column width="75" prop="type" label="类型"></el-table-column>
        <el-table-column
          width="175"
          prop="status"
          label="状态"
          fixed="right"
        ></el-table-column>
        <el-table-column width="80" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.expanded" size="mini" type="primary" @click="expand(scope.row)"
            >展开</el-button
            >
            <el-button v-if="scope.row.expanded" size="mini" type="info" @click="contract(scope.row)"
            >收起</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {getList} from "@/utils/applications";

export default {
  name: "applications",
  computed: {
    Watch_project_type() {
      return this.watch_project_type;
    },
  },
  data() {
    return {
      projectList: "",
      value: "",
      options: [
        {
          value: 0,
          label: "暂未立项",
        },
        {
          value: 1,
          label: "未获批",
        },
        {
          value: 2,
          label: "获批资助",
        },
      ],
      updateId: "",
      updateProjectDialogVisible: false,
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
        type: 0,
        temp: [],
        project_type: "",
        desc: "",
        application_file: "",
      },
      ExecuteInfo: "",
      summary: "",
      trackFile: "",
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function () {
      this.loading = true
      getList().then(res=>{
        this.projectList = res.data;
        this.loading = false;
      })
    },
  }
}
</script>

<style scoped>
#list {
  left: 25px;
  top: 25px;
}
</style>
