<template>
  <div>
    <el-row>
      <!-- 地方名搜索 -->
      <el-input v-model="name" placeholder="请输入地方名" class="place"></el-input>
      <!-- 时间选择 -->
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>
      <el-button type="primary" class="button" @click="handelgetData">查看价格</el-button>
    </el-row>
  </div>
</template>
<script>
import moment from "moment"
export default {
  data() {
    return {
        name:"",//地方名
        time:"",//时间日期
    };
  },
  methods:{
    //   点击查询价格时的事件
    handelgetData(){
        const enterTime = moment(this.time[0]).format('YYYY-MM-DD');//入住的日期
        const leftTime = moment(this.time[1]).format('YYYY-MM-DD')//离店的日期
        // console.log(enterTime)
    }
  }
};
</script>
<style lang="less" scoped>
.place{
    width: 200px;
    margin-right: 10px;
}
.button{
    margin-left: 10px;;
}
</style>


