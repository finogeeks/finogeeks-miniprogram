const globalData = {
    showRoomList: true,
    firstRenderHome: true,
    hasEnterRoom: false,
}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}