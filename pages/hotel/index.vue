<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏 -->
    <BearchBar />
    <!-- 可搜索条件 -->
    <el-row type="flex" class="search-condition">
        <el-col :span="14">
            <SearchOptions/>
        </el-col>
        <el-col :span="10" class="map">
            <!-- 地图 -->
          <MapView width="420" height="420"/>
        </el-col>
    </el-row>
    <!-- 过滤条件 -->
    <ListFilter/>
  </div>
</template>
<script>
// 引入搜索栏组件
import BearchBar from "@/components/hotel/searchBar";
import SearchOptions from "@/components/hotel/searchOptions";
import MapView from "@/components/hotel/mapView";
import ListFilter from "@/components/hotel/listFilter";
export default {
  data() {
    return {};
  },
  components: {
    BearchBar,
    SearchOptions,
    MapView,
    ListFilter
  },
  mounted () {
    
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  width: 1000px;
  /deep/ .el-carousel__container {
    height: 700px;
  }
  .bread-nav{
      padding: 15px 0;
  }
  .search-condition{
    padding: 10px 0;
    .map{
      padding-left: 10px;
    }
  }
}
</style>


