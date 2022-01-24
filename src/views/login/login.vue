<template>
</template>
<script>
import {login} from "@/api/login";
import {setToken} from "@/utils/auth"
export default {
  name: "login",
  mounted(){
    this.Login()
  },
  data() {
    return {
      password: "",
      userId: "",
    };
  },
  methods: {
    Login: function () {
      login(this.$route.query.code, "http://10.10.10.81/login")
        .then((res) => {
          if (res.data.code === 200) {
            //console.log("test")
            setToken(res.data.data.token)
            localStorage.setItem("TokenKey", res.data.data.token);
            localStorage.setItem("userId", res.data.data.userId);
            localStorage.setItem("name", res.data.data.name);
            localStorage.setItem("identity",JSON.stringify(res.data.data.identity));
            localStorage.setItem("department", res.data.data.department);
            this.$router.push("backstage");
          } else this.$message.error(res.data.message);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style scoped>
</style>
