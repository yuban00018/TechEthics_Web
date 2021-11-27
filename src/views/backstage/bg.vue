
<template>
  <div id="backstage_bg">
    <div id="darkblue_bg">
      <img id="shu_badge" src="@/assets/shu_pic.png"  alt=""/>
      <div id="info">欢迎: {{information}}</div>
      <el-button size="mini" @click="logout()" type="primary" id="logoutButton">退出登录</el-button>
    </div>
    <div id="el-sidebar">
    <el-menu
      router
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#f0f8fa"
      text-color="#000"
      active-text-color="#245086">
      <el-menu-item @click="jmp('tutorial')" index="1">
        <template slot="title">
          <i class="el-icon-question"></i>
          <span @click="jmp('tutorial')">申报指南</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="jmp('application')" index="1">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span @click="jmp('application')">申请</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="jmp('applications')" index="3">
        <i class="el-icon-notebook-2"></i>
        <span @click="jmp('applications')" slot="title">我的申请</span>
      </el-menu-item>
      <el-menu-item @click="jmp('approve')" v-if="!hideApprove" index="4">
        <i class="el-icon-s-check"></i>
        <span @click="jmp('approve')" slot="title">项目审批</span>
      </el-menu-item>
    </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "backstage_bg",
  data() {
    return {
      information: "",
      changeInfoDialogVisible: false,
      infoForm: { email: "", fax: "", mobilePhone: "", officePhone: "" },
      hideApprove:true,
    };
  },
  mounted() {
    this.info_update();
    const identities = JSON.parse(localStorage.getItem('identity'));
    if (
      !identities.includes("普通用户")
     ) this.hideApprove = false;
  },
  methods: {
    handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
    updateInfo() {
      axios({
        method: "post",
        url: "/user/updateInfo",
        data: {
          email: this.infoForm.email,
          fax: this.infoForm.fax,
          mobilePhone: this.infoForm.mobilePhone,
          officePhone: this.infoForm.officePhone,
        },
      })
        .then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem("email", this.infoForm.email);
            localStorage.setItem("office_phone", this.infoForm.officePhone);
            localStorage.setItem("phone", this.infoForm.mobilePhone);
            localStorage.setItem("fax", this.infoForm.fax);
            this.changeInfoDialogVisible = false;
            this.$message({
          message: '成功',
          type: 'success'
        });
          } else
            this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    jmp: function (path) {
      this.$router.replace("/backstage/" + path).catch((err) => {
        err;
      });
    },
    info_update() {
      axios({
        url: "/user/info?userId=" + localStorage.getItem("userId"),
        method: "get",
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.information = res.data.data.name + " " + res.data.data.userId;
            localStorage.setItem("email", res.data.data.email);
            this.infoForm.email = res.data.data.email;
            localStorage.setItem("institution", res.data.data.department);
            localStorage.setItem("office_phone", res.data.data.officePhone);
            this.infoForm.officePhone = res.data.data.officePhone;
            localStorage.setItem("phone", res.data.data.mobilePhone);
            this.infoForm.mobilePhone = res.data.data.mobilePhone;
          } else this.information = res.data.code;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/").catch((err) => {
        this.$message.error(err);
      });
    },
  },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- background: rgba(0, 0, 0, 0); -->
<style scoped>
#info {
  width: 200px;
  right: 10%;
  top: 36px;
  font-size: 18px;
  position: absolute;
  color: white;
}
button#logoutButton {
  background: rgba(0, 0, 0, 0);
  height: 10%;
  width: 5%;
  position: absolute;
  left: 90%;
  top: 32px;
  font-size: 18px;
  color: white;
  border: 0;
  z-index: 5;
}
#darkblue_bg {
  width: 100%;
  height: 100px;
  background-image: linear-gradient(#245086,#245086);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
#shu_badge {
  height: 120%;
  width: 216px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.el-menu--popup {
width: 200px;
}
#el-sidebar{
  bottom: 0;
  width: 200px;
  top: 100px;
  left: 0;
  position: absolute;
  background-image: linear-gradient(#f0f8fa,#f0f8fa);
}
.content {
  background-image: linear-gradient(#ffffff,#ffffff);
  position: absolute;
  left: 200px;
  top: 100px;
  bottom: 0;
  right: 0;
  overflow: auto;
}
</style>
