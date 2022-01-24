<template>

</template>

<script>
export default {
  mounted(){
    location.href = "https://oauth.shu.edu.cn/oauth/authorize?response_type=code&client_id=V8Ld28d97X4dBh725fK49XUd77dCk791&" +
      "redirect_uri=http://10.10.10.81/login&scope=1"
  },
  name: "oauth"
}
</script>

<style scoped>

</style>
