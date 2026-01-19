/**
 * Hàm định dạng lại tiền tệ theo định dạng Việt Nam
 * @param {*} num
 * @returns
 * createdby: dtdat - 1/11/2026
 */
export function formatNumber(num) {
  if (checkEmpty(num)) {
    return -1
  }
  return new Intl.NumberFormat('vi-VN').format(num)
}

/**
 * Hàm check trống
 * @param {*} value
 * @returns
 * createdby: dtdat - 16/1/2026
 */
export function checkEmpty(value) {
  if (value == null || (value == '' && value != 0)) {
    return true
  }
  return false
}
/**
 * Hàm check có phải số nguyên dương không
 * @param {*} raw
 * @returns
 * createdby: dtdat - 16/1/2026
 */
export const isPositiveInt = (value) => {
  return /^[0-9]+$/.test(value)
}
/**
 * Format tiền VN: 10000000 -> 10.000.000
 * @param {*} value
 * @returns
 * createdby: dtdat - 16/1/2026
 */
export const formatVND = (value) => {
  if (!value) return '0'
  return value.toLocaleString('vi-VN')
}
/**
 * check valid số thập phân
 * @param {*} value
 * @returns
 * createdby: dtdat - 16/1/2026
 */
export function isValidFloat(value) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * lấy tỉ lệ màn hình
 * @returns tỉ lệ màn hình
 * createdby: dtdat - 16/1/2026
 */
export const getScreenSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
