<template>
    <div class="percent-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="text" :class="{ error: hasError }" :value="displayValue" @keydown="onKeydown" @input="onInput" />


        <p v-if="hasError" class="error-text">
            Vui lòng nhập số đúng quy định và tỷ lệ phần trăm không vượt quá 100%
        </p>
    </div>
</template>
<script setup>
import { isValidFloat } from '@/utils/formatFns'
import { ref, watch } from 'vue'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({ type: Number, default: 0 })

const displayValue = ref('0')
const hasError = ref(false)
const emit = defineEmits(['hasErr'])


// Sync khi parent đổi model
watch(model, (val) => {
    displayValue.value = val.toString().replace('.', ',')
}, { immediate: true })

const onKeydown = (e) => {
    const allow =
        /[0-9.,]/.test(e.key) ||
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
    if (!allow) e.preventDefault()
}

const normalize = (val) => val.replace(',', '.')

const onInput = (e) => {
    const raw = e.target.value
    displayValue.value = raw
    const num = Number(normalize(raw))
    if (isValidFloat(num)) {
        model.value = num
    }
    // Validate ngay khi nhập
    hasError.value = isNaN(num) || num < 0 || num > 100
    if (hasError.value) emit('hasErr', true)
    else emit('hasErr', false)
}



</script>
<style scoped>
.percent-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

label {
    font-size: 13px;
}

.required {
    color: red;
}

input {
    height: 36px;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    text-align: right;
}

input:focus {
    outline: none;
    border-color: #2684ff;
}

/* Error */
input.error {
    border-color: #e53935;
}

.error-text {
    font-size: 12px;
    color: #e53935;
}
</style>
