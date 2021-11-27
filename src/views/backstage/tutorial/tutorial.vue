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
  </div>
</template>

<script>
export default {
  name: "tutorial",
  data() {
    return {
      tutorial_button01_data: "下载模板",
      tutorial_title01_data: "申报指南",
    };
  }
};
</script>

<style scoped>
#steps1{
  position:relative;
  top:150px;
  margin: 0 auto;
  width: 600px;
}
#steps2{
  position: relative;
  margin: 0 auto;
  top:200px;
  width:800px;
}
#steps3{
  position: relative;
  top:280px;
  margin: 0 auto;
  width: 600px;
}
#whiteBG{
  background-image: linear-gradient(white,white);
  width: 100%;
  height:100%;
  position:absolute;
}
#title
{
  position: relative;
  top:50px;
  margin: 0 auto;
}
</style>
