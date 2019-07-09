<template>
  <div class="container">
    <el-row class="comment-row" v-for="(item,index) in data" :key="index">
      <el-col :span="3">
        <!-- 头像 -->
        <div class="block">
          <el-avatar
          class="head"
            :size="50"
            src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90"
          ></el-avatar>
          <p>2019-6-26</p>
        </div>
      </el-col>
      <el-col :span="21">
        <p class="comment-contre">{{item.content}}</p>
        <el-input v-model="reply" placeholder="添加回复,请按回车"></el-input>
        <comments-view :data="item.followed" v-if="item.followed"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import CommentView from "@/components/hotel/commentView"
export default {
  name:'comments-view',
  props:['data'],
  data() {
    return {
       // 回复数据
      reply: ""
    };
  },
  mounted () {
    
  },
  components:{
  }
};
</script>
<style lang="less" scoped>
.comment-row {
  padding: 30px 0;
  border-top: 1px dashed #ccc;
  .head{
      border: 2px solid orange;
  }
  .comment-contre {
  display: block;
  padding: 10px 0;
  color: #666;
}
}
</style>


