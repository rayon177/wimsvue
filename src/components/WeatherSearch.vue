<template>
  <div>
    <!-- <input type="text" v-model="city" @keyup.enter = "findByNameHis">  -->
    <el-input v-model="city" @change = "findByNameHis" 
    style="width: 80px ; margin: 10px"
     size="small"
     ></el-input>
    <!-- <button @click="findByNameHis">查询</button> -->
    <el-button @click="findByNameHis" size="small" >查询</el-button>
    <div id="container" style="min-width:400px;height:700px"></div>
  </div>
</template>

<script>
import HighStock from 'highcharts/highstock'
export default {
  data(){
    return{
      dataL:[],
      dataH:[],
      city:localStorage.getItem("city")
  }},

  methods: {
        findByNameHis() {//查询用户默认城市的近期天气信息
            this.$http.get(
              // "http://localhost:8888/wims/weather/searchByNameHis",
               'api/wims/weather/searchByNameHis',
            {
              params: {
                city:this.city,
              }
            })
            .then((res) => {
              console.log(res.data);
              this.data= res.data;
            HighStock.setOptions({
                // 所有语言文字相关配置都设置在 lang 里
            lang: {
                resetZoom: '恢复缩放',
                resetZoomTitle: '重置缩放比例',
                downloadPNG: '下载PNG文件',
                downloadJPEG: '下载JPE图片',
                downloadPDF: '下载PDF文件',
                downloadSVG: '下载SVG文件',
                loading: "加载中",
                rangeSelectorZoom: '<b>周期范围选择</b>',
                rangeSelectorFrom:"开始日期",
                rangeSelectorTo:"截至日期",
            }
        } )
      HighStock.stockChart('container', {

          chart: {
                            zoomType: 'x',
                            selectionMarkerFill: 'rgba(0,0,0, 0.2)',
                            panning: true,
                            panKey: 'ctrl',
                            resetZoomButton: {
                                // 按钮定位
                                position: {
                                    align: 'right', // by default
                                    verticalAlign: 'top', // by default
                                    x: 0,
                                    y: -30
                                },
                                // 按钮样式
                                theme: {
                                    fill: 'white',
                                    stroke: 'silver',
                                    r: 0,
                                    states: {
                                        hover: {
                                            fill: '#41739D',
                                            style: {
                                                color: 'white'
                                            }
                                        }
                                    }
                                }
                            }
                        },
        rangeSelector: {
            buttons: [{
            type: 'month',
            count: 1,
            text: '月'
          }, {
            type: 'month',
            count: 3,
            text: '季度'
          },{
            type: 'year',
            count: 1,
            text: '年'
          }, {
            type: 'all',
            text: '所有'
          }],
          selected:1,
          inputDateFormat: '%Y-%m-%d',
          inputEditDateFormat: '%Y-%m-%d',
        },
        title: {
          text: this.city + '历史天气'
        },
        plotOptions: {
          series: {
            showInLegend: true
          }
        },
        tooltip: {
          split: false,
          shared: true
        },
        series: [
          {
          // type: 'line',
          id: '000002',
          name: '最高高温',
          data: this.data[0]
        },
          {
          // type: 'line',
          id: '000001',
          name: '最低气温',
          data: this.data[1]
        },
        
        ]
      });
            });
        },
    },

    created(){
       this.findByNameHis();
    }
}

</script>

<style>
.high {
  width: 70em;
  height: auto;
  margin: 2em auto;
  float: left;
  display: inline;
}
</style>
