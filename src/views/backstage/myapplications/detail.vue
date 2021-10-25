<template>
  <div>
    <el-dialog
      :title='details.name'
      :visible.sync="dialog_visible"
      width="80%"
    >
    <el-descriptions direction="vertical" class="margin-top" :column="3" border>
      <template slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="download(details.applicationFile)"
        >下载附件</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="download(details.applicationPdf)"
        >下载PDF</el-button
        >
        <el-button
          :disabled="details.executeInfo == ''"
          size="mini"
          type="primary"
          @click="download(details.executeInfo)"
        >下载执行情况表格</el-button
        >
        <el-button
          :disabled="details.summary == ''"
          size="mini"
          type="primary"
          @click="download(details.summary)"
        >下载总结</el-button
        >
        <el-button
          :disabled="details.trackFile == ''"
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
      <el-descriptions direction="vertical" class="margin-top" :column="4" border>
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
      <el-descriptions direction="vertical" class="margin-top" :column="1" border>
      <el-descriptions-item label="项目摘要">
        <template slot="label"><i class="el-icon-tickets"></i>项目摘要</template>
        {{details.projectAbstract}}
      </el-descriptions-item>
        <el-descriptions-item label="驳回理由" v-if="details.rejectReason != '' && details.rejectReason != null">
          <template slot="label"><i class="el-icon-user"></i>驳回理由</template>
          {{details.rejectReason}}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { Download } from "@/api/download.js";
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
  }
};
</script>

<style scoped>

</style>
