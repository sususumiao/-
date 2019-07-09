<template>
  <div class="width1260">
    <el-row>
      <!-- 左边攻略详情部分 -->
  <el-col :span="18"><div class="grid-content bg-purple">
    <!-- 页头面包屑 -->
   <div class="separator">
      <el-breadcrumb separator-class="el-icon-arrow-right ">
    <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
    <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
   </div>
<h1>{{pageData.title}}</h1>
   <div class="createdtimeMax">  <div  class="clearfix createdtime">攻略：{{pageData.created_at | createdtime}} &nbsp;&nbsp;阅读：{{pageData.watch}}</div></div>
    <!-- 文章主体部分 -->
  
        <p v-html="pageData.content"></p>

    <!-- 收藏点赞开始 -->
  <div class="giveALike">
  <div class="giveALikes">
    <i class="iconfont iconpinglun"></i>  
   <i class="iconfont iconstar1"></i>       
   <i class="iconfont iconfenxiang"> </i>  
  <i class="iconfont iconding"> </i>       
  </div>

  <div class="giveALikeb">
  <span>   评论(111)</span>   
<span>  收藏     </span>   
   <span> 分享      </span>
<span>  点赞(17) </span>   
  </div>
  </div>


  <!-- 评论回复部分开始 -->
  <div class="inputs">
    <h2>评论</h2>
    <input type="text" placeholder="随便说点什么吧...">
    <div>
      <div><el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog></div>
    <div>提交</div>
        </div>
  </div>
    </div></el-col>


    <!-- 右边相关攻略部分 -->
  <el-col :span="6">
    <div class="grid-content bg-purple-light">
      <div>相关攻略</div>
      <div class="AssociatedStrategy">
        <img src="" alt="">
        <div>测试1</div>
      </div>
    </div></el-col>
</el-row>


  </div>
</template>
<script>
export default {
  data(){
    return{
      // 文件上传部分
      dialogImageUrl: '',
        dialogVisible: false,
        // 页面文章详情
        pageData:{}
    }
  },
filters:{
  createdtime(time){
   return  new Date(time).Format(`yyyy年MM月dd日 HH:mm`);
  }
},
methods:{
  handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    
},
  mounted(){
    let id=this.$route.query.id
    this.$axios({
      url:`posts?id=${id}`,
    }).then(({data})=>{
      this.pageData=data.data[0]
      console.log(data.data[0].content)
    })
   
  }
}
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
</script>
<style lang='less' scoped>
.inputs{
  input{
    width:750px;
    height: 40px;
    border-radius: 10px;
  }
}
.giveALike{
  width: 750px;
  height: 170px;
}
.giveALikes{
  i{
    color: #ffb800;
    display:block;
    width: 70px;
    font-size: 28px;
    
    &:hover{
    font-size: 33px;
    transition: font-size 0.5s;
    -moz-transition: font-size 0.5s; /* Firefox 4 */
    -webkit-transition: font-size 0.5s; /* Safari 和 Chrome */
    -o-transition: font-size 0.5s; /* Opera */
    }
  }
  padding-top: 55px;
  justify-content: center;
  display: flex;
    flex-direction: row;
  margin: 0px auto;
  width: 400px;
  height: 85px;

}
.giveALikeb{
  padding-top: 10px;

  span{
 font-size: 14px;
    width: 70px;
    color: #999;
  }
  justify-content: center;
    display: flex;
    flex-direction: row;
  margin: 0px auto;
 height: 75px;
 width: 400px;

}
.width1260{
  width: 1000px;
  margin: 0 auto;
}
.grid-content{
  /deep/img{
      max-width: 750px!important;
            }
      /deep/ img{
    margin:10px 0;
    }
    h1{
    
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
  // background: rgb(250, 123, 123);
}

.separator{
  padding-top:20px;
  padding-left: 10px;
  width: 800px;
  height: 50px;
}
.createdtimeMax{
  width: 730px;
  height: 50px;
  .createdtime{
  float:right;
  color: #ccc;
}
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
</style>