<template>
  <div class="index">
    <div class="blog-list">
      <section class="blog-list">
        <div
          class="info-card"
          :key="index"
          v-for="(blog, index) in blogList"
        >
          <div class="header">
            <router-link
              class="avatar"
              :to='`/detail/${blog.id}`'
            >
              <img
                :src="blog.user ? blog.user.avatar : 'https://avatars2.githubusercontent.com/u/1135694?v=4'"
                alt="头像"
              >
            </router-link>
            <router-link
              class="username"
              :to='`/detail/${blog.id}`'
            >
              {{blog.user ? blog.user.username : '匿名'}}
            </router-link>
            <span class="time">{{blog.createdAt | formatDate}}</span>
          </div>
          <div class="content">
            <router-link
              class="title"
              :to='`/detail/${blog.id}`'
            >
              {{blog.title}}
            </router-link>
            <p>
              {{blog.description}}
            </p>
          </div>
        </div>
      </section>
      <!-- <section class="pagination">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :pager-count="5"
      @current-change='ChangePage'>
      </el-pagination>
    </section>     -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'index',
  computed: {
    ...mapState('blog', {
      blogList: state => state.list
    }),
  },
  methods: {
    ...mapActions('blog', [
      'getBlogList',
    ]),
  },
  created() {
    this.getBlogList()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/var.scss";

.blog-list {
  .pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  margin: 0 auto;
  width: $contentWidth;
  text-align: left;

  .info-card {
    font-size: 13px;
    margin: 24px 0;
    .header {
      .avatar {
        display: inline-block;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .username {
        margin-left: 4px;
        font-size: 14px;
        color: #333;
        text-decoration: none;
        vertical-align: middle;
      }
      .time {
        color: #969696;
        margin-left: 4px;
        vertical-align: middle;
      }
    }
    .content::after {
      content: "";
      display: block;
      clear: both;
    }
    .content {
      .title {
        display: block;
        margin: 10px 135px 5px 0;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        text-decoration: none;
      }
      .title:hover {
        text-decoration: underline;
      }
      p {
        line-height: 24px;
        margin: 0 135px 5px 0;
      }
      .cover {
        float: right;
        width: 125px;
        height: 100px;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
