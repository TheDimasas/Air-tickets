<template>
  <el-container>
    <el-header><Header /> </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import Header from './components/layout/Header.vue';

export default {
  components: {
    Header,
  },

  created() {
    this.axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token');
          window.location.assign(window.location.origin);
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

main.el-main {
  height: 86vh;
}

header.el-header {
  margin: 0;
  padding: 0;
  height: 7vh;
  background-color: #1a1a1c;
}
</style>
