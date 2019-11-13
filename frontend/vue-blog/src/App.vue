<template>
  <div id="app">
    <Header id="header"></Header>
    <main>
      <router-view/>
    </main>
    <Footer id="header"></Footer>    
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
// 使用 border-box
*,*::before,*::after {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;  
}
main {
  flex-grow: 1;
}
</style>
