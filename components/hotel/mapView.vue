<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  mounted() {
    const { data } = this.data;
    console.log(data)
    // 加载地图
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        center: [118.8718107, 31.32846821], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      var marker = new AMap.Marker({
        content:
          "<div class='iconfont icon-dingwei'>1</div>",
        position: new AMap.LngLat(
          118.8718107, 31.32846821
        ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "1"
      });
      this.map = map;
      map.add(marker);
    };
    // const key = "67fa3c530cdb8414bd213135172329c7";
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=67fa3c530cdb8414bd213135172329c7&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>


