const wx = window.wx;

export const setCacheSync = (key, data) => {
  try {
    wx.setStorageSync(key, data);
    return null
  } catch (error) {
    throw new Error(error)
  }
}

export const getCacheSync = (key) => {
  try {
    return wx.getStorageSync(key);
  } catch (error) {
    throw new Error(error)
  }
}

export const removeCacheSync = (key) => {
  try {
    return wx.removeStorageSync(key);
  } catch (error) {
    throw new Error(error)
  }
}

export const setCache = async (key, data) => {
  try {
    return wx.setStorage({ key, data });
  } catch (error) {
    throw new Error(error)
  }
}

export const getCache = async (key) => {
  try {
    return wx.getStorage({ key });
  } catch (error) {
    throw new Error(error)
  }
}

export const removeCache = (key) => {
  try {
    return wx.removeStorage({ key });
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  setCacheSync,
  getCacheSync,
  removeCacheSync,
  setCache,
  getCache,
  removeCache,
}
