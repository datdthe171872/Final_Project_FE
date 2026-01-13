<template>
  <div class="sidebar" :style="{ width: isShort ? '70px' : '200px' }">
    <!-- sidebar-body -->
    <div class="sidebar-body">
      <div class="logo">
        <div class="icon-logo"></div>
        <div class="content-logo" v-show="!isShort">MISA QLTS</div>
      </div>
      <!-- sidebar items -->
      <SidebarItem v-for="(item, index) in sidebarItems" :key="index" :icon="item.icon" :title="item.title"
        :active="item.active" :isShorten="isShort" :more="item.more"></SidebarItem>
    </div>

    <!-- sidebar-footer -->
    <div class="sidebar-footer">
      <button class="sidebar-button" @click="Handleshorten">
        <div class="icon">
          <div class="icon-shorten"></div>
        </div>
      </button>
    </div>
  </div>
</template>
<script setup>
import { sidebarItems } from '@/commons/constant/constant';
import SidebarItem from '@/components/sidebar/SidebarItem.vue';
import { ref } from 'vue';
const isShort = ref(false)
function Handleshorten() {
  isShort.value = !isShort.value
}
</script>
<style scoped>
.sidebar {
  width: 200px;
  background-color: #1c3048;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, .16);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
}

.content-logo {
  font-size: 22px;
  font-weight: 700;
  color: white;
}

.icon-logo {
  background: url("../assets/icon/qlts-icon.svg") no-repeat -20px -680px;
  width: 36px;
  height: 36px;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #97989a;
  height: 50px;
  width: 100%;
  padding-right: 10px;
}

.sidebar-button {
  background-color: transparent;
  border: 1px solid #97989a;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-shorten {
  mask-image: url("../assets/icon/qlts-icon.svg");
  mask-repeat: no-repeat;
  background-color: #97989a;
  mask-position: -28px -290px;
  width: 8px;
  height: 12px;
}
</style>
