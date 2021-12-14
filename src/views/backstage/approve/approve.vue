<template>
  <div id="approve">
    <el-menu
  :default-active="activeIndex"
  class="approveMode"
  mode="horizontal"
  @select="handleSelect"
  background-color="#ffffff"
  text-color="#000"
  active-text-color="#245086">
      <el-menu-item v-if="!disableSecretary" @click="jmp('secretary_approve')" id="secretary" index="1">学院秘书审批</el-menu-item>
      <el-menu-item v-if="!disableLeader" @click="jmp('leader_approve')" id="leader" index="2">领导审批</el-menu-item>
      <el-menu-item v-if="!disableChairman" @click="jmp('chairman_approve')" id="chairman" index="3">系统管理员审批</el-menu-item>
      <el-menu-item v-if="!disableMember" @click="jmp('member_approve')" id="member" index="4">委员审批</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "approve",
  data() {
    return {
      activeIndex: "0",
      disableSecretary:true,
      disableLeader:true,
      disableChairman:true,
      disableMember:true,
    };
  },
  mounted() {
    const identities = JSON.parse(localStorage.getItem('identity'));
    if (identities.includes('学院秘书'))this.disableSecretary=false;
    if (identities.includes('部门领导'))this.disableLeader=false;
    if (identities.includes('系统管理员'))this.disableChairman=false;
    if (identities.includes('委员'))this.disableMember=false;
  },
  methods: {
    handleSelect(key, keyPath) {
        this.activeIndex = key;
      },
    jmp: function (path) {
      this.$router.replace("/backstage/approve/" + path).catch((err) => {
        err;
      });
    },
  },
};
</script>
<style scoped>
</style>
