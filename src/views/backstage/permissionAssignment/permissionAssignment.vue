<template>
  <div>
    <el-dialog title="权限分配" :visible.sync="identityAssignmentVisible">
      <el-descriptions title="用户信息" :column="3" border>
        <template slot="extra">
          <el-checkbox-group v-model="chosen_identity" size="medium">
            <el-checkbox-button v-for="identity in identities" :label="identity" :key="identity">{{ identity }}
            </el-checkbox-button>
          </el-checkbox-group>
        </template>
        <el-descriptions-item label="工号">{{ chosen_user_table.userId }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ chosen_user_table.name }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{ chosen_user_table.department }}</el-descriptions-item>
        <el-descriptions-item v-for="identity in chosen_user_table.identity" :key="identity" label="权限">
          {{ identity }}
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="identityAssignmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-main>
      <el-table
        :data="tableData.filter(data => !search ||
                                data.name.toLowerCase().includes(search.toLowerCase()) ||
                                data.userId.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="工号"
          prop="userId">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="部门"
          prop="department">
        </el-table-column>
        <el-table-column
          label="权限"
          prop="identity"
          :formatter="identity_formatter">
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="medium"
              placeholder="输入姓名或工号搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="assign(scope.row)">
              权限设置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import {getUserList, assignIdentity} from "@/api/permission_assignment";

const identityOptions = ['学院秘书', '部门领导', '委员'];
export default {
  name: "permissionAssignment",
  mounted() {
    getUserList().then(res => {
      if (res.data.code === 200) {
        this.tableData = res.data.data.userInfoList;
      }
    })
  },
  data() {
    return {
      identityAssignmentVisible: false,
      tableData: [],
      search: '',
      identities: identityOptions,
      chosen_identity: [],
      chosen_user_table: []
    }
  },
  methods: {
    identity_formatter(row) {
      return row.identity.join(", ");
    },
    assign(row) {
      console.log(row)
      this.identityAssignmentVisible = true;
      this.chosen_user_table = row;
    },
    submit() {
      assignIdentity(this.chosen_user_table, this.chosen_identity).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: res.data.message,
            type: 'warning'
          });
        }
        this.reload();
        // location.reload();
      })
    },
    reload: function (){
      var {search,href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g,'')
      window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
    }
  }
}
</script>

<style scoped>

</style>
