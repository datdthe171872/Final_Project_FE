<template>
    <BaseButtton label="+ Thêm tài sản" :type="BUTTON_TYPE.MAIN" @click="handleOpen"></BaseButtton>
    <div class="modal-overlay" v-if="isOpen">
        <div class="asset-form">
            <!-- Header -->
            <div class="form-header">
                <div class="popup-title">{{ title }}</div>
                <BaseButtton icon="icon-close" :type="BUTTON_TYPE.OUTLINE" @click="$emit('close')"></BaseButtton>
            </div>

            <!-- Body -->
            <div class="form-body">
                <div class="row">
                    <div class="row-left">
                        <TextInput v-model="form.assetCode" label="Mã tài sản" />
                    </div>
                    <div class="row-right">
                        <TextInput v-model="form.assetName" label="Tên tài sản" placeholder="Nhập tên tài sản" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <SelectDropdown v-model="form.assetTypeCode" label="Mã bộ phận sử dụng" :options="[]"
                            placeholder="Chọn mã bộ phận sử dụng" width="100%" />
                    </div>
                    <div class="row-right">
                        <TextInput v-model="form.departmentName" label="Tên bộ phận sử dụng" :disable="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <SelectDropdown v-model="form.assetTypeCode" label="Mã loại tài sản" :options="[]"
                            placeholder="Chọn mã loại tài sản" width="100%" height="36px" />
                    </div>
                    <div class="row-right">
                        <TextInput v-model="form.departmentName" label="Tên loại tài sản" :disable="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <NumberInput v-model="form.quantity" label="Số lượng" />
                    </div>
                    <div class="row-right">
                        <PriceInput v-model="form.originalPrice" label="Nguyên giá"></PriceInput>
                        <FloatInput label="Tỷ lệ hao mòn" v-model="form.depreciationRate"></FloatInput>
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <DateInput label="Ngày mua" v-model="form.startDate" required></DateInput>
                    </div>
                    <div class="row-right">
                        <DateInput label="Ngày bắt đầu sử dụng" v-model="form.purchaseDate" required></DateInput>
                        <TextInput type="baseNum" v-model="form.trackingYear" label="Năm theo dõi"></TextInput>
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <NumberInput label="Số năm sử dụng" v-model="form.usageYears" required></NumberInput>
                    </div>
                    <div class="row-right">
                        <div class="row-r-left">
                            <PriceInput label="Giá trị hao mòn năm" v-model="form.depreciationValue"></PriceInput>
                        </div>
                        <div class="row-r-right"></div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="form-footer">
                <BaseButtton label="Hủy" :type="BUTTON_TYPE.OUTLINE" @click="$emit('close')"></BaseButtton>
                <BaseButtton :type="BUTTON_TYPE.MAIN" label="Lưu" @click="handleSubmit"></BaseButtton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import BaseButtton from '../button/BaseButtton.vue'
import { BUTTON_TYPE } from '@/commons/constant/constant';
import TextInput from '../input/TextInput.vue';
import SelectDropdown from '../input/SelectDropdown.vue';
import NumberInput from '../input/NumberInput.vue';
import PriceInput from '../input/PriceInput.vue';
import FloatInput from '../input/FloatInput.vue';
import DateInput from '../input/DateInput.vue';
const isOpen = ref(false);
const props = defineProps({
    title: String,
    data: {
        type: Object,
        default: () => ({})
    },
    type: {
        type: String,
        validator: v => ['add', 'update'].includes(v),
        default: 'add'
    }
})

const emit = defineEmits(['submit', 'close'])

const defaultForm = {
    assetCode: '',
    assetName: '',
    departmentCode: '',
    departmentName: '',
    assetTypeCode: '',
    assetTypeName: '',
    quantity: 1,
    originalPrice: 0,
    depreciationRate: 0,
    purchaseDate: '',
    startDate: '',
    trackingYear: new Date().getFullYear(),
    usageYears: 0,
    depreciationValue: 0
}

// clone props → tránh sửa trực tiếp props
const form = reactive({ ...defaultForm })

watch(
    () => props.data,
    (val) => {
        if (props.type === 'update' && val) {
            Object.assign(form, val)
        }
    },
    { immediate: true }
)
const handleOpen = () => {
    isOpen.value = true;
}
const handleSubmit = () => {
    emit('submit', {
        ...form,
        type: props.type
    })
}
</script>
<style scoped>
/* Overlay phủ toàn màn hình */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    /* làm tối nền */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

/* Form chính */
.asset-form {
    width: 120vh;
    height: 80vh;
    border-radius: 8px;
    background: #fefefe;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    animation: modalFadeIn .25s ease;
    /* Ensure the footer stays at the bottom */
}

/* Body scroll nếu form dài */
.form-body {
    padding: 16px;
    overflow-y: auto;
    flex: 1;
}

/* Header & footer */

.form-header,
.form-footer {
    padding: 16px;
    background: white;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
}

.popup-title {
    font-size: 20px;
    font-weight: 600;
}

.form-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    height: 52px;
    flex-shrink: 0;
    background: #ebebeb;
}

.form-body {
    padding: 0 16px;
}

.row {
    display: flex;
    gap: 16px;
    margin-bottom: 15px;
}

.row-left {
    width: 50%;
}

.row-right {
    width: 100%;
    display: flex;
    gap: 16px;
}

.row-r-left,
.row-r-right {
    width: 50%;
}

.col {
    flex: 1;
    display: flex;
    flex-direction: column;
}

label {
    font-size: 13px;
    margin-bottom: 4px;
}

input,
select {
    height: 36px;
    padding: 6px 8px;
}
</style>
