<template>
  <div>
    <detail :visible.sync="dialogVisible" :details="dialogDetail"></detail>
    <el-main>
      <el-row>
        <el-col :span="3" :offset="19">
          <el-select v-model="chosenStatus" filterable placeholder="请选择">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleStatusFilter">筛选</el-button>
        </el-col>
      </el-row>
      <br>
      <el-table
        v-loading="listLoading"
        :data="currentPageData"
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
        <el-table-column width="175" prop="status" label="状态"></el-table-column>
        <el-table-column width="80" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="show_details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <br>
    <div class="block">
      <el-pagination
        :hide-on-single-page=true
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="totalLength"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getList, getDetail} from "@/api/applications";
import {getProgressList} from "@/api/const_info"
import Detail from "./detail";

export default {
  name: "applications",
  components: {Detail},
  computed: {
    currentPageData(){
      return this.ApplicationList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    }
  },
  data() {
    return {
      totalLength: 0,
      currentPage: 1,
      pageSize: 11,
      originalList: [{"id":0,"ordernum":"","name":"","userId":"","creationTime":"","beginTime":"","type":"","status":""}],
      ApplicationList: [],
      listLoading: true,
      dialogVisible: false,
      dialogDetail:[],
      statusList:[],
      chosenStatus:"",
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
          if(res.data.code===500){
            this.listLoading = false;
          }
          else if(res.data.code===200){
            this.ApplicationList = res.data.data.userApplicationList;
            this.totalLength = res.data.data.totalNum;
            this.originalList = this.ApplicationList;
            this.listLoading = false;
            this.currentPage = 1;
          }
      })
        .catch((err) => {this.$message.error(err);});
      getProgressList().then(res=>{
        if(res.data.code===200){
          this.statusList = []
          res.data.data.forEach(item=>{
            if(item!=="") this.statusList.push({text:item,value:item});
          })
        }
      }).catch((err)=>{this.$message.error(err);});
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
          let applicationPdfs = []
          if(res.data.data.applicationPdf1!==""&&res.data.data.applicationPdf1!==null)
            applicationPdfs.push(res.data.data.applicationPdf1);
          if(res.data.data.applicationPdf2!==""&&res.data.data.applicationPdf2!==null)
            applicationPdfs.push(res.data.data.applicationPdf2);
          if(res.data.data.applicationPdf3!==""&&res.data.data.applicationPdf3!==null)
            applicationPdfs.push(res.data.data.applicationPdf3);
          row.application_pdfs = []
          applicationPdfs.forEach(pdf=>{
            row.application_pdfs.push({'name':pdf.slice(pdf.search("---") + 3),'url':pdf});
          })
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
    },
    handleCurrentChange(currentPage){
      this.currentPage=currentPage;
    },
    handleStatusFilter(){
      let newList = []
      this.originalList.forEach(item=>{
        if(item.status===this.chosenStatus){
          newList.push(item)
        }
      })
      this.ApplicationList = newList;
      this.totalLength = this.ApplicationList.length;
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
</style>
