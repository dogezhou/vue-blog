<template>
  <div class="header-wrapper">
    <header :class="{login:isLogin,'no-login':!isLogin}">
      <template v-if="!isLogin">
        <h1>
          <router-link to='/'>博客园</router-link>
        </h1>
        <p>创作你的创作</p>
        <div class="btns">
          <a @click="onLogin">
            <el-button>使用 GitHub 登录</el-button>
          </a>
        </div>
      </template>
      <template v-else>
        <h1>
          <router-link to='/'>博客园</router-link>
        </h1>
        <router-link to='/create'><i class="edit el-icon-plus"></i></router-link>
        <div class="user">
          <img
            class="avatar"
            :src="user.avatar"
            :alt="user.username"
            :title="user.username"
          >
          <ul>
            <li>
              <router-link to="/my">我的</router-link>
            </li>
            <li><a
                href="#"
                @click="onLogout"
              >注销</a></li>
          </ul>
        </div>
      </template>
    </header>
  </div>
</template>

<script>
// 映射
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
    }
  },

  // 把 store 中 getter 属性映射到此组件
  computed: {
    ...mapState('users', [
      'isLogin',
      'user'
    ])
  },

  //在页面没有渲染之前检查用户是否登录
  created() {
    this.getUserInfo()
  },
  methods: {
    // 把 users.js 中的 getUserInfo 方法映射到此组件
    ...mapActions('users', [
      'getUserInfo',
    ]),
    onLogin() {
      window.location="/api/github"
    },
    onLogout() {
      window.location="/api/logout"
    }
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
@import "../assets/var.scss";

.header-wrapper {
  background: $bgColor;
}
header.no-login {
  padding: 0 12% 30px 12%;
  background: $bgColor;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 60px 0 0 0;
    text-transform: uppercase;
    a {
      text-decoration: none;
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 40px;
      text-transform: uppercase;
      flex: 1;
    }
  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }

  .btns {
    margin-top: 20px;
  }

  button {
    margin: 20px 5px 0;
  }
}

header.login {
  display: flex;
  align-items: center;
  background: $bgColor;
  width: $contentWidth;
  margin: 0 auto;
  h1 {
    text-align: left;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;
  }
  h1 a {
    text-decoration: none;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }
  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin: 0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }
}
@media (max-width: 768px) {
  header.login .avatar {
    margin-right: 8px;
    margin-top: 4px;
  }
  header.login h1 a {
    font-size: 30px;
    padding: 8px;
  }
}
</style>
