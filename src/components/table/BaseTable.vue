<template>
    <div class="table-container">
        <table class="data-table">
            <!-- table head -->
            <thead>
                <tr>
                    <th class="checkbox-col">
                        <input type="checkbox" :checked="isAllSelected" @change="handleChoseAll($event)" />
                    </th>
                    <th>STT</th>
                    <th :class="{ 'text-right': field.type == 'number' }" v-for="field in fields" :key="field.id">{{
                        field.label }}</th>
                    <th class="action-col">Chức năng</th>
                </tr>
            </thead>
            <!-- table body  -->
            <tbody>
                <tr v-for="(row, index) in props.rows" :key="index" @mouseenter="hoverRow = index"
                    @mouseleave="hoverRow = null">
                    <td class="checkbox-col">
                        <input type="checkbox" :checked="selectIds.includes(row[props.type + 'Id'])"
                            @change="HandleSelectIds(row[props.type + 'Id'], $event)" />
                    </td>
                    <td>{{ (form.pageIndex - 1) * form.pageSize + index + 1 }}</td>
                    <td :class="{ 'text-right': field.type == 'number' }" v-for="field in fields" :key="field.id">
                        {{ field.type == 'number' ? formatNumber(row[field.id]) : row[field.id] }}
                    </td>
                    <td class="action-col">

                        <AssetModal :show="hoverRow === index" title="Sửa tài sản" type="update" :data="row">
                        </AssetModal>
                        <AssetModal :show="hoverRow === index" title="Nhân bản tài sản" type="coppy" :data="row">
                        </AssetModal>

                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="summary-row">
                    <td colspan="4">

                        <div class="footer-left ">
                            <span class="total-record">Tổng số: <strong>{{ form.total }}</strong> bản ghi</span>
                            <SelectDropdown type="paging" v-model="form.pageSize" :options="pageSizeOptions"
                                width="50px" height="25px" placement="top" />
                            <div class="pagination" style="display: inline-flex; vertical-align: middle;">
                                <button class="page-btn" :disabled="form.pageIndex === 1"
                                    @click="() => { form.pageIndex-- }">
                                    <div class="icon-pre"></div>
                                </button>
                                <button v-for="page in visiblePages" :key="page" class="page-btn"
                                    :class="{ active: page === form.pageIndex }"
                                    @click="() => { form.pageIndex = page }">
                                    {{ page }}
                                </button>
                                <button class="page-btn" :disabled="form.pageIndex === totalPages"
                                    @click="() => { form.pageIndex++ }">
                                    <div class="icon-next"></div>
                                </button>
                            </div>
                        </div>

                    </td>
                    <td colspan="2" class="summary-label">Tổng cộng</td>
                    <td class="text-right">{{ totalQuantity }}</td>
                    <td class="text-right">{{ formatNumber(totalOriginalPrice) }}</td>
                    <td class="text-right">{{ formatNumber(totalCumulative) }}</td>
                    <td class="text-right">{{ formatNumber(totalRemainingValue) }}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script setup>
import { pageSizeOptions, tableType } from '@/commons/constant/constant'
import { formatNumber } from '@/utils/formatFns'
import { ref, computed, reactive, watch } from 'vue'
import SelectDropdown from '../input/SelectDropdown.vue'
import AssetModal from '../modal/AssetModal.vue'
import emitter from '@/bus/EventBus'

const props = defineProps({
    fields: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    pageSize: {
        type: Array,
        default: () => pageSizeOptions
    },
    paging: {
        type: Object,
    },
    //cực kì quan trọng 
    //tên bảng để lấy Id
    type: {
        type: String,
        default: tableType.ASSET,
        validator: v => Object.values(tableType).includes(v),
    }
})


//hover
const hoverRow = ref(null)
// left footer 
/* -------------------------
   Pagination
------------------------- */
// clone props → tránh sửa trực tiếp props
const form = reactive({ ...props.paging })
//totalpages
const totalPages = computed(() => {
    return Math.ceil(form.total / form.pageSize);
})
watch(
    () => props.rows,
    () => {
        //tính lại total
        form.total = props.paging.total
    }
)


watch(
    () => form.pageSize,
    () => {
        emitter.emit('pageSizeChange', form.pageSize)
    }
)

watch(
    () => form.pageIndex,
    () => {
        emitter.emit('pageChange', form.pageIndex)
    }
)
/**
 * Hàm tính toán các trang hiển thị trong phân trang
 * trường hợp có ít hơn 7 trang thì hiển thị tất cả
 * trường hợp có nhiều hơn 7 trang thì hiển thị rút gọn với 3 trường hợp
 * trang hiện tại ở đầu: hiển thị 5 trang đầu + ... + trang cuối
 * trang hiện tại ở cuối: hiển thị trang đầu + ... + 5 trang cuối
 * trang hiện tại ở giữa: hiển thị trang đầu + ... + trang trước + trang hiện tại + trang sau + ... + trang cuối
 * @param {}
 * @returns array các trang hiển thị
 * createdby: dtdat - 1/11/2026
 */
const visiblePages = computed(() => {
    const pages = []
    if (totalPages.value <= 7) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i)
        }
    } else {
        if (form.pageIndex <= 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(totalPages.value)
        } else if (form.pageIndex >= totalPages.value - 2) {
            pages.push(1)
            pages.push('...')
            for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            pages.push('...')
            for (let i = form.pageIndex - 1; i <= form.pageIndex + 1; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(totalPages.value)
        }
    }
    return pages
})

// right footer 

const totalQuantity = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.assetQuantity || 0), 0)
)
const totalOriginalPrice = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.assetOriginalPrice || 0), 0)
)
const totalCumulative = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.depreciationCumulative || 0), 0)
)
const totalRemainingValue = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.remainValue || 0), 0)
)
//delete
const selectIds = ref([])
//chọn tất cả 
//nếu chọn tất cả thì checked
const isAllSelected = computed(() => {
    return props.rows.length > 0 &&
        selectIds.value.length === props.rows.length
})
//nếu click vòa chọn tất cả thì 
const handleChoseAll = (event) => {
    // chọn tất cả
    if (event.target.checked) {
        //chuyển tất cả check box bằng check 
        selectIds.value = props.rows.map(row => row[props.type + 'Id']);
    } else {
        //bỏ chọn tất cả
        selectIds.value = []
    }
}
const HandleSelectIds = (id, event) => {
    if (event.target.checked) {
        // thêm id
        if (!selectIds.value.includes(id)) {
            selectIds.value.push(id)
        }
    } else {
        // bỏ id
        selectIds.value = selectIds.value.filter(x => x !== id)

    }
    //truyền dữ liệu cho thằng button delete ở header
    emitter.emit('DeleteMany', [...selectIds.value])
}
</script>
<style scoped>
.table-container {
    flex: 1;
    overflow: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.data-table thead {
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 10;
    height: 38px !important;
}

.data-table th {
    padding: 0px 16px 0px 0px;
    text-align: left;
    font-weight: 700;
    font-size: 13px;
    color: #001031;
    border-bottom: 2px solid #e0e0e0;
    white-space: nowrap;
    height: 38px !important;
}

.data-table th.text-right {
    text-align: right;
}

.data-table tbody tr {
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s;
}

.data-table tbody tr:hover {
    background-color: rgba(26, 164, 200, .2);
}

.data-table tbody tr.row-selected {
    background-color: #e3f2fd;
}

.data-table td {
    padding: 0px 16px 0px 0px;
    height: 40px !important;
    color: #333333;
}

.data-table td.text-right {
    text-align: right;
}

.checkbox-col {
    width: 40px;
    padding: 0 20px 0 16px !important;
    text-align: center;
}

.checkbox-col input[type="checkbox"] {
    cursor: pointer;
}

.action-col {
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.action-btn:hover {
    background-color: #f0f0f0;
}

.action-btn svg {
    width: 18px;
    height: 18px;
    color: #666666;
}

.data-table tfoot tr {
    position: sticky;
    bottom: 0 !important;
    background: #fff;
    z-index: 11;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
}



.summary-row {
    background-color: white;
    font-weight: 600;
}

.summary-label {
    text-align: right;
    color: #1e3a5f;
}



.footer-left {
    display: flex;
    align-items: center;
}

.total-record {
    width: 150px;
    text-align: center;
}

.footer-summary {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: 600;
    color: #1e3a5f;
}


.page-select {
    padding: 6px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
}

.pagination {
    margin-left: 15px;
    display: flex;
    gap: 4px;
    align-items: center;
}

.page-btn {
    width: 20px;
    height: 20px;
    border: none;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: black;
    transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
    background-color: #1aa4c8;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn.active {
    background-color: #e9e9e9;
}

/* //icon  */
.icon-pre {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -28px -246px;
    width: 8px;
    height: 12px;
}

.icon-next {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -72px -246px;
    width: 8px;
    height: 12px;
}
</style>