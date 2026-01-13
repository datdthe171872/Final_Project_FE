<template>
    <div class="number-input">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>
        <div class="number-wrapper">
            <input type="text" :value="model" @input="onInput" />
            <div class="spinner">
                <span @click="increase">▲</span>
                <span @click="decrease">▼</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const model = defineModel({
    type: Number,
    default: 0
})

defineProps({
    label: String,
    required: Boolean
})

const increase = () => {
    model.value++
}

const decrease = () => {
    if (model.value > 0) {
        model.value--
    }
}

const onInput = (e) => {
    const val = e.target.value.replace(/\D/g, '')
    model.value = val === '' ? 0 : Number(val)
}
</script>

<style scoped>
.number-input {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
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