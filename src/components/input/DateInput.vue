<template>
    <div class="date-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <div class="date-wrapper">
            <!-- Input hiển thị -->
            <input type="text" :value="displayValue" readonly @click="openPicker" />

            <!-- Icon -->
            <span class="icon" @click="openPicker">
                <div class="icon">
                    <div class="icon-date"></div>
                </div>
            </span>

            <!-- Native date picker (ẩn) -->
            <input ref="picker" type="date" class="native-picker" @change="onChange" />
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'

defineProps({
    label: String,
    required: Boolean
})

const model = defineModel({
    type: String,
    default: ''
})

const picker = ref(null)

/* dd/mm/yyyy */
const formatDate = (value) => {
    if (!value) return ''
    const [y, m, d] = value.split('-')
    return `${d}/${m}/${y}`
}

const displayValue = computed(() => formatDate(model.value))

const openPicker = () => {
    picker.value?.showPicker()
}

const onChange = (e) => {
    model.value = e.target.value
}
</script>
<style scoped>
.date-input {
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

.date-wrapper {
    position: relative;
}

input[type="text"] {
    width: 100%;
    height: 36px;
    padding: 6px 36px 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

input[type="text"]:focus {
    outline: none;
    border-color: #2684ff;
}

.icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
}

/* Ẩn date input gốc */
.native-picker {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.icon-date {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -287px -67px;
    width: 18px;
    height: 18px;
}
</style>
