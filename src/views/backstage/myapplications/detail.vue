<template>
  <div>
    <el-dialog
      :title='details.name'
      :visible.sync="dialog_visible"
      width="65%"
    >
      <el-descriptions title="基本信息" direction="vertical" class="margin-top" :column="3" border>
        <template slot="extra">
          <!--附件-->
          <el-button
          size="mini"
          type="primary"
          @click="download(details.applicationFile)"
        >下载附件</el-button
        >
          <!--PDF-->
          <el-button
          size="mini"
          type="primary"
          @click="download(details.applicationPdf)"
        >下载PDF</el-button
        >
          <!--执行情况表-->
          <el-button
          :disabled="details.executeInfo === ''"
          size="mini"
          type="primary"
          @click="download(details.executeInfo)"
        >下载执行情况表格</el-button
        >
          <!--总结-->
          <el-button
          :disabled="details.summary === ''"
          size="mini"
          type="primary"
          @click="download(details.summary)"
        >下载总结</el-button
        >
          <!--后跟踪文件-->
          <el-button
          :disabled="details.trackFile === ''"
          size="mini"
          type="primary"
          @click="download(details.trackFile)"
        >下载后跟踪文件</el-button
        >
        </template>
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
        <el-descriptions-item label="委员长经办人">
        <template slot="label"><i class="el-icon-user"></i>委员长经办人</template>
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

      <br>
      <div id="uploadPanel" v-if="details.status === '未提交' || details.status === '驳回修改'">
        <el-button
          size="mini"
          type="success"
          @click="submit(details.id)"
        >提交</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="modify(details.id)"
        >修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="del(details.id)"
        >删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Download } from "@/api/download.js";
import { Submit,Delete } from "@/api/detail.js";
export default {
  props:['visible','details'],
  name:"detail",
  watch:{
    visible(val) {
      this.dialog_visible = val;
    },
    dialog_visible(val) {
      this.$emit('update:visible', val);
    }
  },
  data() {
    return {
      memberList:'',
      dialog_visible: false,
    };
  },
  methods: {
    download: function (url) {
      Download(url);
    },
    submit: function (id) {
      Submit(id).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "提交成功",
            type: "success",
          });
        } else this.$message.error(res.data.message);
      }).catch((err) => {
          this.$message.error(err);
      });
    },
    del: function (id){
      Delete(id).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else this.$message.error(res.data.message);
      })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    modify: function (id) {
      this.$router.replace({ path: 'application', query: { applicationId: id }})
        .catch((err) => {
        this.$message.error(err);
        });
    },
  }
};
</script>

<style scoped>
#uploadPanel{
  text-align: right;
}
</style>
