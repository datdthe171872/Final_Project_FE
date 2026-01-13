<script setup lang="ts">
import MisaHeader from '@/layouts/MisaHeader.vue';
import ContentHeader from './ContentHeader.vue';
import ContentBodyPro from './ContentBodyPro.vue';
import ContentBody from './ContentBody.vue';

</script>

<template>
  <div class="property-view">
    <MisaHeader></MisaHeader>
    <div class="content">
      <ContentHeader></ContentHeader>
      <ContentBody></ContentBody>
    </div>
  </div>
</template>

<style scoped>
.property-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: #e7ecf9;
  padding: 0px 12px 12px 12px;
}
</style>
