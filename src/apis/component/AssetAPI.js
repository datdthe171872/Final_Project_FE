import api from '@/apis/config/APIconfig'
import BaseAPI from '@/apis/base/BaseAPI.js'
import { notifyError, notifySuccess } from '@/utils/toastFns'
import { checkEmpty } from '@/utils/formatFns'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'Asset'
  }

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
  deleteMany(payload) {
    //check null
    if (payload?.ids == null) {
      notifyError('Bạn không chọn tài sản nào để xóa')
      return null
    }
    return api
      .post(`${this.controller}/delete-multiple`, payload)
      .then((result) => {
        notifySuccess(`Đã xóa thành công ${result.data} tài sa`)
        return result.data
      })
      .catch((err) => {
        //bắt lỗi BE
        //show thông báo
        notifyError(err.response?.data?.Message)
        return null
      })
  }
}

export default new AssetAPI()
