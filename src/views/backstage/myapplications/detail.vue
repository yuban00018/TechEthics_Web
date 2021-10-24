<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="visible"
      width="90%"
    >
    <el-descriptions direction="vertical" class="margin-top" :column="4" border>
    <el-descriptions-item style="width: 200px;">
      <template slot="label"><i class="el-icon-tickets"></i>项目名称</template>
      {{details.name}}
    </el-descriptions-item>
      <el-descriptions-item label="项目类别">
        <template slot="label"><i class="el-icon-tickets"></i>项目类别</template>
        {{details.projectType}}
      </el-descriptions-item>
      <el-descriptions-item label="项目方向">
        {{details.direction}}
      </el-descriptions-item>
      <el-descriptions-item label="项目单位">
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
      <el-descriptions-item v-for="member in details.memberResList" label="委员经办人">
        {{member.userId}} {{member.state===-2?"未审批":''}} {{member.state===-1?"驳回":''}} {{member.state===0?"驳回修改":''}} {{member.state===1?"已批准":''}}
      </el-descriptions-item>
      <el-descriptions-item label="项目摘要">
        {{details.projectAbstract}}
      </el-descriptions-item>
  </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:['visible','details'],
  name:"detail",
  data() {
    return {
      memberList:'',
    };
  },
  methods: {
  }
};
</script>

<style scoped>

</style>
