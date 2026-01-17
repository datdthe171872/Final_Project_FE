<script setup lang="ts">
import BaseTable from '@/components/table/BaseTable.vue';
import { AssetColumnsEng, pageSizeOptions } from '@/commons/constant/constant';
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';
import AssetAPI from '@/apis/component/AssetAPI';
import emitter from '@/bus/EventBus';
import { formPaging } from '@/commons/modal/Request';
const isLoaded = ref(false);
//default
const form = reactive({
  pageSize: formPaging.PageSize,
  pageIndex: formPaging.PageIndex,
  total: 0
});
const listAsset = ref([])
AssetAPI.getAllNew(formPaging).then((result) => {
  listAsset.value = result
  form.total = listAsset.value[0] ? listAsset.value[0].total : form.total
  isLoaded.value = true;
})

//render data hàm
const renderData = (formPaging) => {
  AssetAPI.getAllNew(formPaging).then((result) => {
    listAsset.value = result
    form.total = listAsset.value[0] ? listAsset.value[0].total : form.total
    form.pageIndex = formPaging.PageIndex
    form.pageSize = formPaging.PageSize
    isLoaded.value = true;
  })
}

//bắt sự kiện sau khi lưu (insert,update,delete)đc gửi từ con để refresh data
const handleRefresh = () => {
  renderData(formPaging)
  form.pageIndex = 1
  form.pageSize = pageSizeOptions[0]
}

//bắt sự kiện sau khi search ,filter
const handleSearchFilter = (payload) => {
  renderData(payload)
}

//bắt sự kiện sau khi thay đổi pagesize
const handleChangePageSize = (pageSize) => {
  formPaging.PageSize = pageSize
  renderData(formPaging)
}
//bắt sự kiện sau khi thay đỏi trag hiện tại
const hanleChangePage = (pageIndex) => {
  formPaging.PageIndex = pageIndex
  renderData(formPaging)
}

//bắt sự kiến thay đổi 
onBeforeMount(() => {
  emitter.on('RefreshForm', handleRefresh);
  emitter.on('SearchFilter', handleSearchFilter);
  emitter.on('pageSizeChange', handleChangePageSize);
  emitter.on('pageChange', hanleChangePage);
});

onUnmounted(() => {
  emitter.off('RefreshForm', handleRefresh);
  emitter.off('SearchFilter', handleSearchFilter);
  emitter.off('pageSizeChange', handleChangePageSize);
  emitter.off('pageChange', hanleChangePage);
});
</script>

<template>
  <div class="content-body">
    <BaseTable v-if="isLoaded" :page-size="pageSizeOptions" :fields="AssetColumnsEng" :rows="listAsset" :paging="form">
    </BaseTable>
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