<template>
  <div class="auth">
    <SignIn />
  </div>
</template>

<script lang="ts">
import SignIn from '../components/auth/SignIn.vue';

export default {
  components: {
    SignIn,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  padding-top: 15vh;
}
</style>
