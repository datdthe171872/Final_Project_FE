// utils/notify.js
import emitter from '@/bus/EventBus'
import { TOAST_TYPE } from '@/commons/constant/constant'

export function notifySuccess(message) {
  emitter.emit('toast', { type: TOAST_TYPE.SUCCESS, message })
}

export function notifyError(message) {
  emitter.emit('toast', { type: TOAST_TYPE.ERROR, message })
}
