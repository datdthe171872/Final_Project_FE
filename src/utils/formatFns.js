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
 * Hàm định dạng lại phần trăm
 *
 * @param {*} raw
 * @returns
 * createdby: dtdat - 1/11/2026
 */
export function formatPercent(raw) {
  if (checkEmpty(raw)) {
    return -1
  }
  // Allow only digits and comma
  raw = raw.replace(/[^\d,]/g, '')
  // Only allow one comma
  const parts = raw.split(',')
  if (parts.length > 2) {
    raw = parts[0] + ',' + parts.slice(1).join('')
  }
  let num = parseFloat(raw.replace(',', '.'))
  if (isNaN(num) || num < 0) num = 0

  // If over 100, show error and do not update model
  if (num > 100) {
    return -1
  }
  // If more than 2 decimals, keep input as is, but model only gets 2 decimals
  if (raw.includes(',')) {
    const [intPart, decPart] = raw.split(',')
    if (decPart && decPart.length > 2) {
      return parseFloat(intPart + '.' + decPart.slice(0, 2))
    }
  }
  return num
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
export const isValidFloat = (value) => {
  return /^[0-9]+(,[0-9]+)?$/.test(value)
}
