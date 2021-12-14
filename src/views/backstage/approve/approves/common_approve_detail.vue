<template>
  <div>
    <el-dialog
      :title='details.name'
      :visible.sync="dialog_visible"
      width="65%"
    >
      <el-descriptions title="基本信息" direction="vertical" class="margin-top" :column="3" border>
        <el-descriptions-item label="项目类别">
          <template slot="label"><i class="el-icon-tickets"></i>项目类别</template>
          {{details.projectType}}
        </el-descriptions-item>
        <el-descriptions-item label="项目方向">
          <template slot="label"><i class="el-icon-s-promotion"></i>项目方向</template>
          {{details.direction}}
        </el-descriptions-item>
        <el-descriptions-item label="项目单位">
          <template slot="label"><i class="el-icon-school"></i>项目单位</template>
          {{details.institution}}
        </el-descriptions-item>
        <el-descriptions-item label="学院秘书经办人">
          <template slot="label"><i class="el-icon-user"></i>学院秘书经办人</template>
          {{details.secretaryAgent}}
        </el-descriptions-item>
        <el-descriptions-item label="部门领导经办人">
          <template slot="label"><i class="el-icon-user"></i>部门领导经办人</template>
          {{details.leaderAgent}}
        </el-descriptions-item>
        <el-descriptions-item label="系统管理员经办人">
          <template slot="label"><i class="el-icon-user"></i>系统管理员经办人</template>
          {{details.chairmanAgent}}
        </el-descriptions-item>
        <el-descriptions-item v-for="member in details.memberResList" :key="member.userId" label="委员经办人">
          <template slot="label"><i class="el-icon-user"></i>委员经办人</template>
          {{member.userId}} {{member.state===-2?"未审批":''}} {{member.state===-1?"驳回":''}} {{member.state===0?"驳回修改":''}} {{member.state===1?"已批准":''}}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="日期信息" direction="vertical" class="margin-top" :column="4" border>
        <el-descriptions-item label="预定的起止时间">
          <template slot="label"><i class="el-icon-time"></i>预定的起止时间</template>
          {{details.scheduleTime}}
        </el-descriptions-item>
        <el-descriptions-item label="申请创建时间">
          <template slot="label"><i class="el-icon-time"></i>申请创建时间</template>
          {{details.creationTime}}
        </el-descriptions-item>
        <el-descriptions-item label="申请同意时间">
          <template slot="label"><i class="el-icon-time"></i>申请同意时间</template>
          {{details.beginTime}}
        </el-descriptions-item>
        <el-descriptions-item label="申请同意时间">
          <template slot="label"><i class="el-icon-time"></i>结束时间</template>
          {{details.endTime}}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="详情" direction="vertical" class="margin-top" :column="1" border>
        <el-descriptions-item label="项目摘要">
          <template slot="label"><i class="el-icon-tickets"></i>项目摘要</template>
          {{details.projectAbstract}}
        </el-descriptions-item>
        <el-descriptions-item label="驳回理由" v-if="details.rejectReason !== '' && details.rejectReason != null">
          <template slot="label"><i class="el-icon-user"></i>驳回理由</template>
          {{details.rejectReason}}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="附件下载" direction="horizontal" class="margin-top" :column="2" border>
        <el-descriptions-item v-for="pdf in details.application_pdfs" :key="pdf.name" label="文件">
          <template slot="label">申请材料</template>
          {{pdf.name}}
          <div>
            <el-button @click="preview(pdf.url)" type="text">预览</el-button>
            <el-button @click="download(pdf.url)" type="text">下载</el-button>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="申请表">
          <template slot="label">申请表</template>
          上海大学伦理审查申请表.pdf <br>
          <el-button @click="preview(details.applicationPdf)" type="text">预览</el-button>
          <el-button type="text" @click="download(details.applicationPdf)">下载</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="执行情况表格" v-if="details.executeInfo !== null">
          <template slot="label">申请表</template>
          上海大学伦理审查执行情况表格.pdf <br>
          <el-button @click="preview(details.executeInfo)" type="text">预览</el-button>
          <el-button type="text" @click="download(details.executeInfo)">下载</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="总结" v-if="details.summary !== null">
          <template slot="label">总结</template>
          上海大学伦理审查总结.pdf <br>
          <el-button @click="preview(details.summary)" type="text">预览</el-button>
          <el-button type="text" @click="download(details.summary)">下载</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="总结" v-if="details.trackFile !== null">
          <template slot="label">后跟踪文件</template>
          上海大学伦理审查后跟踪文件.pdf <br>
          <el-button @click="preview(details.trackFile)" type="text">预览</el-button>
          <el-button type="text" @click="download(details.trackFile)">下载</el-button>
        </el-descriptions-item>
      </el-descriptions>
      <el-form>
        <el-form-item label="驳回理由">
          <el-input type="textarea" v-model="reject_reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="reject">退回修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {Download, Preview} from "@/api/download.js";
import {Reject} from "@/api/approves.js";
export default {
  props:['visible','details','approve_type'],
  name:"detail",
  watch:{
    visible(val) {
      this.reject_reason = "";
      this.dialog_visible = val;
    },
    dialog_visible(val) {
      this.reject_reason = "";
      this.$emit('update:visible', val);
    }
  },
  computed: {
    headers() {
      return {
        Authorization: localStorage.getItem("TokenKey"),
      };
    }
  },
  data() {
    return {
      reject_reason:"",
      projectList: "",
      dialog_visible: false,
    };
  },
  methods: {
    load(){
      this.dialog_visible=false;
    },
    preview(url){
      Preview(url);
    },
    download(url) {
      Download(url);
    },
    reject(){
      console.log(this.approve_type,this.details.id,this.reject_reason)
      Reject(this.approve_type,this.details.id,this.reject_reason).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '成功',
            type: 'success'
          });
        }
        this.dialog_visible=false;
      })
    }
  }
};
</script>

<style>
</style>
