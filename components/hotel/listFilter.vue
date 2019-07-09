<template>
  <div>
    <el-row type="flex" class="search">
      <el-col :span="8">
        <em>
          价格
          <i>{{priceInitialize}}-{{priceAll}}</i>
        </em>
        <el-slider v-model="price" :format-tooltip="formatTooltip"></el-slider>
      </el-col>
      <!-- 等级 -->
      <el-col :span="6">
        <em>{{list[0].name}}</em>
        <el-row>
          <el-col :span="24">
            <el-select
              v-model="hotellevel"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="不限"
              @change="handelGrade"
            >
              <el-option
                v-for="(item,index) in list[0].data"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <!-- 类型 -->
      <el-col :span="6">
        <em>{{list[1].name}}</em>
        <el-row>
          <el-col :span="24">
            <el-select
              v-model="hoteltype"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="不限"
              @change="handelType"
            >
              <el-option
                v-for="(item,index) in list[1].data"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <!-- 设备 -->
      <el-col :span="6">
        <em>{{list[2].name}}</em>
        <el-row>
          <el-col :span="24">
            <el-select
              v-model="hotelasset"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="不限"
              @change="handelFacility"
            >
              <el-option
                v-for="(item,index) in list[2].data"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <!-- 品牌 -->
      <el-col :span="6">
        <em>{{list[3].name}}</em>
        <el-row>
          <el-col :span="24">
            <el-select
              v-model="hotelbrand"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="不限"
              @change="handelBrand"
            >
              <el-option
                v-for="(item,index) in list[3].data"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FilterView from "./filterView";
export default {
  props: {
    pageSize: {
      type: Number,
      default: 5
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      price: 100,
      priceInitialize: 0,
      priceAll: 0,
      list: [
        {
          name: "住宿等级",
          data: []
        },
        {
          name: "住宿类型",
          data: []
        },
        {
          name: "住宿酒店",
          data: []
        },
        {
          name: "酒店品牌",
          data: []
        }
      ],
      hotellevel: [], //选中的等级
      hoteltype: [], //类型
      hotelasset: [], //设备
      hotelbrand: [], //品牌
      dataList: [] //得到数据
    };
  },
  components: {
    FilterView
  },
  methods: {
    formatTooltip(val) {
      this.priceAll = val * 40;
      return val * 40;
    },
    // 筛选
    init() {
      const obj = {
        params: {
          city: this.$route.query.city,
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize,
          price_lt: 4000
        }
      };
      let str = "";
      this.hotellevel.forEach(v => {
        str += `hotellevel_in=${v}&`;
      });
      this.hoteltype.forEach(v => {
        str += `hoteltype_in=${v}&`;
      });
      this.hotelasset.forEach(v => {
        str += `hotelasset_in=${v}&`;
      });
      this.hotelbrand.forEach(v => {
        str += `hotelbrand_in=${v}&`;
      });
      console.log(str)
      if (str != null) {
        this.$axios.get(`/hotels?${str}`, obj).then(res => {
          const { data } = res;
          this.dataList = data;
          console.log(data);
        });
      } else {
        this.$axios({
          url: "http://157.122.54.189:9095/hotels",
          params: {
            city: this.$route.query.city,
            price_lt: 4000
          }
        }).then(res => {
          const { data } = res;
          this.dataList = data;
        });
      }
    },
    // 选中等级时触发
    handelGrade(value) {
      this.init();
      this.$emit("grogshopList", this.dataList);
    },
    handelType(value) {
      this.init();
      // console.log(this.hoteltype)
      this.$emit("grogshopList", this.dataList);
    },
    handelFacility(value) {
      this.init();
      // console.log(this.facility)
      this.$emit("grogshopList", this.dataList);
    },
    handelBrand(value) {
      this.init();
      // console.log(this.brand)
      this.$emit("grogshopList", this.dataList);
    }
  },
  mounted() {
    //   获取筛选列表
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      const { data } = res.data;
      this.list[0].data = data.levels;
      this.list[1].data = data.types;
      this.list[2].data = data.assets;
      this.list[3].data = data.brands;
      console.log(data);
    });
  }
};
</script>
<style lang="less" scoped>
.search {
  border: 1px solid #666;
  color: #666;
  font-size: 14px;
  .el-col-8 {
    padding: 13px;
    i {
      margin-left: 140px;
    }
  }
  .el-col-6 {
    border-left: 1px solid #666;
    padding: 10px;
  }
}
</style>


