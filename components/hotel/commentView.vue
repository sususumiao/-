<template>
  <div>
    <div v-for="(item,index) in data" :key="index">
        <!-- {{item}} -->
      <!-- <p class="comment-contre">{{item.content}}</p>
      <el-input v-model="reply" placeholder="添加回复"></el-input> -->
      <!-- <commentView :data="item.followed" /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "commentView",
  props: {
    data: {
      type: Object,
      default: {
          content:''
      }
    }
  },
  data() {
    return {
      // 回复数据
      reply: ""
    };
  },
  mounted () {
      console.log(this.data)
  }
};
</script>
<style lang="less" scoped>
.comment-contre {
  display: block;
  padding: 10px 0;
  color: #666;
}
</style>

