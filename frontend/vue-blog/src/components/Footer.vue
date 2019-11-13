<template>
  <div class="footer">
      <p><a href="mailto:doge.zhou@outlook.com">Email</a> | <a href="https://github.com/dogezhou/vue-blog">GitHub</a></p>
  </div>
</template>

<script>
export default {
    name:'Footer',
  data() {
    return {

    }
  },
}
</script>

<style scoped lang='scss'>
@import "../assets/var.scss";
.footer {
  background-color: #d7d7d7;
  color: #666;
  font-size: 13px;
  padding: 30px;
  text-align: center;
}
a {
  text-decoration: none;
  color: #666;
}
a:hover{
  color: $bgColor;
}
@media (max-width: 768px){
  .footer{height: 80px;}
}
</style>
