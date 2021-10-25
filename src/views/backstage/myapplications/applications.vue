<template>
  <div>
    <detail :visible.sync="dialogVisible" :details="dialogDetail"></detail>
      <el-table
        v-loading="listLoading"
        :data="projectList.userApplicationList"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          width="125"
          prop="id"
          label="项目编号"
          style="text-align: center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="creationTime"
          label="创建时间"
        ></el-table-column>
        <el-table-column prop="beginTime" width="200" label="开始时间"></el-table-column>
        <el-table-column width="75" prop="type" label="类型"></el-table-column>
        <el-table-column
          width="175"
          prop="status"
          label="状态"
        ></el-table-column>
        <el-table-column width="80" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="show_details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {getList,getDetail} from "@/api/applications";
import Detail from "./detail";
import axios from "axios";

export default {
  name: "applications",
  components: {Detail},
  computed: {
    Watch_project_type() {
      return this.watch_project_type;
    },
  },
  data() {
    return {
      projectList: "",
      listLoading: true,
      dialogVisible: false,
      dialogDetail:[],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function () {
      this.listLoading = true
      getList()
        .then(res=>{
        this.projectList = res.data.data;
        this.listLoading = false;
      })
        .catch((err) => {this.$message.error(err);});
    },
    show_details(row){
      this.listLoading = true
      getDetail(row)
        .then(res=>{
          row.leaderAgent = res.data.data.leaderAgent;
          row.institution = res.data.data.institution;
          row.secretaryAgent = res.data.data.secretaryAgent;
          row.chairmanAgent = res.data.data.chairmanAgent;
          row.memberAgent = res.data.data.memberAgent;
          row.scheduleTime = res.data.data.scheduleTime;
          row.creationTime = res.data.data.creationTime;
          row.beginTime = res.data.data.beginTime;
          row.executionTime = res.data.data.executionTime;
          row.endTime = res.data.data.endTime;
          row.status = res.data.data.status;
          row.projectType = res.data.data.projectType;
          row.direction = res.data.data.direction;
          row.fundingSource = res.data.data.fundingSource;
          row.projectAbstract = res.data.data.projectAbstract;
          row.applicationFile = res.data.data.applicationFile;
          row.rejectReason = res.data.data.rejectReason;
          row.applicationPdf = res.data.data.applicationPdf;
          row.executeInfo = res.data.data.executeInfo;
          row.summary = res.data.data.summary;
          row.trackFile = res.data.data.trackFile;
          row.id = res.data.data.id;
          row.memberResList = res.data.data.memberResList;
          this.dialogDetail.name = row.name;
          this.dialogDetail = row;
          this.dialogVisible=true;
          this.listLoading = false;
      })
        .catch((err) => {this.$message.error(err);});
    }
  }
}
</script>

<style scoped>
</style>
