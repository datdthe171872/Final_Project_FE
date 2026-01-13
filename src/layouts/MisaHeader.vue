<template>
  <div class="header">
    <!-- header-left -->
    <div class="header-left">
      <span class="page-name">Danh sách tài sản </span>
    </div>
    <!-- header-right -->
    <div class="header-right">
      <span class="organization-name">Sở tài chính </span>
      <!-- year-selector -->
      <div class="year-selector">
        <span class="year-label">Năm</span>
        <div class="year-value">
          <span>2021</span>
        </div>
        <div class="year-arrows">
          <span class="arrow-up"></span>
          <span class="arrow-down"></span>
        </div>
      </div>
      <!-- header-icons -->
      <div class=" header-icon">
        <div class="icon">
          <div class="icon-notification"></div>
        </div>
      </div>

      <div class="header-icon">
        <div class="icon">
          <div class="icon-system"></div>
        </div>
      </div>

      <div class="header-icon">
        <div class="icon">
          <div class="icon-support"></div>
        </div>
      </div>

      <div class="header-icon">
        <div class="icon">
          <div class="icon-user"></div>
        </div>
        <div class="icon">
          <div class="arrow-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.header {
  height: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.page-name {
  font-size: 14px;
  font-weight: 700;
}

.organization-name {
  font-weight: 500;
  color: #001031;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.year-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: rgba(26, 164, 200, .2);
  border-radius: 3px;
  width: 112px;
  height: 30px;
  overflow: hidden;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.year-label {
  color: black;
  font-size: 13px;
}

.year-value {
  background-color: transparent;
  width: 50px;
  border: none;
  font-weight: 700;
  font-size: 13px;
}

.year-arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 4px;
}

.arrow-up {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -28px -338px;
  width: 8px;
  height: 5px;
}

.arrow-down {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -72px -338px;
  width: 8px;
  height: 5px;
}

.header-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  gap: 8px;
}

.icon-user {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -23px -23px;
  width: 18px;
  height: 18px;
  transform: scale(1.1);
}

.icon-notification {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -332px -109px;
  width: 16px;
  height: 20px;
}

.icon-system {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -199px -23px;
  width: 18px;
  height: 18px;
}

.icon-support {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -67px -67px;
  width: 18px;
  height: 18px;
  transform: scale(1.1);
}
</style>
