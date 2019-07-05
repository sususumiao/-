<template>
  <div>
    <el-row type="flex"  class="search">
      <el-col :span="8">
        <em>
          价格
          <i>{{priceInitialize}}-{{priceAll}}</i>
        </em>
        <el-slider v-model="price" :format-tooltip="formatTooltip"></el-slider>
      </el-col>
      <el-col :span="6" v-for="(item,index) in list" :key="index">
        <em>{{item.name}}</em>
        <!-- 搜索框 -->
        <FilterView :list="item.data"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FilterView from "./filterView"
export default {
  data() {
    return {
      price: 100,
      priceInitialize: 0,
      priceAll: 0,
      list: [
        {
          name: "住宿等级",
          data:[]
        },
        {
          name: "住宿类型",
          data:[]
        },
        {
          name: "住宿酒店",
          data:[]
        },
        {
          name: "酒店品牌",
          data:[]
        }
      ]
    };
  },
  components:{
      FilterView
  },
  methods: {
    formatTooltip(val) {
      this.priceAll = val * 40;
      return val * 40;
    }
  },
  mounted () {
      //   获取筛选列表
    this.$axios({
        url:'/hotels/options'
    }).then(res=>{
        const {data} = res.data
        this.list[0].data = data.levels
        this.list[1].data = data.types
        this.list[2].data = data.assets
        this.list[3].data = data.brands
        console.log(data)
    })
  }
};
</script>
<style lang="less" scoped>
.search {
  border: 1px solid #666;
  color: #666;
  font-size: 14px;
  .el-col-8 {
    padding: 13px;
    i {
      margin-left: 140px;
    }
  }
  .el-col-6 {
    border-left: 1px solid #666;
    padding: 10px;
  }
}
</style>


