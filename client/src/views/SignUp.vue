<template>
  <div class="auth">
    <SignUp />
  </div>
</template>

<script lang="ts">
import SignUp from '../components/auth/SignUp.vue';

export default {
  components: {
    SignUp,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  padding-top: 3vh;
}
</style>
