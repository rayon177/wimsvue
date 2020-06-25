<template>
  <div>
          <!-- <h1>欢迎使用天气查询系统！</h1> -->
        <!-- <div>
        <router-link to="/home">主页</router-link>
        <router-link to="/home/WeatherSearch">天气查询</router-link>
        <router-link to="/home/WeatherPush">天气信息推送</router-link>
        <router-link to="/home/UserManage">用户管理</router-link>
         </div> -->
         <!-- <router-view></router-view> -->
        <div>
          <div >
            <el-row>
                   <el-col :span="6" :offset="9">
                      <span style="font-weight:400 ;font-size: 25px  " >当前城市: <el-input  v-model="city"  
           :placeholder=city 
           @change="findByName"
           style="width: 120px ; margin: 10px"
            ></el-input></span>

                   </el-col>
          </el-row>
            
          </div>

           <template>
          <el-table
            :data="weatherList"
            style="width: 100%  "
            :header-cell-style="headClass"
            :cell-style="rowClass"
            border
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              label="日期"
              >
            </el-table-column>
            <el-table-column
              prop="tem_max"
              label="最高气温"
              >
            </el-table-column>
            <el-table-column
              prop="tem_min"
              label="最低气温">
            </el-table-column>
             <el-table-column
              prop="status"
              label="天气">
            </el-table-column>
             <el-table-column
              prop="wind_direction"
              label="风向">
            </el-table-column>
            <el-table-column
              prop="wind_power"
              label="风力">
            </el-table-column>
              
          </el-table>
          </template>
    </div>
   
  </div>  
</template>

<script>
export default {
    name:"Home",
    data(){
      return{
        city:"",
        weatherList:[],
      }
    },

    methods: {
        findByName() {//查询用户默认城市的近期天气信息
            this.$http.get(
              // "http://localhost:8888/wims/weather/searchByName",
               'api/wims/weather/searchByName',
            {
              params: {
                city:this.city,
              }
            })
            .then((res) => {
              console.log(res);
              this.weatherList= res.data;
            });
        },

          tableRowClassName({row, rowIndex}) {
           // console.log(row);
        if (row.tem_max >= 30) {
          return 'hot';
        } else if (row.tem_max <= 10) {
          return 'fre';
        }
        return 'nom';
      },

       headClass () {
       return 'text-align: center;background:#eef1f6;'
        },

        rowClass () {
       return 'text-align: center;'
        }
    },

    created(){
            this.city = localStorage.getItem("city");
            this.findByName();
        },
  
    

}
</script>

<style>
 .el-table .hot {
    background: #ffdbd9;
    
  }

  .el-table .nom {
    background: #dbffdb;
  }

   .el-table .fre {
    background: #b6eafe;
  }
   * {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin: 0;
  padding: 0;
}
</style>