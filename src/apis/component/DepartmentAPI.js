import BaseAPI from '@/apis/base/BaseAPI.js'

class DepartmentAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'Department'
  }
}

export default new DepartmentAPI()
