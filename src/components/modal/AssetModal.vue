<template>
    <div v-if="type == 'add'">
        <BaseButtton label="+ Thêm tài sản" :type="BUTTON_TYPE.MAIN" @click="handleOpen"></BaseButtton>
    </div>
    <div v-else-if="type == 'update'">
        <BaseButtton :show="show" icon="icon-edit" :type="BUTTON_TYPE.ACTION" @click="handleOpen">
        </BaseButtton>
    </div>
    <div v-else>
        <BaseButtton :show="show" icon="icon-coppy" :type="BUTTON_TYPE.ACTION" @click="handleOpen">
        </BaseButtton>
    </div>
    <div class="modal-overlay" v-if="isOpen">
        <div class="asset-form">
            <!-- Header -->
            <div class="form-header">
                <div class="popup-title">{{ title }}</div>
                <BaseAlert icon="icon-close" :type="props.type == 'update' ? 'update' : 'add'" @cancel="handleCancel">
                </BaseAlert>
            </div>

            <!-- Body -->
            <div class="form-body">
                <div class="row">
                    <div class="row-left">
                        <TextInput required v-model="form.assetCode" label="Mã tài sản" :readonly="true" />
                    </div>
                    <div class="row-right">
                        <TextInput required v-model="form.assetName" label="Tên tài sản"
                            placeholder="Nhập tên tài sản" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <SelectDropdown required v-model="form.departmentId" type="modal" label="Mã bộ phận sử dụng"
                            :options="departments" label-field="departmentCode" value-field="departmentId"
                            placeholder="Chọn mã bộ phận sử dụng" width="100%" height="36px" />
                    </div>
                    <div class="row-right">
                        <TextInput v-model="form.departmentName" label="Tên bộ phận sử dụng" :disable="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <SelectDropdown required v-model="form.categoryId" type="modal" label="Mã loại tài sản"
                            :options="categories" label-field="categoryCode" value-field="categoryId"
                            placeholder="Chọn mã loại tài sản" width="100%" height="36px" />
                    </div>
                    <div class="row-right">
                        <TextInput v-model="form.categoryName" label="Tên loại tài sản" :disable="true" />
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <NumberInput required v-model="form.assetQuantity" label="Số lượng" />
                    </div>
                    <div class="row-right">
                        <PriceInput required v-model="form.assetOriginalPrice" label="Nguyên giá"></PriceInput>
                        <FloatInput required label="Tỷ lệ hao mòn" v-model="form.assetDepreciationRate"></FloatInput>
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <DateInput label="Ngày mua" v-model="form.assetStartDate" required></DateInput>
                    </div>
                    <div class="row-right">
                        <DateInput label="Ngày bắt đầu sử dụng" v-model="form.assetStartUsageDate" required></DateInput>
                        <TextInput type="baseNum" v-model="form.assetTrackingYear" :disable="true" label="Năm theo dõi">
                        </TextInput>
                    </div>
                </div>
                <div class="row">
                    <div class="row-left">
                        <NumberInput label="Số năm sử dụng" v-model="form.assetUsageYear" required></NumberInput>
                    </div>
                    <div class="row-right">
                        <div class="row-r-left">
                            <PriceInput required label="Giá trị hao mòn năm" v-model="form.assetDepreciationYear">
                            </PriceInput>
                        </div>
                        <div class="row-r-right"></div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="form-footer">
                <BaseAlert label="Hủy" :type="props.type == 'update' ? 'update' : 'add'" @cancel="handleCancel">
                </BaseAlert>
                <BaseButtton :type="BUTTON_TYPE.MAIN" label="Lưu" @click.prevent="handleSubmit"></BaseButtton>
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
import BaseAlert from '../alert/BaseAlert.vue';
import { AssetInput } from '@/commons/modal/Request';
import CategoryAPI from '@/apis/component/CategoryAPI';
import DepartmentAPI from '@/apis/component/DepartmentAPI';
import AssetAPI from '@/apis/component/AssetAPI';
import emitter from '@/bus/EventBus';
const isOpen = ref(false);
const props = defineProps({
    title: String,
    data: {
        type: Object,
        default: () => ({})
    },
    type: {
        type: String,
        validator: v => ['add', 'update', 'coppy'].includes(v),
        default: 'add'
    },
    show: {
        type: Boolean,
        default: false
    }

})
//lấy dữ liệu categories từ BE
const categories = ref([]);
CategoryAPI.getAll().then((result) => {
    categories.value = result
})
//lấy dữ liệu departments từ BE
const departments = ref([]);
DepartmentAPI.getAll().then((result) => {
    departments.value = result
})


// clone props → tránh sửa trực tiếp props
const form = reactive({ ...AssetInput })


watch(
    () => form.categoryId,
    (newVal) => {
        const selected = categories.value.find(item => item.categoryId === newVal)
        form.categoryName = selected ? selected.categoryName : form.categoryName
        form.assetUsageYear = selected ? selected.categoryYearUsage : form.assetUsageYear
        form.assetDepreciationRate = selected ? selected.categoryDepreciationRate : form.assetDepreciationRate

    }
)
const isfirst = ref(false)

watch(
    () => form.assetOriginalPrice,
    () => {
        if (!isfirst.value)
            form.assetDepreciationYear = form.assetOriginalPrice * form.assetDepreciationRate / 100
    }
)
watch(
    () => form.departmentId,
    (newVal) => {
        const selected = departments.value.find(item => item.departmentId === newVal)
        form.departmentName = selected ? selected.departmentName : form.departmentName
    }
)

watch(
    () => isOpen.value,
    (Open) => {
        if (Open && props.type != 'add' && props.data) {
            isfirst.value = true
            Object.assign(form, props.data)
            form.assetStartUsageDate = form.assetStartUsageDate?.slice(0, 10)
            form.assetStartDate = form.assetStartDate?.slice(0, 10)
        }
        //nếu khác update thì sẽ render assetcode
        if (Open && props.type != 'update') {
            AssetAPI.getNewCode().then((result) => {
                form.assetCode = result
            })
        }
    }
)




const handleOpen = () => {
    isOpen.value = true;
}
//bắt sự kiện để xử lý
const handleCancel = (payload) => {
    // đóng form
    isOpen.value = false;
    if (payload) {
        AssetAPI.update(form).then(() => {
            // đóng form
            isOpen.value = false
            //refresh form
            refreshForm()
            //refresh table
            emitter.emit('RefreshForm')
        })
    }
    if (!payload) {
        // refreshform
        refreshForm()
    }
}

const handleSubmit = () => {

    if (props.type == 'add' || props.type == 'coppy') {
        AssetAPI.create(form).then(() => {
            // đóng form
            isOpen.value = false
            //refresh form
            refreshForm()
            //refresh table
            emitter.emit('RefreshForm')
        })
    } else {
        AssetAPI.update(form).then(() => {
            // đóng form
            isOpen.value = false
            //refresh form
            refreshForm()
            //refresh table
            emitter.emit('RefreshForm')
        })
    }
}
//binding data
const refreshForm = () => {
    Object.assign(form, AssetInput)
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
    z-index: 2000;
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
