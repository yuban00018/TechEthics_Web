<template>
  <div>
    <el-dialog
      :title='details.name'
      :visible.sync="dialog_visible"
      width="65%"
    >
      <el-descriptions title="基本信息" direction="vertical" class="margin-top" :column="3" border>
        <template slot="extra">
          <div v-if="details.status === '未提交' || details.status === '驳回修改'">
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
          <div v-if="consentButtonShow()">
            <el-button
              size="mini"
              type="success"
              @click="consentButtonModify(details.id)"
            >填写申请同意书</el-button>
          </div>
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
      <br>
      <div id="过程管理及后跟踪管理按钮">
        <div v-if="details.status === '确认项目状态' || details.status === '暂未立项'">
          <el-select
            size="mini"
            v-model="value"
            filterable
            placeholder="确认项目状态"
          >
            <el-option
              v-for="item in status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            size="mini"
            type="primary"
            @click="confirmStatus(details.id)"
          >确认项目状态</el-button>
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('执行情况表') !== -1 &&
                   details.status.search('待审核') === -1 &&
                   details.type === '其他'">
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
            <el-button size="small" type="primary">上传执行情况表</el-button >
          </el-upload>
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('总结') !== -1&&
                   details.status.search('待审核') === -1 &&
                   details.type === '其他'">
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
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('待提交') !== -1 &&
                   details.status.search('跟踪') === -1 &&
                   details.type === '其他'">
          <el-button
            size="medium"
            type="success"
            @click="othersProcessManagement(details.id)"
          >确认上传</el-button>
        </div>
        <div v-if="details.status === '执行情况表待提交' && details.type === '文章'">
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
            <el-button size="small" type="primary">上传执行情况表</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf</div>
          </el-upload>
          <el-button
            size="medium"
            type="success"
            @click="articleProcessManagement(details.id)"
          >确认上传</el-button >
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('执行情况表') !== -1 &&
                   details.status.search('待审核') === -1 &&
                   details.type === '项目'">
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
            <el-button size="small" type="primary" >上传执行情况表</el-button >
          </el-upload>
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('总结') !== -1 &&
                   details.status.search('待审核') === -1 &&
                   details.type === '项目'">
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
        </div>
        <div v-if="dialog_visible &&
                   details.status.search('待提交') !== -1 &&
                   details.status.search('跟踪') === -1 &&
                   details.type === '项目'">
          <el-button
            size="medium"
            type="success"
            @click="projectProcessManagement(details.id)"
          >确认上传</el-button >
        </div>
        <div v-if="details.status === '跟踪情况表待提交'">
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
            <el-button size="small" type="primary" >上传跟踪情况表</el-button >
            <div slot="tip" class="el-upload__tip">只能上传pdf</div>
          </el-upload>
          <el-button
            size="medium"
            type="success"
            @click="trackManagement(details.id)"
          >确认上传</el-button>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Download, Preview} from "@/api/download.js";
import {Submit, Delete, Confirm, projectManagement, Track, otherManagement, articleManagement} from "@/api/detail.js";
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
  computed: {
    headers() {
      return {
        Authorization: localStorage.getItem("TokenKey"),
      };
    }
  },
  data() {
    return {
      trackFile:'',
      ExecuteInfo:'',
      summary:'',
      fileList: [],
      projectList: "",
      value: "",
      status_options: [
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
      memberList:'',
      dialog_visible: false,
    };
  },
  methods: {
    preview(url){
      Preview(url);
    },
    uploadSummary(response, file, fileList) {
      this.summary = response.data;
    },
    projectProcessManagement(id) {
      projectManagement(id,this.ExecuteInfo,this.summary).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "成功",
            type: "success",
          });
        } else this.$message.error(res.data.message);
      })
        .catch((err) => {
          this.$message.error(err);
        });
      this.reload();
      // location.reload();
    },
    othersProcessManagement(id) {
      otherManagement(id,this.ExecuteInfo,this.summary)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success",
            });
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
      this.reload();
      // location.reload();
    },
    articleProcessManagement(id) {
      if (this.ExecuteInfo === "") {
        this.$message.error("您忘记上传文件了!");
        return;
      }
      articleManagement(id,this.ExecuteInfo).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success",
            });
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
      this.reload();
      // location.reload();
    },
    trackManagement(id) {
      Track(this.trackFile,id).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success",
            });
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
      this.reload();
      // location.reload();
    },
    confirmStatus(id) {
      Confirm(id, this.value).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "成功",
            type: "success",
          });
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        this.$message.error(err);
      });
      this.reload();
      // location.reload();
    },
    download(url) {
      Download(url);
    },
    submit(id) {
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
      this.reload();
      // location.reload();
    },
    del(id){
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
      this.reload();
      // location.reload();
    },
    modify(id) {
      this.$router.replace({ path: 'application', query: { applicationId: id }})
        .catch((err) => {
        this.$message.error(err);
        });
      this.reload();
      // location.reload();
    },
    uploadTrackFile(response, file, fileList) {
      this.trackFile = response.data;
    },
    uploadExecuteInfo(response, file, fileList) {
      this.ExecuteInfo = response.data;
    },
    handleSuccess(response, file, fileList) {
      this.form.application_file = response.data;
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
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
    jmp: function (path) {
      this.$router.replace("/backstage/" + path).catch((err) => {
        err;
      });
    },
    consentButtonShow: function () {
      let mark = 1;
      if (this.details.status !== '委员终审')
          mark = 0;
      // console.log(this.details.memberResList);
      for(let tmp in this.details.memberResList) {
        if (this.details.memberResList[tmp].state !== 1)
          mark = 0;
      }
      // for (var i = 0; i < this.details.memberResList.length; i++) {
      //   var tmp = this.details.memberResList[i];
      //   if (tmp.state !== 1)
      //     mark = 0;
      // }
      // this.details.memberResList.forEach(function(val, ind, arr){
      //     if (val.state !== 1)
      //         mark = 0;
      // })
      return mark;
    },
    consentButtonModify: function (id) {
      this.$router.replace({path: 'myapplications/consent', query: {application_id: id}})
        .catch((err) => {
          this.$message.error(err);
        });
      this.reload();
      // location.reload();
      // location.assign(location);
    },
    reload: function (){
      var {search,href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g,'')
      window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
    }
  }
};
</script>

<style>
</style>
