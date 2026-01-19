<template>
    <button tabindex="0" v-show="show" class="base-button" :class="[`btn-${type}`, { 'btn-icon-only': !label && icon }]"
        :disabled="disabled" @click="handleClick">
        <div class="icon" v-show="icon && !type == BUTTON_TYPE.ACTION">
            <div :class="icon"></div>
        </div>
        <div class="icon" v-show="icon">
            <div :class="icon"></div>
        </div>
        <span v-if="label" class="btn-label">
            {{ label }}
        </span>
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { BUTTON_TYPE } from '@/commons/constant/constant';
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: BUTTON_TYPE.MAIN, // main | sub | outline
        validator: (val) => Object.values(BUTTON_TYPE).includes(val)
    },
    icon: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    show: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['click', 'shiftdown']);

const handleClick = (e) => {
    if (props.disabled) return;
    emit('click', e);
};


</script>

<style scoped>
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 100px;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* ================= MAIN ================= */
.btn-main {
    background-color: #1aa4c8;
    color: #fff;
}

.btn-main:hover {
    background-color: #158aa6;
}

.btn-main:active {
    background-color: #11738a;
}

.btn-main:focus-visible {
    outline: 2px solid #9bd7e4;
}

.btn-main:disabled {
    background-color: #9bd7e4;
    cursor: not-allowed;
}

/* ================= SUB ================= */
.btn-sub {
    background-color: white;
    color: #1da1c2;
    border-color: #1da1c2;
}

.btn-sub:hover {
    background-color: #d2eef6;
}

.btn-sub:active {
    background-color: #bce5f1;
}

.btn-sub:focus-visible {
    outline: 2px solid #9bd7e4;
}

.btn-sub:disabled {
    color: #9bd7e4;
    border-color: #9bd7e4;
    background-color: transparent;
}

/* ================= OUTLINE ================= */
.btn-outline {
    background-color: white;
    border: 1px solid rgb(213, 213, 213);
    color: rgb(72, 72, 72);
}


.btn-outline:hover {
    background-color: #f5f5f5;
}

.btn-outline:active {
    background-color: #eaeaea;
}

.btn-outline:focus-visible {
    outline: 2px solid #ddd;
}

.btn-outline:disabled {
    color: #bbb;
    border-color: #ddd;
}

/* ================= CLOSE ================= */
.btn-close {
    background-color: white;
    border: none;
    color: rgb(89, 89, 89);
}

.btn-close:hover {
    background-color: #f5f5f5;
}

/* ================= ACTION ================= */
.btn-action {
    background-color: transparent;
    width: 25px;
    border: none;
    color: black;
}



/* ================= ICON ================= */
.btn-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
}

.btn-icon-only {
    min-width: 30px;
    padding: 0 10px;
}

.icon-excel {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -287px -111px;
    width: 18px;
    height: 17px;
}

.icon-delete {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -463px -111px;
    width: 18px;
    height: 18px;
}

.icon-close {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -291px -247px;
    width: 10px;
    height: 10px;
    transform: scale(1.2);
}

.icon-edit {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -156px -68px;
    width: 16px;
    height: 16px;
}

.icon-coppy {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -244px -112px;
    width: 16px;
    height: 16px;
}
</style>
