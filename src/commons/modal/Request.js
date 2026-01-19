import { pageSizeOptions } from '../constant/constant'

export const AssetInput = {
  assetId: '00000000-0000-0000-0000-000000000000',
  assetCode: null,
  assetName: null,
  departmentId: null,
  departmentName: '',
  categoryId: null,
  categoryName: '',
  assetQuantity: 1,
  assetOriginalPrice: 0,
  assetDepreciationRate: 0.0,
  assetStartUsageDate: new Date().toISOString().slice(0, 10),
  assetStartDate: new Date().toISOString().slice(0, 10),
  assetTrackingYear: 2021,
  assetUsageYear: 0,
  assetDepreciationYear: 0,
}

export const formPaging = {
  SearchKeyword: '',
  CategoryId: null,
  DepartmentId: null,
  PageSize: pageSizeOptions[0],
  PageIndex: 1,
}
