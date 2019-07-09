<template>
  <div class="conten">
    <el-row type="flex" justify="space-between">
       <!-- 左侧城市推荐 -->
      <Postlist />
      <!-- 文章列表 -->
      <PostCard />
    </el-row>
    <div>
    </div>
  </div>
</template>
<script>
import Postlist from "@/components/post/postlist";
import PostCard from "@/components/post/postCard";
export default {
  components: {
    // 左侧推荐部分
    Postlist,
    // 搜索部分
    PostCard
    // 文章列表
  }
};
</script>
<style lang='less' scoped>
.conten {
  width: 1000px;
  .left2 {
    width: 300px;
  }
}
</style>