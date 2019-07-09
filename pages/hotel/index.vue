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
    <SearchBar 
    @getGrogshop="getGrogshop" />
    <!-- 可搜索条件 -->
    <el-row type="flex" class="search-condition">
      <el-col :span="14">
        <SearchOptions />
      </el-col>
      <el-col :span="10" class="map">
        <!-- 地图 -->
        <MapView class="map-contre" :data="getList1" />
      </el-col>
    </el-row>
    <!-- 过滤条件 -->
    <ListFilter 
    @grogshopList="getList" 
    :pageSize="pageSize" 
    :pageIndex="pageIndex"/>
    <!-- 数据列表展现 -->
    <ItemView :data="getList1" @getPageSize="getPageSize" @getPageIndex="getPageIndex"/>
  </div>
</template>
<script>
// 引入搜索栏组件
import SearchBar from "@/components/hotel/searchBar";
// 引入区域数据
import SearchOptions from "@/components/hotel/searchOptions";
// 引入地图
import MapView from "@/components/hotel/mapView";
// 引入过滤条件选择框
import ListFilter from "@/components/hotel/listFilter";
// 引入数据展现
import ItemView from "@/components/hotel/itemView";
export default {
  data() {
    return {
      grogshopList1:{},
      // 酒店列表数据
      getList1:[],
      pageSize:5,
      pageIndex:1,
    };
  },
  components: {
    SearchBar,
    SearchOptions,
    MapView,
    ListFilter,
    ItemView
  },
  methods: {
    getGrogshop(data) {
      this.grogshopList1 = data
      
    },
    getList(data){
      // console.log(data)
      this.getList1 = data
    },
    // 获取分页条数
    getPageSize(val){
      this.pageSize = val
    },
    // 获取分页页数
    getPageIndex(val){
      this.pageIndex = val
    },
    // 获取酒店列表数据
    getGrogshopList(){
       this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: this.$route.query.city,
           _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize,
          price_lt: 4000
        }
      }).then(res => {
        const { data } = res;
        this.getList1 = data;
        // this.$router.push('/hotel?city='+)
        // console.log(data);
      });
    }
  },
  watch:{
    pageSize:function(){
      this.getGrogshopList()
    },
    pageIndex:function(){
      this.getGrogshopList()
    },
  },
  mounted() {
   this.getGrogshopList()
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
  .bread-nav {
    padding: 15px 0;
  }
  .search-condition {
    padding: 10px 0;
    .map {
      padding-left: 10px;
      width:420px;
      height:260px;
      .map-contre{
      width:420px;
      height:260px;
      }
    }
  }
}
</style>


