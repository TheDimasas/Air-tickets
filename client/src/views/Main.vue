<template>
  <div class="main">
    <h1>Головна</h1>
    <Search />
    <div class="block">
      <el-carousel trigger="click" height="550px">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image
            style="width: 100%"
            :src="'/static/img/' + item + '.jpg'"
            :fit="'cover'"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Search from '../components/main/Search.vue';

export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 30px;
  h1 {
    font-size: 32px;
    margin-bottom: 15px;
  }
}

.block {
  width: 65%;
  margin: 20px auto 0;
}

// .el-form--label-top .el-form-item__label {
//   padding: 0 !important;
// }

.el-carousel__item {
  background-color: #f0f0f0;
}
</style>
