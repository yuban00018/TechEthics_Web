<template>
  <div>
    <!--疑惑3：这里的common-detail和:details和:approve_type是啥呢？-->
    <common-detail :visible.sync="dialogVisible" :details="dialogDetail" :approve_type="approve_type"></common-detail>

    <el-dialog
      width="90%"
      title="委员任命"
      :visible.sync="dialogTableVisible"
      append-to-body
    >
      <!--:data绑定的数据即为表格里的数据-->
      <!--@selection-change绑定的函数，即为当前表格选定某些行之后，触发的函数-->
      <!--底下代码作用：在委员任命的时候出现-->
      <el-table
        :data="memberList.data"
        style="width: 95%; height: 100%"
        @selection-change="handleMemberChange"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column width="150" prop="name" label="姓名">
        </el-table-column>
        <el-table-column width="150" prop="userId" label="用户Id">
        </el-table-column>
        <el-table-column width="200" prop="department" label="学院">
        </el-table-column>
        <el-table-column width="200" prop="education" label="学历">
        </el-table-column>
        <el-table-column width="200" prop="identity" label="身份">
        </el-table-column>
        <el-table-column
          width="200"
          prop="officePhone"
          label="办公室电话"
        >
        </el-table-column>
        <el-table-column
          width="200"
          prop="mobilePhone"
          label="移动电话"
        >
        </el-table-column>
      </el-table>

      <!--疑惑5：父组件插了名叫footer的子组件，子组件在哪呢？-->
      <div slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          type="info"
          @click="dialogTableVisible = false"
        >取消</el-button
        >
        <el-button
          size="medium"
          type="primary"
          @click="multiAssign"
        >确认</el-button>
      </div>
    </el-dialog>`

    <el-main>
      <el-row>
        <el-col :span="4" :offset="flexibleOffset">
          <!--v-model的值为当前被选中的el-option的 value 属性值，所以需要label和value-->
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
        <el-col v-if="approve_type!=='chairman'" :span="2">
          <el-button type="primary" @click="multiApprove">批量批准</el-button>
        </el-col>
        <el-col v-if="approve_type==='chairman'" :span="2">
          <el-button type="primary" @click="loadMemberList">批量分配委员</el-button>
        </el-col>
        <el-col v-if="approve_type==='chairman'" :span="2">
          <el-button type="primary" @click="multiApprove">批量批准</el-button>
        </el-col>
      </el-row>

      <br>

      <!--v-loading：显示正在加载的东西（就是一个圈圈在转），listLoading控制要不要显示正在加载-->
      <el-table
        v-loading="listLoading"
        :data="currentPageData"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
        ></el-table-column>
        <!--疑惑6：这里的prop用来实现表的数据填充，prop绑定的id，name，creationTime这些哪里来的呢-->
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
        <el-table-column width="75" p rop="type" label="类型"></el-table-column>
        <el-table-column width="175" prop="status" label="状态"></el-table-column>
        <el-table-column width="80" fixed="right" label="操作">
          <!--疑惑7：slot-scope="scope"：获取了子组件的数据，scope.row就是当前行的信息，但是这个子组件是哪里的呢？-->
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <br>

    <div class="block">
      <!--total:10个一页-->
      <!--current-change：页面改变会触发函数-->
      <!--hide-on-single-page：一页会隐藏-->
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
import { getDetail } from "@/api/applications";
import { getProgressList } from "@/api/const_info";
import { Approve, Assign, LoadList } from "@/api/approves";
import commonDetail from "@/views/backstage/approve/approves/common_approve_detail";
import {getMemberList} from "../../../../api/member_list";
import axios from "axios";

export default {
  name: "common_approve_table",
  props: ['approve_type'],
  // components: 可以通过在<script>中引入子组件，再赋值给components的变量，让当前变量成为父组件可以使用的html标签
  // 可以理解为就是用来注册子组件的
  // 疑惑10：引用了commonDetail有什么用处嘛？
  components: {commonDetail},
  /*computed:
  支持缓存，只有依赖数据发生改变，才会重新进行计算
  不支持异步，当computed内有异步操作时无效，无法监听数据的变化*/
  computed: {
    // 通过观察当前数据currentPage的变化来改变currentPageData，从而改变整个页面的展示
    currentPageData(){
      return this.ApplicationList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    },
    // 疑惑11：offset对应的flexibleOffset这个有啥用啊
    flexibleOffset(){
      if(this.approve_type!=="chairman")return 16;
      else return 14;
    }
  },
  data() {
    return {
      totalLength: 0,   // 总共有多少申请记录
      currentPage: 1,  // 当前在第几页
      pageSize: 11,   // 每一页显示的申请记录个数
      originalList: [], // 记录所有的申请记录
      ApplicationList: [],  // 记录当前状态下的申请记录
      listLoading: true,    // 控制要不要显示正在加载
      dialogVisible: false,   // 用来控制要不要展示common_approve_detail
      dialogDetail:[],
      statusList:[],
      chosenStatus:"",  // 申请表的选择状态
      chosenList:[],
      memberList:[],
      assignMembers:[],
      dialogTableVisible:false  // 当前展示所有委员信息的表
    };
  },
  // mounted()：html加载完成后执行，执行顺序：子组件-父组件
  mounted() {
    this.load();
  },
  methods: {
    // 获取当前的申请记录
    load: function () {
      this.listLoading = true
      // 疑惑9：为什么这里要额外修改展示所有委员信息的表为false呢？
      this.dialogTableVisible = false;
      LoadList(this.approve_type)
        .then(res=>{
          // 疑惑8：即使返回了结果是500，显示该用户未有审批信息，也会到.catch的地方显示嘛？
          if(res.data.code===500){
            this.listLoading = false;
          }
          else if(res.data.code===200){
            this.ApplicationList = []
            this.ApplicationList = res.data.data.auditResList;
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
    // 根据当前申请行的信息获取当前申请记录的全部信息（包含申请人信息，申请项目的信息和提交文件的信息）
    showDetails(row){
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
          row.consentPdf = res.data.data.consentPdf;
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
    // 改变记录当前是第几页的变量currentPage
    handleCurrentChange(currentPage){
      this.currentPage=currentPage;
    },
    // 根据状态筛选申请列表
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
    },
    // 将当前选中的申请记录存放到选择申请表中
    handleSelectionChange(val){
      this.chosenList = val;
    },
    // 将当前选定的委员的userId放到assignMembers中
    handleMemberChange(val){
      // 先清空数组
      this.assignMembers = []
      val.forEach(item => {
        // 存放选定委员的userId
        this.assignMembers.push(item["userId"]);
      })
    },
    // 批量批准当前选中的申请
    multiApprove(){
      console.log(666);
      this.chosenList.forEach(item=>{
        Approve(this.approve_type,item.id).then(res=>{
          if (res.data.code !== 200) {
            this.$message({
              message: item.id+'审核失败：'+res.data.message,
              type: 'warning'
            });
          }
        }).catch(err=>{
          this.$message.error(err);
        })
        }
      )
      this.$message({
        message: '成功',
        type: 'success'
      });
      this.reload();
      // location.reload();
    },
    // 对选定的申请进行批量分配选定的委员的操作
    multiAssign(){
      this.chosenList.forEach(item => {
        Assign(item.id,this.assignMembers).then(res => {
          if (res.data.code !== 200) {
            this.$message({
              message: item.id + '分配失败：' + res.data.message,
              type: 'warning'
            });
          }
        }).catch(err => {
          this.$message.error(err);
        })
      })
      this.dialogTableVisible = false;
      this.$message({
        message: '成功',
        type: 'success'
      });
      this.reload();
      // location.reload();
      },
    // 获取当前所有的委员列表，并展示委员列表的table
    loadMemberList(){
      getMemberList().then((res) => {
          if (res.data.code === 200) {
            this.dialogTableVisible=true;
            this.memberList = res.data;
            this.options = res.data.data;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    reload: function (){
      var {search,href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g,'')
      window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
    }
  }
}
</script>

<style scoped>
</style>
<!--疑惑12：为什么一开始的时候不会展示整个申请页面呢？-->
