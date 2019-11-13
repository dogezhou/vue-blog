<template>
  <div id="detail">
    <section class="user-info">
      <router-link :to="`/user/${user.id}`"><img
          :src="user.avatar"
          :alt="user.username"
          class="avatar"
        ></router-link>
      <h3>{{title}}</h3>
      <p>
        <router-link :to="`/user/${user.id}`">{{user.username}}</router-link> 发布于{{createdAt | formatDate2}}
      </p>
    </section>
    <section
      class="article"
      v-html='markdown'
    >
    </section>
  </div>
</template>

<script>
import marked from 'marked'
import blog from '@/api/blog'

export default {
  name: 'Detail',
  data() {
    return {
      title: '',
      rawContent: '',
      user: {},
      createdAt: ''
    }
  },
  created() {
    blog.getDetail({ blogId: this.$route.params.blogId }).then(res => {
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.createdAt
      // TODO: 登录用户
      this.user = {id: 3, username: '张三'} || res.data.user
    })
  },
  computed: {
    markdown() {
      return marked(this.rawContent)
    }
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
@import "../assets/var.scss";

#detail {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;

      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      margin: 5px 0;
    }

    p {
      grid-column: 2;
      grid-row: 2;

      margin-top: 0;
      font-size: 12px;
      color: $textLighterColor;

      a {
        color: $themeColor;
        text-decoration: none;
      }
    }
  }

  .article {
    padding: 30px 0;
  }
}
@media (max-width: 768px) {
  #detail .user-info {
    grid: 40px auto / 80px 1fr;
  }
}
</style>
