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
    <el-row class="map">
      <!-- 地图 -->
      <el-col :span="16">
        <MapView class="map-left" />
      </el-col>
      <!-- tab栏 -->
      <el-col :span="8">
        <el-tabs v-model="place" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div>
              <ol>
                <li>1212</li>
                <li>1212</li>
                <li>1212</li>
                <li>1212</li>
                <li>1212</li>
                <li>1212</li>
              </ol>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
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
    <!-- <CommentsView/> -->
  </div>
</template>
<script>
import MapView from "@/components/hotel/mapView";
import CommentsView from "@/components/hotel/commentsView";
export default {
  data() {
    return {
      hotel: {
        hotellevel: {},
        pics: [{ url: "" }]
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
    commentList:[],
    total:0,
    };
  },
  components: {
    MapView,
    CommentsView
  },
  mounted() {
    const {
      params: { id }
    } = this.$route;
    console.log(id);
    this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { id }
    }).then(res => {
      this.hotel = res.data.data[0];
      // console.log(this.hotel);
    });
    // 获取评论数据
    this.$axios({
          url:'http://157.122.54.189:9095/hotels/comments',
          params:{ id }
      }).then(res=>{
          const{data} = res.data
          this.commentList = data
          this.total = res.data.total
          console.log(res)
      })
  },
  methods: {
    onPriceRowClick() {
      window.open("https://hotels.ctrip.com/hotel/694679.html");
    },
    handleClick() {}
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
  // 地图样式
  .map {
    height: 360px;
    .map-left {
      height: 360px;
      width: 650px;
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
    margin-bottom: 40px;;
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