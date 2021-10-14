<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    style="height: 80px"
    ><el-image
      style="height: 80px"
      :src="'/Air-tickets/static/img/logo.png'"
      :fit="'contain'"
      index="/signIn"
      :router="true"
    ></el-image>
    <div class="right">
      <el-menu-item index="/" :router="true">Головна</el-menu-item>
      <el-menu-item v-if="!loggedIn" index="/sign-in" :router="true"
        >Вхід</el-menu-item
      >
      <el-menu-item v-if="!loggedIn" index="/sign-up" :router="true"
        >Реєстрація</el-menu-item
      >
      <el-menu-item v-if="loggedIn" :router="true" @click="logOut()"
        >Вихід</el-menu-item
      >
    </div>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
    };
  },

  watch: {
    $route(to, from) {
      this.activeIndex = to.path;
    },
  },

  mounted: function () {
    this.activeIndex = this.$route.path;
  },

  methods: {
    logOut() {
      try {
        this.$store.dispatch('logOut').then(this.$router.push('/'));
        this.$notify.success({
          title: 'Успіх',
          message: 'Вихід успішно здійснено',
        });
      } catch (error) {
        this.$notify.error({
          title: 'Помилка',
          message: 'Виникла невідома помилка',
        });
        console.log(error);
      }
    },
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fafafa;

  .el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu-item {
    font-size: 16px;
    padding: 10px 20px;
    height: 80px;
    vertical-align: middle;
    font-weight: bold;
    font-size: 18px;
  }

  a {
    text-decoration: none;
  }
}
.right {
  margin-left: auto;
  display: flex;
}
</style>
