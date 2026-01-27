import api from '@/apis/config/APIconfig'
import BaseAPI from '@/apis/base/BaseAPI.js'
import { notifyError, notifySuccess } from '@/utils/toastFns'
import { checkEmpty } from '@/utils/formatFns'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'Asset'
  }
  /**
   * Hàm lấy danh sách tài sản
   * @param {*} payload
   * @returns danh sách tài sản
   * created by DTDat(18/1/2026)
   */
  getAllNew(payload) {
    return api
      .get(`${this.controller}/new`, {
        params: {
          SearchKeyword: payload.SearchKeyword,
          CategoryId: payload.CategoryId,
          DepartmentId: payload.DepartmentId,
          PageSize: payload.PageSize,
          PageIndex: payload.PageIndex,
        },
      })
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        //bắt lỗi BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
  /**
   * Hàm lấy AssetCOde mới
   * @returns AssetCode mới
   * created by DTDat(18/1/2026)
   */
  getNewCode() {
    return api
      .get(`${this.controller}/code`)
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        //bắt lỗi BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
  /**
   * Hàm xóa nhiều tài sản
   * @param {*} payload (danh sách id tài sản muốn xóa)
   * @returns AssetCode mới
   * created by DTDat(18/1/2026)
   */
  deleteMany(payload) {
    //check null
    if (payload?.assetIds == null) {
      notifyError('Bạn không chọn tài sản nào để xóa')
      return null
    }
    return api
      .post(`${this.controller}/delete-multiple`, payload)
      .then((result) => {
        notifySuccess(`Đã xóa thành công ${result.data} tài sản`)
        return result.data
      })
      .catch((err) => {
        //bắt lỗi BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }

  export() {
    return api
      .get(`${this.controller}/export`, {
        responseType: 'blob',
      })
      .then((result) => {
        return result
      })
      .catch((err) => {
        notifyError(err.response?.data?.Message)
      })
  }
}

export default new AssetAPI()
