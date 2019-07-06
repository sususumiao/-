<template>
  <div class="container">
    <el-row
      type="flex"
      justify="space-between"
      v-for="(item,index) in data.data"
      :key="index"
      class="main"
    >
      <el-col :span="8" class="left">
        <nuxt-link :to="'/hotel/'+item.id+'.html'">
          <img :src="item.photos" alt />
        </nuxt-link>
      </el-col>
      <el-col :span="11" class="contre">
        <nuxt-link :to="'/hotel/'+item.id+'.html'">
          <h2 class="contre-title">{{item.name}}</h2>
        </nuxt-link>
        <p class="contre-english-title">
          <span>{{item.alias}}</span>
          <i
            v-for="(item2,index2) in item.hotellevel&&item.hotellevel.level"
            :key="index2"
            class="icon-huangguan iconfont orange"
          ></i>
          {{item.hoteltype.name}}
        </p>
        <!-- 中间评分模块 -->
        <div class="contre-grade">
          <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <span>
            <em class="orange">30</em>
            条评价
          </span>
          <span>
            <em class="orange">15</em>
            篇游记
          </span>
        </div>
        <!-- 位置 -->
        <span class="contre-location">
          <i class="el-icon-location"></i>
          位于:{{item.address}}
        </span>
      </el-col>
      <el-col :span="5" class="right">
        <div v-for="(item3,index3) in item.products" :key="index3" class="right-row">
          <span>{{item3.name}}</span>
          <div class="right-fr">
            <em class="orange">￥{{item3.price}}</em>起
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        data: {}
      }
    }
  },
  data() {
    return {
      // 酒店数据
      dataList: [
        {
          hotellevel: {
            level: 0
          },
          hoteltype: {}
        }
      ],
      pageSize: 5,
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    getList() {
      this.$axios({
        url: "http://157.122.54.189:9095/hotels",
        params: {
          city: this.$route.query.city,
          price_lt: 4000
        }
      }).then(res => {
        const { data } = res.data;
        this.dataList = data;
        // this.$router.push('/hotel?city='+)
        // console.log(data);
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.$emit("getPageSize", val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.$emit("getPageIndex", val);
    }
  },
  mounted() {
    // console.log(this.data)
  }
};
</script>
<style lang="less" scoped>
.container {
  .main {
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
    // 左侧内容部分
    .left {
      img {
        width: 320px;
        height: 210px;
      }
    }
    // 中间内容部分
    .contre {
      .contre-title {
        font-size: 26px;
        font-weight: 500;
      }
      .contre-english-title {
        color: #aaa;
      }
      .contre-grade {
        margin: 10px 0;
        .el-rate {
          display: inline-block;
        }
        span {
          display: inline-block;
          padding-top: 2px;
          font-size: 15px;
          padding: 0 10px;
        }
      }
      .contre-location {
        color: #666;
        font-size: 14px;
      }
    }
    // 右边内容部分
    .right {
      padding-top: 20px;
      .right-row {
        padding: 10px;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #ccc;
        .right-fr {
          display: inline-block;
          float: right;
        }
        &:hover {
          background-color: #eee;
        }
      }
    }
    .orange {
      color: orange;
    }
  }
}
</style>


