import Taro from '@tarojs/taro';

export const setCacheSync = (key, data) => {
  try {
    Taro.setStorageSync(key, data);
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCacheSync = key => {
  try {
    return Taro.getStorageSync(key);
  } catch (error) {
    throw new Error(error);
  }
};

export const removeCacheSync = key => {
  try {
    return Taro.removeStorageSync(key);
  } catch (error) {
    throw new Error(error);
  }
};

export const setCache = async (key, data) => {
  return Taro.setStorage({ key, data });
};

export const getCache = async key => {
  return Taro.getStorage({ key });
};

export const removeCache = key => {
  return Taro.removeStorage({ key });
};

export default {
  setCacheSync,
  getCacheSync,
  removeCacheSync,
  setCache,
  getCache,
  removeCache,
};
