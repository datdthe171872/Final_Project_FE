<script setup lang="ts">
import BaseTable from '@/components/table/BaseTable.vue';
import { AssetsData, AssetColumns, pageSizeOptions } from '@/commons/constant/constant';
</script>

<template>
  <div class="content-body">
    <BaseTable :page-size="pageSizeOptions" :fields="AssetColumns" :rows="AssetsData"></BaseTable>

  </div>
</template>
<style scoped>
.content-body {
  background-color: #ffffff;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>