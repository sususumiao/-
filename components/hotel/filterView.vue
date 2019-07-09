<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-select
          v-model="condition"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="不限"
          @change="handelCondition"
        >
          <el-option
            v-for="(item,index) in list"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      radio: "",
      condition:[]
    }
  },
  methods:{
    // 获取选中的数据
    handelCondition(val){

      console.log(this.condition)
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 10px;
  .el-dropdown-link {
    display: block;
    width: 120px;
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    float: right;
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
</style>

