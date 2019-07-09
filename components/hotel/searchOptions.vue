<template>
  <div class="container">
    <el-col :span="14">
      <el-row type="flex">
        <el-col :span="3">区域:</el-col>
        <el-col :span="21">
          <div class="area-name" :class="{show:ifShow}">
            <span class="name-all">全部</span>
            <a href="Javascript:;" v-for="(item,index) in areaList" :key="index">{{item.name}}</a>
          </div>
          <div>
            <i class="iconfont icon-shuangxiajiantou" @click="ifShow = !ifShow" ></i>
            <span>等个{{areaList.length}}区域</span>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="3">攻略:</el-col>
        <el-col :span="21">
          <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿</div>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="3">
          均价
          <i class="el-icon-question"></i>:
        </el-col>
        <el-col :span="21" class="average">
          <div v-for="(item,index) in averagePriceList" :key="index">
            <i class="iconfont icon-huangguan" v-for="(item2,index2) in item.grade" :key="index2"></i>
            <em>￥{{item.price}}</em>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 区域数据
      areaList: [],
      // 均价数据
      averagePriceList: [
        {
          grade: 3,
          price: 332
        },
        {
          grade: 4,
          price: 521
        },
        {
          grade: 5,
          price: 768
        }
      ],
      //   是否显示全部区域
      ifShow: false
    };
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: "南京"
      }
    }).then(res => {
      const { data } = res.data;
      this.areaList = data[0].scenics;
      // console.log(data[0].scenics);
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  font-size: 14px;
  color: #666;
  padding-right: 20px;
  .el-row {
    padding: 10px 0;
    .area-name {
      height: 40px;
      overflow: hidden;
      .name-all {
        background-color: #eee;
      }
      a {
          display: inline-block;
        padding: 0 10px;
        &:hover{
            color: aqua;
            text-decoration: underline;
        }
      }
    }
    .average {
      div {
        display: inline-block;
        margin-right: 20px;
        i {
          color: orange;
        }
      }
    }
  }
  .show {
    height: 150px !important;
  }
}
</style>


