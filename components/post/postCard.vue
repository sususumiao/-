<template>
  <div class="conten">
    <div class="reight clearfix">
      <input type="text" placeholder="请输入想去的地方，比如：“广州”" v-model="search" />
    </div>
    <div class="recommend">
      <div>
        推荐:
        <a href="javascript:;">广州</a>
        <a href="javascript:;">上海</a>
        <a href="javascript:;">北京</a>
      </div>
      <div class="recommendvv">
        <h2>推荐攻略</h2>
        <span @click="traveldiary">写游记</span>
      </div>
      <!-- 文章 -->
      <div class="xxx">
        <div>
          <div v-for="(item,index) in newPsotListData" :key="index +'r'" @click='TheArticleDetails(item.id)'>
            <h4>{{item.title}}</h4>
            <div class="zzz">
              <img
                v-for="(item2,index1) in item.images"
                :key="index1+'r'"
                :src="item2"
                alt
                v-show="item.images.length<=1"
              />
              <div class="vvv" v-html="item.summary"></div>
              <img
                v-for="(item1,index2) in item.images"
                :key="index2"
                :src="item1"
                alt
                v-show="item.images.length>1&&index2<3"
              />
              <div>
                <span>北京市</span>
                <span>by</span>
                <span>头像</span>
                <span>地球发动机</span>
                <span>·1005</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagIndex"
        :page-sizes="[1, 2, 3]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { async } from "q";
export default {
  data() {
    return {
      // 搜索值
      search: "",
      // 总页数
      total: 0,
      // 总数据
      PsotListData: [],
      // 渲染数据
      newPsotListData: [],
      // 缓存数据
      chunPsotListData: [],
      // 当前页
      pagIndex: 0,
      // 每页显示数据量
      pageSize: 3
    };
  },

  methods: {
    TheArticleDetails(id){
      this.$router.push({
        path:"post/detail",
        query:{
          id
        }
      })
    },
    getPostDataList() {
      this.$axios({
        url: `http://157.122.54.189:9095/posts?_start=${this.pagIndex}&_limit=${this.pageSize}`
      }).then(({ data }) => {
        console.log(data);
        this.total = data.total;
        this.chunPsotListData = JSON.parse(JSON.stringify(data.data));
        this.newPsotListData = JSON.parse(JSON.stringify(data.data)).splice(
          0,
          3
        );
        this.PsotListData = JSON.parse(JSON.stringify(data.data));
      });
    },
    traveldiary() {
      this.$router.push("/post/traveldiary");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPostDataList();
    },
    handleCurrentChange(val) {
      this.pagIndex = val;
      this.getPostDataList();
    }
  },
  mounted() {
    this.getPostDataList();
  }
};
</script>
<style lang='less' scoped>
// 文章列表部分
.xxx {
  height: 100%;

  .zzz {
    .vvv {
      height: 65px;
      display: inline-block;
      width: 748px;
    }
  }
  h4 {
    margin: 15px 0;
    &:hover {
      color: #ffb800;
    }
  }
  img {
    display: inline-block;
    width: 240px;
    height: 150px;
  }
  div {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
// 搜索部分
.conten {
  height: 100%;
  .reight {
    float: left;
    margin-top: 28px;
    margin-left: 10px;
    input {
      width: 720px;
      height: 40px;
      border: 2px solid #ffb800;
    }
  }
  .left {
    float: left;
  }
}
.recommend {
  width: 720px;
  float: left;
  margin-left: 10px;
  .recommendvv {
    border-bottom: 1px solid #999;
    color: #ffb800;
    h2 {
      display: inline-block;
      margin-top: 5px;
      padding-bottom: 15px;
      border-bottom: 2px solid #ffb800;
    }
    span {
      float: right;
      display: block;
      width: 130px;
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
      border-radius: 10px;
      background: #66b1ff;
      color: #fff;
      &:hover {
        color: aliceblue;
        background: #5289d1;
      }
    }
  }
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
</style>