<template>
  <div>
    <el-row class="map">
      <!-- 地图 -->
      <el-col :span="16" class="map-left">
        <div id="container"></div>
      </el-col>
      <!-- tab栏 -->
      <el-col :span="8" class="map-rigth">
        <el-tabs v-model="place" @tab-click="handleClick">
          <el-tab-pane label="风景" name="scenicList">
            <ol class="map-height">
              <li v-for="(item,index) in scenicList" :key="index" class="map-li">
                <span>{{item.name}}</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="交通" name="trafficList">
            <ol class="map-height">
              <li v-for="(item,index) in trafficList" :key="index" class="map-li">
                <span>{{item.name}}</span>
              </li>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    scenicList: {
      type: Array,
      default: []
    },
    trafficList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      place: "scenicList",
      map: null,
      list: []
    };
  },
  methods: {
    init() {
      const scenicList = localStorage.getItem("scenicList");
      const trafficList = localStorage.getItem("trafficList");
      scenicList.forEach(v => {
        this.list.push(
          new AMap.Marker({
            content:
              "<div class='iconfont icon-dingwei' style='color:red; font-size:50px;'>1</div>",
            position: new AMap.LngLat(
              +v.location.split(",")[0],
              +v.location.split(",")[1]
            ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: v.name
          })
        )
      })
    }
  },
  mounted() {
    // 加载地图
    window.onLoad = function() {
      const latitude = localStorage.getItem("latitude");
      const longitude = localStorage.getItem("longitude");
      // console.log(hotel)
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        center: [longitude, latitude], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      var marker = new AMap.Marker({
        content:
          "<div class='iconfont icon-dingwei' style='color:red; font-size:50px;'>1</div>",
        position: new AMap.LngLat(118.871, 31.328), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "亮哥我喜欢你"
      });
      this.map = map;
      map.add(marker);  
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=67fa3c530cdb8414bd213135172329c7&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    // tab栏切换
    handleClick() {}
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
// 地图样式
.map {
  height: 360px;
  .map-left {
    height: 360px;
    width: 650px;
  }
  .map-rigth {
    padding-left: 20px;
    .map-height {
      height: 300px;
      overflow: auto;
    }
    .map-li {
      padding: 10px;
      font-size: 14px;
    }
  }
}
</style>


