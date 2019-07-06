<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    window.onLoad = function() {
    //   var map = new AMap.Map("container");
    //   var toolbar = new AMap.ToolBar();
    //   map.addControl(toolbar);
    //   var marker = new AMap.Marker({
    //     position: new AMap.LngLat(113.727463,23.70696), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //     title: "猪宝的别墅"
    //   });
    //   map.add(marker);
    // };
    // var url =
    //   "https://webapi.amap.com/maps?v=1.4.15&key=67fa3c530cdb8414bd213135172329c7&callback=onLoad&plugin=AMap.ToolBar";
    // var jsapi = document.createElement("script");
    // jsapi.charset = "utf-8";
    // jsapi.src = url;
    // document.head.appendChild(jsapi);
    var map = new AMap.Map('container');
  }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 400px;
  height: 400px;
}
</style>

