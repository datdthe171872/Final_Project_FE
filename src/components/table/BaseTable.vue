<template>
    <div class="table-container">
        <table class="data-table">
            <!-- table head -->
            <thead>
                <tr>
                    <th class="checkbox-col">
                        <input type="checkbox" />
                    </th>
                    <th>STT</th>
                    <th :class="{ 'text-right': field.type == 'number' }" v-for="field in fields" :key="field.id">{{
                        field.label }}</th>
                    <th class="action-col">Chức năng</th>
                </tr>
            </thead>
            <!-- table body  -->
            <tbody>
                <tr v-for="(row, index) in pagedRows" :key="index">
                    <td class="checkbox-col">
                        <input type="checkbox" />
                    </td>
                    <td>{{ row.stt }}</td>
                    <td :class="{ 'text-right': field.type == 'number' }" v-for="field in fields" :key="field.id">
                        {{ field.type == 'number' ? formatNumber(row[field.id]) : row[field.id] }}
                    </td>
                    <td class="action-col">
                        <div class="action-buttons">
                            <button class="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="icon edit-icon">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="summary-row">
                    <td colspan="4">

                        <div class="footer-left ">
                            <span class="total-record">Tổng số: <strong>{{ totalRecords }}</strong> bản ghi</span>
                            <SelectDropdown v-model="currentPageSize" :options="pageSizeOptions" width="50px"
                                height="25px" placement="top" />
                            <div class="pagination" style="display: inline-flex; vertical-align: middle;">
                                <button class="page-btn" :disabled="currentPage === 1">
                                    <div class="icon-pre"></div>
                                </button>
                                <button v-for="page in visiblePages" :key="page" class="page-btn"
                                    :class="{ active: page === currentPage }">
                                    {{ page }}
                                </button>
                                <button class="page-btn" :disabled="currentPage === totalPages">
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
import { pageSizeOptions } from '@/commons/constant/constant'
import { formatNumber } from '@/utils/formatFns'
import { ref, computed } from 'vue'
import SelectDropdown from '../input/SelectDropdown.vue'

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
    type: {
        type: String,
        default: ''
    }
})
// left footer 
/* -------------------------
   Pagination
------------------------- */
const currentPage = ref(1)
const currentPageSize = ref(props.pageSize[0])
const totalRecords = computed(() => props.rows.length)
const totalPages = computed(() =>
    Math.ceil(props.rows.length / currentPageSize.value)
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
        if (currentPage.value <= 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(totalPages.value)
        } else if (currentPage.value >= totalPages.value - 2) {
            pages.push(1)
            pages.push('...')
            for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            pages.push('...')
            for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(totalPages.value)
        }
    }
    return pages
})


const pagedRows = computed(() => {
    const start = (currentPage.value - 1) * currentPageSize.value
    return props.rows.slice(start, start + currentPageSize.value)
})
// right footer 
/**
 * Hàm định dạng lại tiền tệ theo định dạng Việt Nam
 * @param {*} num
 * @returns
 * createdby: dtdat - 1/11/2026
 */
const totalQuantity = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.soLuong || 0), 0)
)
const totalOriginalPrice = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.nguyenGia || 0), 0)
)
const totalCumulative = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.hmKhLuyKe || 0), 0)
)
const totalRemainingValue = computed(() =>
    props.rows.reduce((sum, row) => sum + (row.giaTriConLai || 0), 0)
)
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
    background-color: #f9f9f9;
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
    text-align: center;
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
    background-color: #f5f5f5;
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