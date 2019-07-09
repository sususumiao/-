<template>
  <el-popover 
  placement="bottom" 
  width="300" 
  trigger="click" 
  v-model="visible"
  >
    <el-input
      readonly
      placeholder="人数未定"
      :value="totalCountLabel"
      slot="reference"
      @click="visible = !visible"
      class="input"
    >
      <i slot="suffix" class="el-input__icon iconfont iconuser"></i>
    </el-input>
    <el-row type="flex" :gutter="10" align="middle">
      <el-col>每间</el-col>
      <el-col>
        <el-select
          size="mini"
          :value="adultCount + ' 成人'"
          placeholder="请选择"
          @change="handleAudltChange"
        >
          <el-option v-for="item in adultMemberList" :key="item" :value="item" />
        </el-select>
      </el-col>
      <el-col>
        <el-select
          size="mini"
          :value="childCount + ' 儿童'"
          placeholder="请选择"
          @change="handleChildChange"
        >
          <el-option v-for="item in childMemberList" :key="item" :value="item" />
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end" class="btn-col">
      <el-button size="mini" @click="onClick" type="primary">确定</el-button>
    </el-row>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {
        //选中的数据
      visible:false,
      totalCountLabel:null,//
      adultCount:'',
      childCount:'',
      adultMemberList:[],
      childMemberList:[]

    };
  },
  methods: {
    onClick(){
        this.visible = false
    },
    handleAudltChange(v) {
      this.adultCount = v
    },
    handleChildChange(ev) {
      console.log(ev);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.btn-col {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
.input{
    width: 150px;
}
</style>


