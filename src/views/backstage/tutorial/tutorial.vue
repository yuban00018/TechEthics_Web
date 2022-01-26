<template>
  <div id="whiteBG">
    <h1 id="title" style="position:relative;margin:0 auto;top:50px;">申报指南</h1>
    <h2 style="position:relative;margin: 0 auto;top:125px;">申请创建</h2>
    <div id="steps1">
      <el-steps :active="3" align-center :space="200">
        <el-step icon="el-icon-edit" title="申请人创建申请" description="文章/项目/其他申请"></el-step>
        <el-step icon="el-icon-upload" title="申请人提交申请" description="自动生成申请表PDF"></el-step>
        <el-step icon="el-icon-s-check" title="进入审核流程"></el-step>
      </el-steps>
    </div>
    <h2 style="position:relative;margin: 0 auto;top:175px;">审核</h2>
    <div id="steps2">
      <el-steps :active="4" align-center :space="200">
        <el-step icon="el-icon-s-check" title="科研秘书初审"></el-step>
        <el-step icon="el-icon-s-check" title="二级学院领导复审"></el-step>
        <el-step icon="el-icon-s-check" title="科技伦理委员会审核"></el-step>
        <el-step icon="el-icon-document-checked" title="委员会出具审查同意书"></el-step>
      </el-steps>
    </div>
    <h2 style="position:relative;margin: 0 auto;top:250px;">完成项目</h2>
    <div id="steps3">
      <el-steps :active="3" align-center :space="200">
        <el-step icon="el-icon-upload" title="提交伦理执行情况表格"></el-step>
        <el-step icon="el-icon-upload" title="提交伦理工作总结"></el-step>
        <el-step icon="el-icon-upload" title="提交跟踪情况表"></el-step>
      </el-steps>
    </div>
    <el-card class="box-card">
      <div slot="header">
        <el-row>
          <el-col :span="15">
              <span id="header_title">相关附件</span>
          </el-col>
          <el-col :span="8">
            <el-button id="header_button" type="text" @click="change_card">{{header_button_title}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="card_visable">
        <el-row>
          <el-col :span="17">
            <span class="card_content_title">申请demo</span>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain size="mini" @click="download_applyDemo">
              下载
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="17">
            <span class="card_content_title">申请同意书demo</span>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain size="mini" @click="download_consentDemo">
              下载
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {Download} from "../../../api/download";
export default {
  name: "tutorial",
  data() {
    return {
      tutorial_button01_data: "下载模板",
      tutorial_title01_data: "申报指南",
      card_visable: 0,
      header_button_title: "显示"
    };
  },
  methods: {
    change_card() {
      this.card_visable ^= 1;
      this.header_button_title = this.header_button_title === "隐藏" ? "显示" : "隐藏";
    },
    download_applyDemo() {
      Download("./file/demo.pdf");
    },
    download_consentDemo() {
      Download("./file/consent_demo.pdf");
    }
  }
};
</script>

<style scoped>
#steps1 {
  position:relative;
  top:150px;
  margin: 0 auto;
  width: 600px;
}
#steps2 {
  position: relative;
  margin: 0 auto;
  top:200px;
  width:800px;
}
#steps3 {
  position: relative;
  top:280px;
  margin: 0 auto;
  width: 600px;
}
#whiteBG {
  background-image: linear-gradient(white,white);
  width: 100%;
  height:100%;
  position:absolute;
}
#title {
  position: relative;
  top:50px;
  margin: 0 auto;
}
#whiteBG {
  position: absolute;
  margin-left: -3%;
}
.box-card {
  width: 16%;
  position: relative;
  margin-left: 81%;
  margin-top: -15%;
}
#header_title {
  margin-left: -23%;
}
#header_button {
  float: right;
  padding: 3px 0;
}
.card_content_title {
  font-size: 15px;
  position: relative;
  margin-left: -35%;
}
</style>
