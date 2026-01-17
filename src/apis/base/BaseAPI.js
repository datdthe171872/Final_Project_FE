import api from '@/apis/config/APIconfig'
import { checkEmpty } from '@/utils/formatFns'
import { notifyError, notifySuccess } from '@/utils/toastFns'
import { ref } from 'vue'
export default class BaseAPI {
  constructor() {
    this.controller = null
  }

  /**
   * Phương thức lấy tất cả dữ liệu
   */
  getAll() {
    return api
      .get(`${this.controller}`)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        //bắt lỗi nghiệp vụ BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
  getById(id) {
    //check null
    if (checkEmpty(id)) {
      //show thông báo
      notifyError(`Id nhập vào đang trống `)
      return null
    }
    return api
      .get(`${this.controller}/getById?id=${id}`)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        //bắt lỗi nghiệp vụ BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
  create(body) {
    // validate đâu vào
    const isValid = ref(true)
    Object.entries(body).forEach(([key, value]) => {
      if (checkEmpty(value)) {
        notifyError(`Vui lòng nhập đầy đủ thông tin trường ${key}`)
        isValid.value = false
      }
    })
    if (!isValid.value) {
      return false
    }
    //gọi api
    return api
      .post(`${this.controller}`, body)
      .then(() => {
        notifySuccess('Lưu dữ liêụ thành công')
        return true
      })
      .catch((err) => {
        //bắt lỗi nghiệp vụ BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        console.log(err)
        return false
      })
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} body
   */
  update(body) {
    // validate đầu vào

    return api
      .put(`${this.controller}`, body)
      .then(() => {
        notifySuccess('Lưu dữ liêụ thành công')
        return true
      })
      .catch((err) => {
        //bắt lỗi nghiệp vụ BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return false
      })
  }
  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    // check null
    if (checkEmpty(id)) {
      //show thông báo
      notifyError(`Id đang trống `)
      return null
    }
    return api
      .delete(`${this.controller}/delete/${id}`)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        //bắt lỗi nghiệp vụ BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
}
