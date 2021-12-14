<template>
  <div>
    <common-table :approve_type="approve_type"></common-table>
  </div>
</template>

<script>
import commonTable from "@/views/backstage/approve/approves/common_approve_table";
export default {
  name: "member_table",
  components: {commonTable},
  data(){
    return{
      approve_type:"member",
    }
  },
}
</script>

<style scoped>

</style>
