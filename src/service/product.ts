import { request, } from '../utils/http-client';

/**
 * 获取产品列表信息
 * @param page
 * @param size
 * @param type
 * @returns {AxiosPromise}
 */

export const getProductList = async (type, page, size, staffId, shareId, shareViewName) => {
  const response = await request({
    url: `/api/v1/adviserZone/product/list/manage`,
    method: 'GET',
    data: {
      status: 1,
      type,
      page,
      size,
      staffId,
      shareId,
      shareViewName,
    }
  });
  return response.data;
};

/**
 * 获取产品详情
 * @param productId
 * @returns {AxiosPromise}
 */
export const getProductDetail = async (productId, staffId) => {
  const response = await request({
    url: `/api/v1/adviserZone/product/${productId}?staffId=${staffId}`,
    method: 'GET',
  });
  return response.data;
};

/**
 * 获取所有产品类型
 * @param productId
 * @returns {AxiosPromise}
 */
export const getAllProductType = async () => {
  const response = await request({
    url: `/api/v1/adviserZone/product/types`,
    method: 'GET',
    data: {adviserId: ''},
  });
  return response.data;
};

/**
 * 预约产品
 * @param productId
 * @returns {AxiosPromise}
 */

export const reserveProduct = async ({
  productId,
  staffId,
  name,
  mobile,
  city,
  company,
  annualIncome,
}) => {
  const response = await request({
    url: `/api/v1/adviserZone/sales/booking`,
    method: 'POST',
    data: {
      productId,
      staffId,
      name,
      mobile,
      city,
      company,
      annualIncome,
    },
  });
  return response.data;
};
