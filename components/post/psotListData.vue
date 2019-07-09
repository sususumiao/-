<template>
  <div class="xxxxx">
    <div>
      <div v-for="(item,index) in PsotListData" :key="index">
        <div>{{item.title}}</div>
        <div v-html="item.summary" class="zzzzz"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PsotListData: {}
    };
  },
  mounted() {
    this.$axios({
      url: "posts"
    }).then(({ data }) => {
      console.log(data);
      this.PsotListData = data.data;
    });
  }
};
</script>
<style lang='less' scoped>
.xxxxx {
  width: 900px;
//   height: 500px;
}
.zzzzz{
    margin: 10px;
    
}
</style>