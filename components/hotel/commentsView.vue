<template>
  <div class="container">
    <el-row class="comment-row" v-for="(item,index) in commentList" :key="index">
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
        <!-- <CommentView :data="item"/> -->
        <p class="comment-contre">{{item.content}}</p>
        <el-input v-model="reply" placeholder="添加回复"></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import CommentView from "@/components/hotel/commentView"
export default {
  name:'comments-view',
  data() {
    return {
      total:0,
    //   评论数据
    commentList:[]
    };
  },
  mounted () {
      this.$axios({
          url:'http://157.122.54.189:9095/hotels/comments',
          params:{
              id:this.$route.query.id
          }
      }).then(res=>{
          const{data} = res.data
          this.commentList = data
          this.total = res.data.total
          console.log(this.commentList)
      })
  },
  components:{
    // CommentView
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
  
}
</style>


