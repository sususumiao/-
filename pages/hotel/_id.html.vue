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
              class="iconfont icon-huangguan orange"
              v-for="(item, index) in hotel.hotellevel.level"
              :key="index"
            ></i>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel-en-name">{{hotel.alias}}</span>
        </el-row>
        <el-row>
          <i class="el-icon-location"></i>
          {{hotel.address}}
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片显示 -->
    <div class="picture">
      <el-row>
        <el-col :span="16" class="picture-left">
          <img :src="piceList[0].url" alt />
        </el-col>
        <el-col :span="8" class="picture-right">
          <el-row>
            <div class="picture-col" v-for="(item,index) in piceList" :key="index">
              <img :src="item.url" alt />
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 中间价格 -->
    <el-table
      :data="hotel.products"
      style="width: 100%"
      class="info-row"
      :row-style="{cursor: 'pointer'}"
      @row-click="onPriceRowClick"
    >
      <el-table-column prop="name" label="价格来源" />>
      <el-table-column prop="bestType" label="低价房型" />
      <el-table-column label="最低价格/每晚" width="160">
        <template slot-scope="scope">
          <span class="height-light larger">￥{{scope.row.price}}</span>起
          <span>
            <i class="el-icon-arrow-right height-light" />
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 地图部分 -->
    <Map :scenicList="scenicList" :trafficList="trafficList" />
    <!-- 酒店信息 -->
    <div class="grogshop-message">
      <el-row class="message-row">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20" :gutter="10">
          <el-col :span="6">入住时间：14：00之后</el-col>
          <el-col :span="6">离店时间：12：00之前</el-col>
          <el-col :span="6">{{hotel.creation_time}}/{{hotel.renovat_time}}</el-col>
          <el-col :span="6">酒店规模：{{hotel.roomCount}}间客房</el-col>
        </el-col>
      </el-row>
      <el-row class="message-row">
        <el-col :span="4">主要设备</el-col>
        <el-col :span="20">
          <span v-for="(item,index) in hotel.hotelassets" :key="index">{{item.name}}</span>
        </el-col>
      </el-row>
      <el-row class="message-row">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">{{hotel.parking || '-'}}</el-col>
      </el-row>
      <el-row class="message-row">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">{{hotel.hotelbrand ? hotel.hotelbrand.name : '-'}}</el-col>
      </el-row>
    </div>
    <!-- 评分 -->
    <div class="comment">
      <p class="comment-title">{{comment.total}}条真实用户评论</p>
      <el-row class="comment-row">
        <el-col :span="4" class="comment-col">
          <p>总评数:{{hotel.all_remarks}}</p>
          <p>好评数:{{hotel.good_remarks}}</p>
          <p>差评数:{{hotel.bad_remarks}}</p>
        </el-col>
        <el-col :span="4" style="line-height='63px'">
          <el-rate
            v-model="hotel.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </el-col>
        <el-col :span="16" style="line-height='63px'">
          <span class="orange">环境</span>
          <span class="orange">产品</span>
          <span class="orange">服务</span>
        </el-col>
      </el-row>
    </div>
    <!-- 评论列表 -->
    <CommentsView :data="commentList" />
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
import Map from "@/components/hotel/map";
import CommentsView from "@/components/hotel/commentsView";
export default {
  data() {
    return {
      hotel: {
        hotellevel: {},
        pics: [{ url: "" }],
        location: {}
      },
      // 图片数据
      piceList: [
        {
          name: 1,
          url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
        },
        {
          name: 2,
          url: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
        },
        {
          name: 3,
          url: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
        },
        {
          name: 4,
          url: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
        },
        {
          name: 5,
          url: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
        },
        {
          name: 6,
          url: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
        }
      ],
      // 地图上的地方名
      place: "",
      // 评论数据
      comment: {
        total: 0
      },
      //   评论数据
      commentList: [],
      // 评论的总数
      total: 0,
      //
      pageIndex: 1,
      pageSize: 2,
      // 获取到是周围风景列表
      scenicList: [],
      // 获取到周围的交通列表
      trafficList: []
    };
  },
  components: {
    Map,
    CommentsView
  },
  mounted() {
    const {
      params: { id }
    } = this.$route;
    // console.log(id);
    this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { id }
    }).then(res => {
      this.hotel = res.data.data[0];
      localStorage.setItem("latitude", this.hotel.location.latitude);
      localStorage.setItem("longitude", this.hotel.location.longitude);
      // console.log(this.hotel);
      // 获取周围数据
      this.getPois("风景名胜").then(res => {
        // console.log(res)
        this.scenicList = res;
      });
      this.getPois("交通设施服务").then(res => {
        this.trafficList = res;
      });
    });

    // 获取评论数据
    this.getCommentList();
  },
  methods: {
    // 跳转到别的页面
    onPriceRowClick() {
      window.open("https://hotels.ctrip.com/hotel/694679.html");
    },
    // 获取评论数据
    getCommentList() {
      const {
        params: { id }
      } = this.$route;
      this.$axios({
        url: "http://157.122.54.189:9095/hotels/comments",
        params: {
          hotel: id,
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        const { data } = res.data;
        this.commentList = data;
        this.total = res.data.total;
      });
    },
    // 选择每页数据条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCommentList();
    },
    // 选择跳转到第几页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getCommentList();
    },
    // 获取周围数据
    getPois(data) {
      return this.$axios({
        url: "https://restapi.amap.com/v3/place/text?parameters",
        params: {
          city: this.hotel.real_city,
          location: `${this.hotel.location.longitude},${this.hotel.location.latitude}`,
          output: "json", //返回的类型
          types: data,
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res => {
        const { pois } = res.data;
        return pois;
        console.log(res);
      });
    }
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  // 图片样式
  .picture {
    .picture-left {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .picture-right {
      .picture-col {
        display: inline-block;
        width: 48%;
        // padding-left: 10px;
        padding-right: 5px;
        margin-bottom: 10px;
        img {
          width: 95%;
          height: 110px;
        }
      }
    }
  }
  // 酒店信息样式
  .grogshop-message {
    padding: 20px 0;
    .message-row {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #333;
      .el-col-20 {
        color: #777;
        span {
          display: inline-block;
          padding: 5px;
          background-color: #eee;
          border-radius: 3px;
          margin-right: 5px;
        }
      }
    }
  }
  // 评论样式
  .comment {
    margin-bottom: 40px;
    .comment-title {
      font-weight: 600;
      margin: 20px 0;

      .comment-row {
        .comment-col {
          p {
            color: #ccc;
          }
        }
      }
    }
  }
}
.nav {
  overflow: hidden;
  padding: 20px 0;
}
.orange {
  color: orange;
}
.height-light {
  color: #f90;
}
.larger {
  font-size: larger;
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