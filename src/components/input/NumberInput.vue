<template>
    <div class="number-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>
        <div class="number-wrapper">
            <input type="text" :value="displayValue" @input="onInput" @keydown="onKeydown" @blur="onBlur" />

            <div class="spinner">
                <span @click="increase">▲</span>
                <span @click="decrease">▼</span>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
defineProps({
    label: String,
    required: Boolean
})
const model = defineModel({
    type: Number,
    default: 0
})

const displayValue = ref('0')

// Sync khi parent thay đổi
watch(model, (val) => {
    displayValue.value = val?.toString() ?? '0'
}, { immediate: true })

const onKeydown = (e) => {
    // Cho phép: số, backspace, delete, arrows, tab
    const allow =
        /[0-9]/.test(e.key) ||
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)

    if (!allow) {
        e.preventDefault()   // ❌ chặn không cho hiển thị
    }
}

const onInput = (e) => {
    const val = e.target.value.replace(/\D/g, '')
    displayValue.value = val
    model.value = val === '' ? 0 : Number(val)
}

const onBlur = () => {
    if (displayValue.value === '') {
        model.value = 0
        displayValue.value = '0'
    }
}


const increase = () => model.value++
const decrease = () => { if (model.value > 0) model.value-- }
</script>


<style scoped>
.number-input {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 13px;
    margin-bottom: 8px;
}

.required {
    color: red;
}

.number-wrapper {
    position: relative;
    top: 0;
}

input:hover,
input:focus {
    outline: none;
    border-color: #2684ff !important;
}


input {
    width: 100%;
    height: 36px;
    padding-right: 36px;
    text-align: right;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

/* Error */
input.error {
    border-color: #e53935;
}

.error-text {
    font-size: 12px;
    color: #e53935;
}

/* Spinner custom */
.spinner {
    position: absolute;
    right: 4px;
    top: 4px;
    bottom: 4px;
    width: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
}

.spinner span {
    cursor: pointer;
    font-size: 10px;
    line-height: 1;
    text-align: center;
    user-select: none;
    color: black;
}

.spinner span:hover {
    color: #2684ff;
}
</style>