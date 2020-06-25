<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;" height="400" >
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
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-popconfirm
            confirmButtonText='好的'
            cancelButtonText='不用了'
            icon="el-icon-info"
            iconColor="red"
            title="确定要删除当前用户吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button size="mini"
                       type="danger"
                       slot="reference">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>



    <el-button style="margin:10px 0px;" @click="saveUserInfo" type="success" size="mini">添加</el-button>

    <transition name="el-zoom-in-center">
      <div v-show="show" class="transition-box">
        <el-form :hide-required-asterisk="false" :rules="rules" ref="userForm" :model="form" label-suffix=":"
                 label-width="80px">

          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
           <el-form-item  label="密码" prop="password"  >
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
           <el-form-item label="昵称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
           <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="用户类别">
            <el-radio-group v-model="form.user_type">
              <el-radio label="用户"></el-radio>
              <el-radio label="管理员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('userForm')">保存信息</el-button>
            <el-button @click="reset">重置</el-button>
             <el-button @click="cancel">取消编辑</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                show: false,
                form: {
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    user_type: '用户',
                    city: ''
                },
                rules: {
                    name: [
                        {required: true, 
                        message: '请输入用户姓名!', trigger: 'blur'},
                       
                    ],
                    username: [
                        {required: true, message: '请输入用户账号!', trigger: 'blur'}, 
                         { //^表示开头 $表示结束 \s表示空格
                           pattern: /^[a-zA-Z0-9\s]{4,20}$/, message: '用户名长度为4-20字符',
                           trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入用户密码!', trigger: 'blur'},
                             {
                           pattern: /^[a-zA-Z0-9\s]{4,20}$/, message: '密码长度为4-20字符',
                           trigger: 'blur'
                        }
                    ], 
                    city: [
                        {required: true, message: '请输入用户城市!', trigger: 'blur'},
                    ], 
                    email: [
                        {required: true, message: '请输入用户邮箱!', trigger: 'blur'},
                            {
                           pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请输入正确邮箱',
                           trigger: 'blur'
                        }
                        
                    ], 
                }
            }
        },
        methods: {
            cancel(){
                this.show = !this.show;
            },
           reset(){
             this.form = {user_type: '用户'};
           },
           findAllTableData(){
                this.$http.get("api/wims/user/users").then(
                  res => {
                   this.tableData = res.data;
                  }
                )
           },

            saveUserInfo() {//点击添加时清空信息
                this.show = !this.show;
                this.form = {user_type: '用户'};
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.show = true;//展示编辑表单
                this.form = row;//回显编辑信息
            },
            handleDelete(index, row) {
                console.log(index, row);
                //发送axios请求处理删除
                let id = row.user_id;
                this.$http.delete("api/wims/user/delete/"+id).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.findAllTableData();//刷新数据
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            },
            onSubmit(userForm) {
                this.$refs[userForm].validate((valid) => {
                    if (valid) {
                        //发送一个ajax请求
                        this.$http.post("api/wims/user/saveOrUpdate", this.form).then(res => {
                            console.log(res.data);
                            if (res.data.status) {
                                this.$message({
                                    message: '恭喜你，' + res.data.msg,
                                    type: 'success'
                                });
                                //清空表单信息
                                this.form = {sex: '男'};
                                //隐藏表单
                                this.show = false;
                                //调用刷新数据的方法
                                this.findAllTableData();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        this.$message.error("当前输入的数据不合法!!!");
                        return false;
                    }
                });
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
