<template>
    <div class="sidebar-item" :class="{ active: props.active }" :style="{ width: props.isShorten ? '44px' : '180px' }">
        <div class="item-left">
            <div class="icon">
                <div class="sidebar-icon" :class="[props.icon]"></div>
            </div>
            <div class="sidebar-content" v-show="!props.isShorten">{{ props.title }}</div>
        </div>
        <div class="item-right icon" v-show="!props.isShorten && props.more">
            <div class="sidebar-icon icon-more"></div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    isShorten: {
        type: Boolean,
        default: false,
    },
    more: {
        type: Boolean,
        default: false,
    }
})
</script>
<style scoped>
.sidebar-item {
    height: 40px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding-left: 12px;
    padding-right: 3px;
    cursor: pointer;
    transition: background-color 0.2s;
    gap: 12px;
}

.sidebar-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-item.active {
    background-image: linear-gradient(145.53deg, #25b6e2 0%, #177f9f 100%);
}

.item-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.sidebar-content {
    color: #97989a;
}

.sidebar-item.active .sidebar-content {
    color: white;
    font-weight: 600;
}

.sidebar-item.active .icon-property,
.sidebar-item.active .icon-more {
    background-color: white;
}

.sidebar-icon {
    mask-image: url("../../assets/icon/qlts-icon.svg");
    mask-repeat: no-repeat;
    background-color: #97989a;
}

.icon-homepage {
    mask-position: -21px -153px;
    width: 22px;
    height: 22px;
}

.icon-property {
    mask-position: -65px -197px;
    width: 22px;
    height: 23px;
}

.icon-htdb {
    mask-position: -110px -153px;
    width: 21px;
    height: 23px;
}

.icon-ccdc {
    mask-position: -153px -153px;
    width: 22px;
    height: 22px;
}

.icon-category {
    mask-position: -197px -153px;
    width: 22px;
    height: 22px;
}

.icon-search {
    mask-position: -241px -153px;
    width: 22px;
    height: 22px;
}

.icon-report {
    mask-position: -329px -153px;
    width: 22px;
    height: 22px;
}

.icon-more {
    mask-position: -158px -249px;
    width: 12px;
    height: 7px;
    transform: scale(1.1);
}
</style>