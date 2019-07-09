<template>
  <div class="elconten">
    <div class="leftmax">
      <div @mouseleave="leave()">
        <div class="left-smax">
          <div v-for="(item,index) in tableData" :key="index" class="leftii">
            <div class="left" @mouseenter="enter(index)">
              {{item.type}}
              <span>></span>
            </div>
          </div>
        </div>
        <div
          v-for="(item2,index2) in tabledata_lists"
          :key="index2"
          v-show="cityindex===index2"
          class="chentenii"
        >
          <div v-for="(item3,index3) in item2" :key="index3">
            <span class="span1">
              <a href="jacascript:;">{{index3+1}} {{item3.city}}</a>
            </span>
            <span class="span2">
              <a href="javasctipt:;">{{item3.desc}}</a>
            </span>
            
          </div>
          
        </div>
        
      </div>
      
    </div>
    <!-- 推荐城市 -->
    <div class="recommend">
      <h3>推荐城市</h3>
      <a href="javascript:;">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" data-v-053600ae />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "digui",
  data() {
    return {
      tableData: [],
      tabledata_lists: [],
      hiedd: true,
      cityindex: false
    };
  },
  methods: {
    enter(index) {
      this.cityindex = index;

    },
    leave() {
      this.cityindex = false;
    }
  },

  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(({ data }) => {
      this.tableData = data.data;

      for (var i = 0; i < data.data.length; i++) {
        this.tabledata_lists.push(data.data[i].children);
      }

    });
  }
};
</script>
<style lang='less' scoped>
.leftmax {
  margin-right: 25px;
  height: 180px;
  // 推荐部分
  .leftii {
    line-height: 40px;
    border: 1px solid #ccc;
    width: 251px;
    height: 40px;
    margin-left: 260px;
    &:hover {
      color: #ffb800;
      border-right: none;
    }
    span {
      float: right;
      margin-right: 5px;
      color: #ffb800;
      font-size: 25px;
    }
  }
  .left-smax {
    float: left;
    margin-top: 30px;
  }
  .chentenii {
    z-index: 999;
    background: #ffff;;
    position: fixed;
    left: 510px;
    float: left;
    border: 1px solid #999;
    margin-top: 30px;
    .span1 {
      font-style: italic;
      margin-right: 10px;
      a {
        color: #ffb800;
      }
    }
    .span2 {
      a {
        color: #999;
      }
    }
    div {
      line-height: 40px;
      &:hover {
        border-left: none;
      }
    }
  }
}
// 推荐部分
.recommend {
  height: 1000px;
  width: 200px;
  margin: 20px 0px 10px 260px;
  border-bottom: 1px solid #666;
  a {
    img {
      width: 200px;
    }
  }
}
</style>