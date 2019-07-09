<template>
  <div class="home clearfix">
    <!-- 攻略 -->
    <!-- 左边 -->
    <div class="traveldiaryleft">
      <div>
        <h2>发表新攻略</h2>
        <p>分享您的个人游记，让更多人看到哦</p>
        <input type="text" placeholder="请输入标题" v-model="title" />
      </div>
      <!-- 富文本 -->
      <div>
        <section class="container">
          <div
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>
        <span>选择城市</span>
        <el-autocomplete
          v-model="cityList"
          :fetch-suggestions="querySearchAsync"
          placeholder="请选择游玩城市"
          @select="handleSelect"
        ></el-autocomplete>
        <div class="edittraveldiary">
          <i @click="release">发布</i>
          <em>或者</em>
          <span @click="preserve">保存到草稿</span>
        </div>
      </div>
    </div>
    <!-- 右边草稿区 -->
    <div class="traveldiaryright">
      <div class="contens">
        <span>草稿箱（1）</span>
        <span
          v-for="(item,index) in this.$store.state.post.draftsList"
          :key="index"
          @click="examine(item,index)"
          class="iconfont el-icon-edit kkkk"
        >
          <h4>{{item.title}}</h4>
          <span>{{item.time}}</span>
          <div class="delDraftsList" @click="delDraftsList(index)">删除</div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 文章标题
      title: "",
      // 文章id
      cityId: "",
      cityList: "",
      // 文章内容
      content: "<p></p>",
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"]
          ]
        }
      }
    };
  },
  mounted() {
    this.scratch = this.$store.state.post.draftsList;
  },
  methods: {
    // 查看草稿
    examine(item, index) {
      console.log(item, index);
      this.content=item.content
      this.title=item.title
      // this.cityId;
    },
    // 删除草稿
    delDraftsList(index) {
      this.$store.commit("post/delDraftsList", index);
      this.$message.success("添加草稿成功");
    },
    // 添加草稿
    preserve() {
      var myTime = new Date().Format("yyyy年MM月dd日保存");
      if (this.title && this.content) {
        this.$store.commit("post/setDraftsList", {
          title: this.title,
          time: myTime,
          content: this.content
        });
        this.title=""
        this.content=""
        this.$message.success("添加草稿成功");
      } else {
        this.$message.success("请输入标题或内容");
      }
    },
    release() {
      if((this.title && this.content)==="undefined"){
      }else{
        return this.$message.success("请输入标题或内容");
      }
      this.$axios({
        url: "posts",
        method: "post",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: {
          content: this.content,
          title: this.title,
          city: this.cityId
        }
      }).then(res => {
        this.$message({
          typr: "success",
          message: "添加文章成功"
        });
        // 文章标题
        this.title = "";
        // 文章id
        this.cityId = "";
        this.content = "<p></p>";
      });
    },
    onEditorBlur(editor) {
      console.log("11111" + editor);
    },
    onEditorFocus(editor) {
      console.log("22222" + editor);
    },
    onEditorReady(editor) {
      console.log("333" + editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("66666666" + html, "11111" + text);
      this.content = html;
    },
    handleSelect(value) {
      this.cityList = value.name;
      this.cityId = value.id;
    },
    async querySearchAsync(value, cb) {
      // 输入框为空时不触发此事件

      const aaa = await this.$axios({
        url: "airs/city",
        params: {
          name: value
        }
      });
      const { data } = aaa.data;
      // this.cityId=data.id
      console.log(data);
      const newData = data.map(v => {
        return {
          ...v,
          value: v.name.replace("市", "")
        };
      });
      cb(newData);
    }
  }
};
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
.delDraftsList {
  color: #cdedc9;
  widows: 30px;
  height: 20px;
  &:hover {
    opacity: 1;
    widows: 30px;
    background: rgb(247, 82, 82);
    height: 20px;
    color: #fff;
  }
}
.contens {
  text-align: center;
  margin: 10px auto;
  width: 280px;
  border: 1px solid #ccc;
}
.edittraveldiary {
  i {
    display: inline-block;
    line-height: 30px;
    padding-left: 18px;
    border-radius: 5px;
    color: #fff;
    width: 67px;
    height: 30px;
    background: #409eff;
  }
  span {
    color: #ffb800;
  }
}
.container {
  margin-top: 20px;
  width: 870px;
  margin-bottom: 10px;
}
.quill-editor {
  width: 870px;
  height: 370px;
}
#editor {
  background: #fff;
}
.home {
  width: 1200px;
  margin: 0 auto;
}
.traveldiaryleft {
  padding-left: 8px;
  h2 {
    margin: 15px 0px;
    font-weight: 400;
  }
  p {
    color: #666;
  }
  input {
    margin-top: 10px;
    width: 870px;
    height: 40px;
    padding-left: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline-style: none;
  }
  float: left;
  width: 900px;
  background: #cdedc9;
  height: 690px;
}
.traveldiaryright {
  border: 1px solid #ccc;
  float: left;
  width: 285px;
  background: #cdedc9;
  height: 690px;
  span {
    border-bottom: #666;
    display: block;
    width: 285px;
    margin: 10px auto;
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