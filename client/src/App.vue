<template>
  <div id="app">
    <flash></flash>
    <div class="content-wrapper">
      <navbar></navbar>
      <router-view/>
    </div>
    <footbar></footbar>
  </div>
</template>

<script>
import FlashNotification from '@/common/Flash';

export default {
  name: 'app',
  components: {
    "flash": FlashNotification,
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
