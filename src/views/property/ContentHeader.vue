<template>
  <div class="content-header">
    <div class="header-top">
      <div class="header-filters">
        <!-- search-input -->
        <SearchInput v-model="form.SearchKeyword" placeholder="Tìm kiếm tài sản..." />
        <!-- filter-group -->
        <div class="filter-group">
          <!-- loại tài sản -->
          <div class="filter-item">
            <SelectDropdown v-model="form.CategoryId" placeholder="Loại tài sản" icon="icon-filter"
              :options="categories" label-field="categoryName" value-field="categoryId" />
          </div>
          <!-- bộ phận sử dụng -->
          <div class="filter-item">
            <SelectDropdown v-model="form.DepartmentId" placeholder="Bộ phận sử dụng" icon="icon-filter"
              :options="departments" label-field="departmentName" value-field="departmentId" />
          </div>
        </div>
      </div>
      <div class="header-actions">
        <AssetModal title="Thêm tài sản " type="add"></AssetModal>
        <BaseButtton icon="icon-excel" :type="BUTTON_TYPE.OUTLINE">
        </BaseButtton>
        <BaseAlert icon="icon-delete" type="delete" :data="listIds">
        </BaseAlert>
      </div>
    </div>
  </div>
</template>

<script setup>
import CategoryAPI from '@/apis/component/CategoryAPI';
import DepartmentAPI from '@/apis/component/DepartmentAPI';
import emitter from '@/bus/EventBus';
import { BUTTON_TYPE } from '@/commons/constant/constant';
import BaseButtton from '@/components/button/BaseButtton.vue';
import SearchInput from '@/components/input/SearchInput.vue';
import SelectDropdown from '@/components/input/SelectDropdown.vue';
import AssetModal from '@/components/modal/AssetModal.vue';
import { onBeforeMount, onUnmounted, reactive, ref, watch } from 'vue';
import { formPaging } from '@/commons/modal/Request';
import BaseAlert from '@/components/alert/BaseAlert.vue';

// clone props → tránh sửa trực tiếp props
const form = reactive({ ...formPaging })
//lấy dữ liệu categories từ BE
const categories = ref([]);
CategoryAPI.getAll().then((result) => {
  categories.value = result
})
//lấy dữ liệu departments từ BE
const departments = ref([]);
DepartmentAPI.getAll().then((result) => {
  departments.value = result
})
//thay đổi loại tài sản thì emit sang body
watch(
  () => form.CategoryId,
  () => {

    emitter.emit('SearchFilter', form)
  }
)
//thay đổi bộ phận sử dụng thì emit sang body
watch(
  () => form.DepartmentId,
  () => {
    emitter.emit('SearchFilter', form)
  }
)
//thay đổi search thì emit sang body
watch(
  () => form.SearchKeyword,
  () => {
    emitter.emit('SearchFilter', form)
  }
)
//delete 
const listIds = ref([]);
//lấy danh sách id mà thg table truyền lên
const DeleteInput = (payload) => {
  listIds.value = payload ? payload : []
}

onBeforeMount(() => {
  emitter.on('DeleteMany', DeleteInput);
});

onUnmounted(() => {
  emitter.off('DeleteMany', DeleteInput);
});
</script>

<style scoped>
.content-header {
  border-bottom: 1px solid #e0e0e0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e3a5f;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.header-filters {
  display: flex;
  gap: 16px;
  align-items: center;
}





.filter-group {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.filter-item {
  display: flex;
  min-width: 200px;
  align-items: center;
}

.filter-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #666666;
  pointer-events: none;
  z-index: 1;
}

.filter-select {
  width: 100%;
  height: 36px;
  padding: 8px 40px 8px 36px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
  cursor: pointer;
  outline: none;
  appearance: none;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: #4a90e2;
}

.dropdown-arrow {
  position: absolute;
  right: 12px;
  width: 16px;
  height: 16px;
  color: #666666;
  pointer-events: none;
}
</style>
