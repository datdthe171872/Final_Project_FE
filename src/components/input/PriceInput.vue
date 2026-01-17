<template>
    <div class="price-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="text" :value="rawInput" @keydown="onKeydown" @input="onInput" @focus="onFocus" @blur="onBlur" />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { formatVND } from '@/utils/formatFns'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({ type: Number, default: 0 })

const rawInput = ref('0')
const isFocus = ref(false)

// Sync khi parent đổi model
watch(model, (val) => {
    if (isFocus.value) return
    rawInput.value = formatVND(val ?? 0)
}, { immediate: true })

const onKeydown = (e) => {
    const allow =
        /[0-9]/.test(e.key) ||
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)

    if (!allow) e.preventDefault()
}

const onInput = (e) => {
    const clean = e.target.value.replace(/\D/g, '')
    rawInput.value = clean        // cho phép rỗng
    model.value = clean === '' ? 0 : Number(clean)
}

const onFocus = () => {
    isFocus.value = true
    rawInput.value = model.value.toString()
}

const onBlur = () => {
    isFocus.value = false

    if (rawInput.value === '') {
        model.value = 0
    }

    rawInput.value = formatVND(model.value)
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
