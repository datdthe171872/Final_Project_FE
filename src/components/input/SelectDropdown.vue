<template>
    <div class="input-group" :style="{ width: width, height: height }">
        <label v-if="label" class="input-label">{{ label }}
            <span v-if="required" class="required">*</span>
        </label>
        <div class="custom-select-wrapper" @click="toggleDropdown">
            <div class="custom-select-display" :style="{ width: width, height: height }">
                <div class="icon" v-show="props.icon">
                    <div class="icon-filter"></div>
                </div>
                <span :class="{ 'placeholder-text': !modelValue && type == 'modal' }">
                    {{ displayValue || placeholder || 'Chọn' }}
                </span>
                <div class="arrow-icon">
                    <div class="arrow-down"></div>
                </div>
            </div>
            <div v-if="isOpen" :class="['custom-select-dropdown', placement]">
                <div v-for="option in computedOptions" :key="option[valueField] || option" class="custom-select-option"
                    :class="{ selected: modelValue === (option[valueField] ?? option) }"
                    @click.stop="selectOption(option[valueField] ?? option)">
                    {{ option[labelField] ?? option }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


import { computed, onMounted, onUnmounted, ref } from 'vue'
const props = defineProps({
    placeholder: {
        type: String,
    },
    label: {
        type: String
    },
    icon: {
        type: String,
    },
    modelValue: {
        type: [String, Number, Object],
        default: null
    },
    options: {
        type: Array,
        default: () => []
    },
    labelField: {
        type: String,
        default: 'title'
    },
    valueField: {
        type: String,
        default: 'title'
    },
    width: {
        type: String,
        default: '219px'
    },
    height: {
        type: String,
        default: '35px'
    },
    placement: {
        type: String,
        default: 'bottom', // 'bottom' hoặc 'top'
        validator: (val) => ['bottom', 'top'].includes(val)
    },
    type: {
        type: String,
        default: 'filter',
        validator: (val) => ['modal', 'filter', 'paging'].includes(val)
    },
    required: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
const displayValue = computed(() => {
    if (props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '') {
        const option = computedOptions.value.find(
            (opt) => (opt[props.valueField] ?? opt) === props.modelValue
        )
        return option ? (option[props.labelField] ?? option) : props.modelValue
    }
    // Nếu modelValue là '', tìm option "Tất cả"
    if (props.modelValue === '') {
        const allOption = computedOptions.value.find(
            (opt) => (opt[props.valueField] ?? opt) === ''
        )
        return allOption ? (allOption[props.labelField] ?? allOption) : ''
    }
    return ''
})
const computedOptions = computed(() => {
    if (props.type == 'filter') {
        return [
            { [props.labelField]: 'Tất cả', [props.valueField]: '' },
            ...props.options
        ]
    }
    return props.options
})
const isOpen = ref(false)
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
const closeDropdown = (event) => {
    if (!event.target.closest('.custom-select-wrapper')) {
        isOpen.value = false
    }
}
const selectOption = (value) => {
    emit('update:modelValue', value)
    isOpen.value = false
}
onMounted(() => {
    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>
<style scoped>
.input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.input-label {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
}

/* Custom Select Styles */
.custom-select-wrapper {
    position: relative;
    display: flex;
    margin: 0;
}

.custom-select-display {

    background-color: white;
    height: 35px;
    border-radius: 4px;
    border: 1px solid #afafaf;
    gap: 5px;
    padding: 0 24px 0 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
}

.arrow-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s;
    cursor: pointer;
    pointer-events: auto;
}

.placeholder-text {
    color: #acabab;
    font-style: italic;
}

.custom-select-dropdown {
    position: absolute;
    /* top hoặc bottom sẽ được set động qua :class */
    left: 0;
    right: 0;
    background: white;
    border: 1px solid rgb(216, 216, 216);
    border-radius: 6px;
    margin-top: 4px;
    margin-bottom: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.custom-select-dropdown.top {
    bottom: 100%;
    top: auto;
    margin-bottom: 4px;
    margin-top: 0;
}

.custom-select-dropdown.bottom {
    top: 100%;
    bottom: auto;
    margin-top: 4px;
    margin-bottom: 0;
}

.custom-select-option {
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.custom-select-option:hover {
    background-color: #f0f0f0;
}

.custom-select-option.selected {
    background-color: #e6f2ff;
    color: #2680eb;
    font-weight: 500;
}

.required {
    color: red;
}

.arrow-down {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -72px -338px;
    width: 8px;
    height: 5px;
}

.icon-filter {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -243px -69px;
    width: 17px;
    height: 16px;
}
</style>