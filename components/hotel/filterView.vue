<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in list" :key="index">
              <el-radio v-model="radio" label="1">{{item.name}}</el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      radio: ""
    };
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

