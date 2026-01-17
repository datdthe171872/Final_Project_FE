<template>
    <div class="percent-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="text" :class="{ error: hasError }" :value="displayValue" @keydown="onKeydown" @input="onInput"
            @blur="onBlur" @focus="onFocus" />


        <p v-if="hasError" class="error-text">
            Vui lòng chỉ nhập số và tỷ lệ phần trăm không được vượt quá 100%
        </p>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({ type: Number, default: 0 })

const displayValue = ref('0')
const hasError = ref(false)
const isFocus = ref(false)

// Sync khi parent đổi model
watch(model, (val) => {
    displayValue.value = val.toString().replace('.', ',')
    hasError.value = false
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
    if (isNaN(num) || num < 0 || num > 100) {
        hasError.value = true
        return
    }

    hasError.value = false
    model.value = num
}

const onBlur = () => {
    const num = Number(normalize(displayValue.value))
    if (isNaN(num) || num < 0 || num > 100) {
        hasError.value = true
        model.value = 0
        displayValue.value = '0'
    } else {
        displayValue.value = num.toString().replace('.', ',')
    }
}

const onFocus = () => {
    isFocus.value = true
    hasError.value = false
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
    font-size: 14px;
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
