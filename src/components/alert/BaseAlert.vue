<template>
    <BaseButtton :icon="props.icon" :label="props.label" :type="BUTTON_TYPE.CLOSE" @click="handleOpen">
    </BaseButtton>
    <div class="modal-overlay" v-if="isOpen">
        <div v-if="props.type == 'add'" class="asset-form">
            <!-- Body -->
            <div class="form-body">
                <div class="icon">
                    <div class="icon-alert"></div>
                </div>
                <div class="content">
                    Bạn có muốn hủy bỏ khai báo tài sản này không ?
                </div>
            </div>
            <!-- Footer -->
            <div class="form-footer">
                <BaseButtton label="Không" :type="BUTTON_TYPE.OUTLINE" @click="handleClose"></BaseButtton>
                <BaseButtton :type="BUTTON_TYPE.MAIN" label="Hủy Bỏ" @click="handleCancel"></BaseButtton>
            </div>
        </div>
        <div v-else-if="props.type == 'update'" class="asset-form">
            <!-- Body -->
            <div class="form-body">
                <div class="icon">
                    <div class="icon-alert"></div>
                </div>
                <div class="content">
                    Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu .Bạn có muốn lưu các thay đổi này
                </div>
            </div>
            <!-- Footer -->
            <div class="form-footer">
                <BaseButtton label="Hủy bỏ" :type="BUTTON_TYPE.OUTLINE" @click="handleClose"></BaseButtton>
                <BaseButtton label="Không lưu" :type="BUTTON_TYPE.SUB" @click="handleCancelNoSave"></BaseButtton>
                <BaseButtton :type="BUTTON_TYPE.MAIN" label="Lưu" @click="handleCancelSave"></BaseButtton>
            </div>
        </div>
        <div v-else-if="props.type == 'delete'" class="asset-form">
            <!-- Body -->
            <div class="form-body">
                <div class="icon">
                    <div class="icon-alert"></div>
                </div>
                <div v-if="props.data.length == 1" class="content">
                    Bạn có muốn xóa tài sản {{ assetCode }}-{{ assetName }}
                </div>
                <div v-else class="content">
                    {{ props.data.length }} tài sản đã được chọn.Bạn có muốn xóa các tài sản này không?
                </div>
            </div>
            <!-- Footer -->
            <div class="form-footer">
                <BaseButtton label="Không" :type="BUTTON_TYPE.OUTLINE" @click="handleClose"></BaseButtton>
                <BaseButtton :type="BUTTON_TYPE.MAIN" label="Xóa" @click="handleDelete"></BaseButtton>
            </div>
        </div>

    </div>
</template>
<script setup>
import AssetAPI from '@/apis/component/AssetAPI';
import BaseButtton from '../button/BaseButtton.vue'
import { BUTTON_TYPE } from '@/commons/constant/constant';
import { reactive, ref } from 'vue';
import emitter from '@/bus/EventBus';
const emit = defineEmits(['cancel'])
const isOpen = ref(false);
const assetName = ref('');
const assetCode = ref('')
const props = defineProps({
    icon: {
        type: String
    },
    label: {
        type: String
    },
    type: {
        type: String,
        validator: v => ['add', 'update', 'delete'].includes(v),
        default: 'add'
    },
    data: {
        type: Array,
    }
})

const handleOpen = () => {
    isOpen.value = true;
    //nếu update thì sẽ gọi api lấy tên asset
    if (props.type == 'delete') {
        if (props.data.length == 0) isOpen.value = false
        AssetAPI.getById(props.data[0]).then((res) => {
            //thành công thì lấy dữ liệu ra
            assetName.value = res.assetName
            assetCode.value = res.assetCode
        })
    }
}
const handleClose = () => {

    isOpen.value = false;
}
// tắt của form add
const handleCancel = () => {
    isOpen.value = false;
    emit('cancel');
}
//tắt của form update
// lưu
const handleCancelSave = () => {
    isOpen.value = false;
    emit('cancel', true);
}
// ko lưu
const handleCancelNoSave = () => {
    isOpen.value = false;
    emit('cancel', false);
}
//xóa
const handleDelete = () => {
    AssetAPI.deleteMany({
        Ids: [...props.data]
    })
    //refresh table
    emitter.emit('RefreshForm')
    //đóng alert
    isOpen.value = false;
}



</script>
<style scoped>
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
    width: 70vh;
    height: 25vh;
    border-radius: 8px;
    padding: 3vh 3vh;
    background: #fefefe;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    animation: modalFadeIn .25s ease;
    /* Ensure the footer stays at the bottom */
}

.form-body {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px;
    flex: 1;
}

.content {
    font-size: 16px;
}

.form-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    height: 52px;
    flex-shrink: 0;
    background: white;
    border-radius: 8px;
}

.icon {
    width: 10vh;
    height: 10vh;
    padding: 5px;
}

.icon-alert {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -416px -66px;
    width: 24px;
    height: 20px;
    transform: scale(2.5);

}
</style>