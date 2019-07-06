<template>
  <div>
    <el-row>
      <!-- 地方名搜索 -->
       <el-autocomplete
            v-model="name"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
            class="place"
          ></el-autocomplete>
      <!-- 时间选择 -->
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>
      <!-- 选择人数 -->
      <MemberSelector/>
      <el-button type="primary" class="button" @click="handelgetData">查看价格</el-button>
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
import MemberSelector from "@/components/hotel/memberSelector"
export default {
  data() {
    return {
      name: "南京", //地方名
      time: "", //时间日期
      city:[],
      id:0,

    }
  },
  methods: {
    // 搜索
    querySearchAsync(value, cb) {
      if (!value) {
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        if (newData.length > 0) {
          this.city = newData[0];
          this.$router.push('/hotel?city='+this.city.id)
        }
        cb(newData);
      });
    },
    //   点击查询价格时的事件
    handelgetData() {
      const enterTime = moment(this.time[0]).format("YYYY-MM-DD"); //入住的日期
      const leftTime = moment(this.time[1]).format("YYYY-MM-DD"); //离店的日期
      console.log(enterTime)
      this.$axios({
        url:'http://157.122.54.189:9095/hotels',
        params:{
          city:this.city.id,
          enterTime,
          leftTime
        }
      }).then(res=>{
        const {data} = res
        this.$emit('getGrogshop',data)
      })
    },
    handleSelect(val){
      console.log(val)
    }
  },
  components:{
    MemberSelector
  },
  mounted() {
    this.$router.push('/hotel?city=74')
  }
};
</script>
<style lang="less" scoped>
.place {
  width: 200px;
  margin-right: 10px;
}
.button {
  margin-left: 10px;
}

</style>


