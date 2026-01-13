<template>
    <div class="price-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="text" :value="displayValue" @input="onInput" @blur="format" />
    </div>
</template>
<script setup>
import { computed } from 'vue'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({
    type: Number,
    default: 0
})

/* Format tiền VN: 10000000 -> 10.000.000 */
const formatVND = (value) => {
    if (!value) return '0'
    return value.toLocaleString('vi-VN')
}

/* Hiển thị */
const displayValue = computed(() => formatVND(model.value))

/* Khi nhập */
const onInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    model.value = raw === '' ? 0 : Number(raw)
}

/* Blur -> format lại */
const format = () => {
    model.value = Number(model.value) || 0
}
</script>
<style scoped>
.price-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

label {
    font-size: 14px;
}

.required {
    color: red;
    margin-left: 2px;
}

input {
    height: 36px;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;

    text-align: right;
    /* 👈 canh phải tiền */
}

input:focus {
    outline: none;
    border-color: #2684ff;
}
</style>
