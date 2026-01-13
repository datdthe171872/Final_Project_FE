/**
 * Hàm định dạng lại tiền tệ theo định dạng Việt Nam
 * @param {*} num
 * @returns
 * createdby: dtdat - 1/11/2026
 */
export function formatNumber(num) {
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
