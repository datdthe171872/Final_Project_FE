<template>
    <div class="content-body">
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="checkbox-col">
                            <input type="checkbox" />
                        </th>
                        <th>STT</th>
                        <th>Mã tài sản</th>
                        <th>Tên tài sản</th>
                        <th>Loại tài sản</th>
                        <th>Bộ phận sử dụng</th>
                        <th class="text-right">Số lượng</th>
                        <th class="text-right">Nguyên giá</th>
                        <th class="text-right">HM/KH lũy kế</th>
                        <th class="text-right">Giá trị còn lại</th>
                        <th class="action-col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index" :class="{ 'row-selected': index === 0 }">
                        <td class="checkbox-col">
                            <input type="checkbox" />
                        </td>
                        <td>{{ item.stt }}</td>
                        <td>{{ item.maTaiSan }}</td>
                        <td>{{ item.tenTaiSan }}</td>
                        <td>{{ item.loaiTaiSan }}</td>
                        <td>{{ item.boPhanSuDung }}</td>
                        <td class="text-right">{{ item.soLuong }}</td>
                        <td class="text-right">{{ formatNumber(item.nguyenGia) }}</td>
                        <td class="text-right">{{ formatNumber(item.hmKhLuyKe) }}</td>
                        <td class="text-right">{{ formatNumber(item.giaTriConLai) }}</td>
                        <td class="action-col">
                            <div class="action-buttons">
                                <button class="action-btn">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                            fill="currentColor" />
                                    </svg>
                                </button>
                                <button class="action-btn">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                                            fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="summary-row">
                        <td colspan="6" class="summary-label">Tổng cộng</td>
                        <td class="text-right">{{ totalSoLuong }}</td>
                        <td class="text-right">{{ formatNumber(totalNguyenGia) }}</td>
                        <td class="text-right">{{ formatNumber(totalHmKhLuyKe) }}</td>
                        <td class="text-right">{{ formatNumber(totalGiaTriConLai) }}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="table-footer">
            <div class="footer-left">
                <span>Tổng số: <strong>{{ totalRecords }}</strong> bản ghi</span>
                <select class="page-select" style="margin: 0 8px; width: 56px;">
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                </select>
                <div class="pagination" style="display: inline-flex; vertical-align: middle;">
                    <button class="page-btn" :disabled="currentPage === 1">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                        </svg>
                    </button>
                    <button v-for="page in visiblePages" :key="page" class="page-btn"
                        :class="{ active: page === currentPage }">
                        {{ page }}
                    </button>
                    <button class="page-btn" :disabled="currentPage === totalPages">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="footer-summary" style="margin-left: auto; text-align: right; font-size: 13px; color: #1e3a5f;">
                <span style="margin-right: 24px;">{{ totalSoLuong }}</span>
                <span style="margin-right: 24px;">{{ formatNumber(totalNguyenGia) }}</span>
                <span style="margin-right: 24px;">{{ formatNumber(totalHmKhLuyKe) }}</span>
                <span>{{ formatNumber(totalGiaTriConLai) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { AssetsData } from '@/commons/constant/constant'
const tableData = ref(AssetsData);
const currentPage = ref(1)
const totalPages = ref(10)
const totalRecords = ref(200)

const totalSoLuong = computed(() => {
    return tableData.value.reduce((sum, item) => sum + item.soLuong, 0)
})

const totalNguyenGia = computed(() => {
    return tableData.value.reduce((sum, item) => sum + item.nguyenGia, 0)
})

const totalHmKhLuyKe = computed(() => {
    return tableData.value.reduce((sum, item) => sum + item.hmKhLuyKe, 0)
})

const totalGiaTriConLai = computed(() => {
    return tableData.value.reduce((sum, item) => sum + item.giaTriConLai, 0)
})

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

const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num)
}
</script>

<style scoped>
.content-body {
    background-color: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.table-container {
    flex: 1;
    overflow: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.data-table thead {
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 10;
}

.data-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #1e3a5f;
    border-bottom: 2px solid #e0e0e0;
    white-space: nowrap;
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
    padding: 12px 16px;
    color: #333333;
}

.data-table td.text-right {
    text-align: right;
}

.checkbox-col {
    width: 40px;
    text-align: center;
}

.checkbox-col input[type="checkbox"] {
    cursor: pointer;
}

.action-col {
    width: 100px;
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

.summary-row {
    background-color: #f5f5f5;
    font-weight: 600;
}

.summary-label {
    text-align: right;
    color: #1e3a5f;
}

/* Footer redesign for alignment */
.table-footer {
    padding: 8px 16px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    font-size: 13px;
}

.footer-left {
    display: flex;
    align-items: center;
}

.footer-summary {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-weight: 600;
    color: #1e3a5f;
}

.footer-info {
    color: #666666;
    font-size: 14px;
}

.footer-info strong {
    color: #1e3a5f;
}

.footer-controls {
    display: flex;
    gap: 24px;
    align-items: center;
}

.records-per-page {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666666;
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
    display: flex;
    gap: 4px;
    align-items: center;
}

.page-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #e0e0e0;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666666;
    transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
    background-color: #f5f5f5;
    border-color: #4a90e2;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn.active {
    background-color: #4a90e2;
    color: #ffffff;
    border-color: #4a90e2;
}

.page-btn svg {
    width: 20px;
    height: 20px;
}
</style>
