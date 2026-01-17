import BaseAPI from '@/apis/base/BaseAPI.js'

class CategoryAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'Category'
  }
}

export default new CategoryAPI()
