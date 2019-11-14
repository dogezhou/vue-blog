<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <div v-if="blogs.length === 0" style="text-align: center;margin: 30px 0;">
        <h3>暂无内容!</h3>
      </div>      
      <div class="item" v-for="blog in blogs" :key='blog.id' >
        <div class="date">
          <span class="day">{{ blog.createdAt | getDay }}</span>
          <span class="month">{{ blog.createdAt | getMouth }}月</span>
          <span class="year">{{ blog.createdAt | getYear }}</span>
        </div>
        <div class="content-wrapper">
          <h3><router-link :to="`/detail/${blog.id}`">{{blog.title}}</router-link></h3>
          <p><router-link :to="`/detail/${blog.id}`">{{blog.description}}</router-link></p>
          <div class="actions">
            <router-link :to='`/edit/${blog.id}`'>编辑</router-link>
            <a href="#" @click.prevent="onDetele(blog.id)">删除</a>
          </div>
        </div>
      </div>
    </section>
    <section class="pagination">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change='ChangePage'>
      </el-pagination>
    </section>
  </div>
</template>

<script>
import blog from '@/api/blog'
import { mapState, mapActions } from 'vuex'

export default {
  name:'My',
  data() {
    return {
      blogs:[],
      page:1,
      total:0,
    }
  },
  computed: {
    ...mapState('users', [
      'isLogin',
      'user'
    ])
  },
  filters:{
    getDay(str){
      if (!str) return ''
      var date = new Date(str)
      return `${date.getDate()}`
    },
    getMouth(str){
      if (!str) return ''
      var date = new Date(str)
      return `${date.getMonth()+1}`
    },
    getYear(str){
      if (!str) return ''
      var date = new Date(str)
      return `${date.getFullYear()}`
    },
  },
  created(){
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogsByUserId(this.user.id,{page:this.page})
      .then(res => {
        const { list, page, total } = res.data
        this.page = page
        this.blogs = list
        this.total = total
      })
  },
  methods:{
    ChangePage(newVal){
      blog.getBlogsByUserId(this.user.id,{page:newVal}).then(res =>{
        const { list, page, total } = res.data
        this.page = page
        this.blogs = list
        this.total = total
        this.$router.push({path:"/my",query:{page:newVal}})
      })
    },
    async onDetele(blogId){
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      await blog.deleteBlog({blogId})
      this.$message.success('删除成功')
      this.blogs = this.blogs.filter(blog => blog.id !== blogId)
    }
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
@import "../assets/var.scss";

#my,#user {
  .pagination{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .user-info {
    display: flex;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    h3 {
      margin-left: 20px;
      margin-top: 10px;
    }
  }
  a{
    text-decoration: none;
    color: #333;
  }
  .item {
    display: flex;
    text-align: left;
    margin: 20px 0;

    .date {
      display: flex;
      flex-direction: column;
      text-align: center;

      span {
        display: block;
        color: $textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding-left: 12px;
      justify-content: space-around;
    }
    .actions {
      font-size: 12px;
      a {
        color: $themeLighterColor;
        margin-right: 8px;
      }
      
    }

  }

}
</style>
