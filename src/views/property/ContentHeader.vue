<template>
  <div class="content-header">
    <div class="header-top">
      <div class="header-filters">
        <!-- search-input -->
        <SearchInput placeholder="Tìm kiếm tài sản..." />
        <!-- filter-group -->
        <div class="filter-group">
          <!-- loại tài sản -->
          <div class="filter-item">
            <SelectDropdown v-model="assetType" placeholder="Loại tài sản" icon="icon-filter" :options="sidebarItems" />
          </div>
          <!-- bộ phận sử dụng -->
          <div class="filter-item">
            <SelectDropdown v-model="department" placeholder="Bộ phận sử dụng" icon="icon-filter"
              :options="sidebarItems" />
          </div>
        </div>
      </div>
      <div class="header-actions">
        <!-- <BaseButtton label="+ Thêm tài sản" :type="BUTTON_TYPE.MAIN"></BaseButtton> -->
        <AssetModal title="Thêm tài sản " type="add"></AssetModal>
        <BaseButtton icon="icon-excel" :type="BUTTON_TYPE.OUTLINE"></BaseButtton>
        <BaseButtton icon="icon-delete" :type="BUTTON_TYPE.OUTLINE"></BaseButtton>
      </div>
    </div>

  </div>
</template>

<script setup>
import { BUTTON_TYPE } from '@/commons/constant/constant';
import { sidebarItems } from '@/commons/constant/constant';
import BaseButtton from '@/components/button/BaseButtton.vue';
import SearchInput from '@/components/input/SearchInput.vue';
import SelectDropdown from '@/components/input/SelectDropdown.vue';
import AssetModal from '@/components/modal/AssetModal.vue';
import { ref } from 'vue';

const assetType = ref(null);
const department = ref(null);

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
