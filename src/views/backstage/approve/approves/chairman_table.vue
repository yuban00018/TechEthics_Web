<template>
  <div>
    <common-table :approve_type="approve_type"></common-table>
  </div>
</template>

<script>
import commonTable from "@/views/backstage/approve/approves/common_approve_table";
export default {
  name: "chairman_table",
  components: {commonTable},
  data(){
    return{
      approve_type:"chairman",
    }
  },
}
</script>

<style scoped>

</style>
