<script setup>
import { RouterView } from 'vue-router'
import MisaSidebar from './layouts/MisaSidebar.vue';
import BaseToast from './components/toast/BaseToast.vue';
</script>

<template>
  <div class="app-container">
    <MisaSidebar></MisaSidebar>
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
  <BaseToast></BaseToast>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

body {
  background-color: #f4f7ff;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

#app {
  height: 100vh;
  overflow: hidden;
}

.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
