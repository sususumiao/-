<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/hotel'  }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotel.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotel.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 名称信息 -->
    <el-row class="name-info">
      <el-col>
        <el-row>
          <h4 class="hotel-cn-name">
            {{hotel.name}}
            <i
              class="iconfont iconhuangguan"
              v-for="(item, index) in hotel.hotellevel.level"
              :key="index"
            ></i>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel-en-name">{{hotel.alias}}</span>
        </el-row>
        <el-row>
          <i class="iconfont el-icon-location-outline"></i>
          {{hotel.address}}
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片显示 -->
    <div>
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">22</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">33</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">22</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">33</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">66</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">88</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="hotel.products" 
    style="width: 100%" 
    class="info-row"
    :row-style="{cursor: 'pointer'}"
    @row-click="onPriceRowClick"
    >
      <el-table-column prop="name" label="价格来源" />>
      <el-table-column  prop="bestType" label="低价房型" />
      <el-table-column  label="最低价格/每晚" width="160">
       <template slot-scope="scope">
            <span class="height-light larger">
              ￥{{scope.row.price}}
            </span>起
            <span>
              <i class="el-icon-arrow-right height-light" />
            </span>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import photoView from "@/components/hotel/photos";
export default {
  data() {
    return {
      hotel: {
        hotellevel: {}
      },
    };
  },
  components: {
    photoView
  },
  mounted() {
    this.$axios({
      url: "/hotels?id=1"
    }).then(res => {
      this.hotel = res.data.data[0];
      console.log(this.hotel);
    });
  },
  methods: {
      onPriceRowClick(){
          window.open('https://hotels.ctrip.com/hotel/694679.html')
      }
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.nav {
  overflow: hidden;
  padding: 20px 0;
}
.iconhuangguan {
  color: #f90;
}
.height-light {
      color: #f90;
}
 .larger {
      font-size: larger;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.name-info {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.hotel-cn-name {
  color: #333;
  font-weight: normal;
  font-size: x-large;
}
.hotel-en-name {
  margin-bottom: 0.5em;
}
.info-row {
  margin: 40px 0;
}
</style>