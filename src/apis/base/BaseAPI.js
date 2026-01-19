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
   * @returns danh sách đối tượng chung
   * createdby: dtdat - 16/1/2026
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

  /**
   * Phương thức lấy tất cả dữ liệu
   * @param {*} id
   * @returns đối tuownjg có id đó
   * createdby: dtdat - 16/1/2026
   */
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

  /**
   * Phương thức tạo mới dữ liệu
   * @param {*} body
   * @returns kết quả thêm mới  (True or False)
   * createdby: dtdat - 16/1/2026
   */
  create(body, hasErr) {
    if (hasErr) {
      notifyError('Thông tin không hợp lệ')
      return
    }
    // validate đâu vào
    const isValid = ref(true)
    Object.entries(body).forEach(([key, value]) => {
      if (checkEmpty(value)) {
        notifyError(`thông tin trường ${key} đang trống hoặc không phù hợp`)
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
   * @returns đối tượng cần cập nhật
   */
  update(body, hasErr) {
    if (hasErr) {
      notifyError('Thông tin không hợp lệ')
      return
    }
    // validate đầu vào
    const isValid = ref(true)
    Object.entries(body).forEach(([key, value]) => {
      if (checkEmpty(value)) {
        notifyError(`thông tin trường ${key} đang trống hoặc không phù hợp`)
        isValid.value = false
      }
    })
    if (!isValid.value) {
      return false
    }
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
        console.log(err)
        return false
      })
  }
  /**
   * Hàm xóa bản ghi
   * @param {*} id
   * @returns số bản ghi đã xóa
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
