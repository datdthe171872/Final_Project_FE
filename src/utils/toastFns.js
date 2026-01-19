// utils/notify.js
import emitter from '@/bus/EventBus'
import { TOAST_TYPE } from '@/commons/constant/constant'

/**
 * Hàm thông báo thành công
 * @param {*} message
 * created by DTDat(18/1/2026)
 */
export function notifySuccess(message) {
  emitter.emit('toast', { type: TOAST_TYPE.SUCCESS, message })
}

/**
 * Hàm thông báo lỗi
 * @param {*} message
 * created by DTDat(18/1/2026)
 */
export function notifyError(message) {
  emitter.emit('toast', { type: TOAST_TYPE.ERROR, message })
}
