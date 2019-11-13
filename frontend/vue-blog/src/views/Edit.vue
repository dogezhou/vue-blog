<template>
  <div id="edit">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"  :maxlength='20'></el-input>
    <p class="msg">限{{textLimit}}/30个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" v-model="description" :autosize={minRows:2,maxRows:6} :maxlength='140'></el-input>
    <p class="msg">限{{descriptionLimit}}/140个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" v-model="content" :autosize={minRows:4,maxRows:30}></el-input>
    <el-button class="confirmBtn" @click="onEdit">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog'

export default {
    name:'Edit',
  data() {
    return {
      blogId:null,
      atIndex:false,
      title:'',
      description:'',
      content:'',
    }
  },
  computed:{
    textLimit(){
      return this.title.length
    },
    descriptionLimit(){
      return this.description.length
    }
  },
  created(){
    this.blogId = this.$route.params.blogId
    blog.getDetail({blogId:this.blogId}).then(res=>{
      this.title = res.data.title
      this.description = res.data.description
      this.content = res.data.content
      this.atIndex = res.data.atIndex
    })
  },
  methods:{
    onEdit(){
      blog.updateBlog({blogId:this.blogId},{title:this.title, content:this.content, description:this.description, atIndex:this.atIndex})
        .then(res => {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          console.log('wwwww', res)
          this.$router.push({path:`/detail/${res.data.id}`})
        })
    }
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
@import "../assets/var.scss";

.msg {
  float: right;
  font-size: 14px;
  color: $textLighterColor;
}
.confirmBtn {
  margin: 20px 0 30px;
}
h1 {
  padding-top: 20px;
}
h3 {
  padding-top: 20px;
  text-align: left;
  padding-bottom: 10px;
}
</style>
