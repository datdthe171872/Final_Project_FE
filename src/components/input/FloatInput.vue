<template>
    <div class="percent-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input type="text" :class="{ error: hasError }" :value="inputValue" @input="onInput" @blur="format" />

        <p v-if="hasError" class="error-text">
            Tỷ lệ phần trăm không được vượt quá 100%
        </p>
    </div>
</template>
<script setup>
import { formatPercent } from '@/utils/formatFns'
import { ref, watch, defineProps } from 'vue'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({
    type: Number,
})

const hasError = ref(false)
const inputValue = ref('0')

// Đồng bộ inputvalue với model (except when error)
watch(model, (val) => {
    if (!hasError.value) {
        inputValue.value = val.toString().replace('.', ',')
    }
})

// Validate và handle input
const onInput = (e) => {
    inputValue.value = e.target.value
    let num = formatPercent(e.target.value);
    if (num < 0) {
        hasError.value = true
        return
    } else {
        hasError.value = false
    }
    model.value = num
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
