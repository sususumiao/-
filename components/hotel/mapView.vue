<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    // 加载地图
    window.onLoad = function() {
      var map = new AMap.Map("container");
    };
    const key = "67fa3c530cdb8414bd213135172329c7";
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
  width: 420px;
  height: 260px;
  padding-left: 10px;
}
</style>


