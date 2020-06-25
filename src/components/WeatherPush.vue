<template>
  <div>
    <el-table
     @selection-change="handleSelect"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;" height="400" >
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column  label="编号"
      type="index"
      width="50">
    </el-table-column>
   
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="城市" prop="city"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="用户类型" prop="user_type"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名的关键字进行搜索"/>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin:10px 0px;" @click="sendMessage" type="success" >推送天气信息</el-button>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                show: false,
                selected:[],
                form: {
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    user_type: '用户',
                    city: ''
                },
            }
        },
        methods: {
          handleSelect(val){
            // console.log(val);
            this.selected = val;
            console.log(this.selected);
          },
          sendMessage(){
            if(this.selected.length !=0){
                  this.$http.post("api/wims/message/send",this.selected).then(
                  res => {
                    if (res.data.status) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                           
                        });
                    } else {
                        this.$message.error({
                          message:res.data.msg,
                         

                        });
                    }
                  }
                )
            }
            else{
              this.$message.error({
                          message:"请选择需要推送天气用户！",
                
                        });
            }
          
          },


           findAllTableData(){
                this.$http.get("api/wims/user/users").then(
                  res => {
                   this.tableData = res.data;
                  }
                )
           },
            },
           
        created() {
           this.findAllTableData();
        }
    }
</script>

<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 600px;
    border-radius: 4px;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
