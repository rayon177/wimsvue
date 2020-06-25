<template>
  <div>
  
        
  <el-container>
  <el-header style="margin:0px; background: #eef1f6">
    
      <el-row :gutter="0" style="margin:10px 0px;">
      <el-col el-col :span="6"><div style="font-size:24px; ">天气信息管理系统</div></el-col>
      <el-col :span="3" :offset="15" boder=1px><div  style="font-size:14px;font-weight:600" > 
        你好：{{user}}  
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="确定要注销当前用户吗？"
            @onConfirm="logout"
          >
            <el-button size="mini"
                       slot="reference">注销
            </el-button>
          </el-popconfirm>
        </div></el-col>
        
      </el-row>

    
    </el-header>
  <el-container>
    <el-aside width="200px">
    
          <el-menu
      default-active="2" @select="handleSelect"
      class="el-menu-vertical-demo"
      >
            <el-menu-item index="/top/home">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/top/WeatherSearch">
              <i class="el-icon-sunny"></i>
              <span slot="title">天气查询</span>
            </el-menu-item>
            <el-menu-item index="/top/UserManage" v-if="isadmin">
              <i class="el-icon-coordinate"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/top/WeatherPush" v-if="isadmin">
              <i class="el-icon-message"></i>
              <span slot="title">天气信息推送</span>
            </el-menu-item>
          </el-menu>
             
        <!-- <router-link to="/top/home">首页</router-link>
        <router-link to="/top/WeatherSearch">天气查询</router-link>
         <router-link to="/top/UserManage">用户管理</router-link>
        <router-link to="/top/WeatherPush">天气信息推送</router-link> -->
   </el-aside>
   
    <el-main> <router-view></router-view> </el-main>
  
  
  </el-container>
</el-container>

 
  </div>
</template>

<script>
export default {
  data(){
    return {
      isadmin:false,
      user:localStorage.getItem("name"),
    }
  },
   methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push(key);
            },
            logout(){
                this.$router.push("/login");
            }
   },
   created(){
    //  console.log(this)
       this.$http.get(
              // "http://localhost:8888/wims/weather/searchByName",
               'api/wims/user/usertype',
            {
              params: {
                id:localStorage.getItem("id"),
              }
            })
            .then((res) => {
              console.log(res);
              this.UserType.userType= res.data.userType;
              console.log(this.UserType.userType);
               if(this.UserType.userType === "管理员"){
              this.isadmin = true;
          }
            });
           
    
   },

}
</script>

<style>

  * {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin: 0;
  padding: 0;
}
</style>