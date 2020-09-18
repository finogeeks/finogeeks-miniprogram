function promisifyWx(originFunc) {
  return (params) => new Promise((resolve, reject) => {
    originFunc({
      ...params,
      success: (e) => resolve(e),
      fail: (e) => reject(e),
    })
  })
}

export default promisifyWx