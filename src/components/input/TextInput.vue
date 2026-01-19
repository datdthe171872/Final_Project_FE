<template>
    <div class="input-group">
        <label v-if="label" class="input-label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input :readonly="readonly" v-show="type == 'text'" v-model="model" type="text" :disabled="disable"
            :placeholder="placeholder" class="text-input" />
        <input :readonly="readonly" v-show="type == 'baseNum'" v-model="model" type="text" :disabled="disable"
            class="text-input text-right" />
    </div>
</template>

<script setup>
const model = defineModel();
defineProps({
    label: {
        type: String,
    },
    disable: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text',
        validator: (val) => ['text', 'baseNum'].includes(val)
    },
    readonly: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.input-label {
    font-size: 13px;
    margin-bottom: 8px;
}

.text-input {
    padding-left: 14px;
    padding-right: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 36px;
}

.text-input:focus {
    outline: none;
    border-color: #409eff;
}

.text-input:disabled {
    background-color: #eee;
    cursor: not-allowed;
}

.text-input:read-only {
    cursor: not-allowed;
}

.text-right {
    text-align: right;
}

/* Make placeholder text italic */
.text-input::placeholder {
    font-style: italic;
}

.required {
    color: red;
}
</style>