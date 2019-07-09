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
  },
  mounted() {
    // 搜索框内容与vuex里同步
    // console.log(this.$store.state.post.searchValue)
    this.searchValue = this.$store.state.post.searchValue
    // 请求获取城市菜单列表
    this.$axios({
      url: "/posts/cities",
    }).then(result => {
      const { data } = result.data;
      this.menusList = data;
    })
  },
  methods: {
    // 鼠标移入侧导航栏时事件
    handleMenuLeave() {
      this.menusIndex = "";
      this.menusShow = false;
    },
    // 显示子项
    handleMenuEnter(index) {
      this.menusIndex = index;
      this.menusShow = true;
      this.currentCities = this.menusList[index].children;
    },
    // 实现搜索功能
    handleSearchSubmit(){
      this.$store.commit('post/setSearchValue',this.searchValue)
      this.$store.dispatch('post/getList')
      console.log(this.$store.state.post.searchValue)
    },
    // 点击搜索关键词时事件
    handleSetSearchValue(value){
      this.$store.commit('post/setSearchValue',value)
    },
    // 写文件事件
    handelPushCreate(){
      const token = this.$store.state.user.userInfo.token
      // 判断是否有token值
      if(token){
        this.$router.push('/post/create')
      }else{
        this.$router.push('/user/login?post=""&create=""')
      }
      
    }
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