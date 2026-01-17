export const sidebarItems = [
  { icon: 'icon-homepage', title: 'Tổng quan', active: false, more: false },
  { icon: 'icon-property', title: 'Tài sản', active: true, more: true },
  { icon: 'icon-htdb', title: 'Tài sản HT-ĐB', active: false, more: true },
  { icon: 'icon-ccdc', title: 'Công cụ dụng cụ', active: false, more: true },
  { icon: 'icon-category', title: 'Danh mục', active: false, more: false },
  { icon: 'icon-search', title: 'Tra cứu', active: false, more: true },
  { icon: 'icon-report', title: 'Báo cáo', active: false, more: true },
]
export const BUTTON_TYPE = {
  MAIN: 'main',
  SUB: 'sub',
  OUTLINE: 'outline',
  CLOSE: 'close',
  ACTION: 'action',
}

export const AssetColumnsEng = [
  { id: 'assetCode', label: 'Mã tài sản', type: 'string' },
  { id: 'assetName', label: 'Tên tài sản', type: 'string' },
  { id: 'categoryName', label: 'Loại tài sản', type: 'string' },
  { id: 'departmentName', label: 'Bộ phận sử dụng', type: 'string' },
  { id: 'assetQuantity', label: 'Số lượng', type: 'number' },
  { id: 'assetOriginalPrice', label: 'Nguyên giá', type: 'number' },
  { id: 'depreciationCumulative', label: 'HM/KH lũy kế', type: 'number' },
  { id: 'remainValue', label: 'Giá trị còn lại', type: 'number' },
]
export const pageSizeOptions = [20, 50, 100]

export const tableType = {
  ASSET: 'asset',
}
export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
}
