import { request, } from '../utils/http-client';
/**
 * Finogeeks Netdisk class
 */

/**
 * 请求派单排队
 * @param {Object} payload
 * @param {string} payload.pattern 模式类型，A模式：结束工单后员工离开房间；B 模式，不离开房间
 * @param {string} payload.retailId 用户 Id
 * @param {string} payload.roomId 房间 Id
 * @param {string} payload.staffId 员工 Id
 * @param {Object} payload.question 提问信息：{msgType: '', body: ''}
 * @param {Array} payload.specialIds 特定员工列表
 * @param {string} payload.location 地理信息：{longitude, latitude}
 * @returns {Object}
 */
export const joinWorkOrderQueue = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/queue';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
      needToken: true,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 取消派单
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.pattern
 */
export const cancelWorkOrderQueue = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/cancel';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    this._cancelQueueRank(payload.orderId);
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 关闭工单
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.staffId
 * @param {string} payload.roomId
 * @param {string} payload.orderId
 * @param {string} payload.pattern
 */
export const closeWorkOrder = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/close';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取派单房间
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.pattern
 */
export const getAdvisorRoomInfo = async ({ pattern, retailId }) => {
  const url = `/api/v1/swan/bot/dispatch/${pattern}/${retailId}/room`;
  try {
    const response = await request({
      method: 'GET',
      url,
      needToken: true,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 添加派单问题
 * @param {Object} payload
 * @param {string} payload.pattern
 * @param {string} payload.orderId
 * @param {string} payload.question
 */
export const addDispatchQuestion = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/question';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 留言
 * @param {Object} payload
 * @param {string} payload.question
 * @param {string} payload.email
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.phone
 * @param {Object} payload.location
 */
export const leaveMsg = async (payload) => {
  const url = '/api/v1/swan/workorder/guestbooks';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取留言详情
 */
export const getMessageDetail = async (orderId) => {
  const url = `/api/v1/swan/workorder/orders/${orderId}`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 客户发送评价
 *
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.staffId
 * @param {string} payload.pattern
 * @param {Object} payload.score
 * @param {Object} payload.note
 */
export const sendEvaluation = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/evaluation';
  try {
    const response = await request({
      method: 'PUT',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取问题分类
 */
export const getAdviceQuestionType = async () => {
  const url = '/api/v1/swan/gearing/config/questiontypes';
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 发送评价 convo ui msg
 */
export const sendEvalMsg = async (payload) => {
  const url = '/api/v1/swan/bot/dispatch/evalmsg';
  try {
    const response = await request({
      method: 'PUT',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取客服详情
 * @param {Object} payload
 * @param {string} payload.retailId 客户 id
 * @param {string} payload.staffId 客服 id
 */
export const getAdvisorInfo = async ({ retailId, staffId }) => {
  const url = `/api/v1/swan/manager/customer/${retailId}/find/${staffId}`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取客服房间聊天记录
 * @param {Object} payload
 * @param {string} payload.orderId  orderId
 * @param {string} payload.timestamp 时间戳
 */
export const getOrderChatHistory = async ({ orderId, timestamp }) => {
  let url = `/api/v1/swan/observe/orders/${orderId}/chat`;
  if (timestamp) {
    url = url += `?timestamp=${timestamp}`;
  }
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取派单状态
 * @param {Object} payload
 * @param {string} payload.orderId
 */
export const getDispatchState = async (payload) => {
  const url = `/api/v1/swan/bot/dispatch/${payload.orderId}/dispatchState`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取渠道信息
 * @param {Object} payload
 * @param {string} payload.channelId
 */
export const getChannelInfo = async (payload) => {
  const url = `/api/v1/swan/gearing/channels/${payload.channelId}`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    // console.log('---err');
    return false;
  }
}

/**
 * 重新发送 state
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.fcid
 * @param {string} payload.roomId
 * @param {string} payload.roomState
 * @param {string} payload.accountDataState
 */
export const reSendDispatchState = async (payload) => {
  const url = `/api/v1/swan/bot/dispatch/${payload.orderId}/dispatchState`;
  try {
    const response = await request({
      method: 'PUT',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 获取直接派单房间
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.staffId
 */
export const getDirectDispatchRoom = async (payload) => {
  const url = `/api/v1/swan/bot/dispatch/B/${payload.retailId}/room?staffId=${payload.staffId}`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 绑定客户
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.bindStaffId
 */
export const bindStaff = async (payload) => {
  const url = `/api/v1/swan/retail/bind`;
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

/**
 * 搜索营业部
 * @param {Object} payload
 * @param {string} payload.name
 */
export const searchBank = async (payload) => {
  // const url = `/api/v1/swan/manager/department/${payload.name}/_fuzzy`
  const url =
    '/api/v1/swan/manager/department/' +
    encodeURIComponent(payload.name) +
    '/_fuzzy';
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * 绑定 advisor
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.bindStaffId
 */
export const bindAdvisor = async (payload) => {
  const url = '/api/v1/swan/retail/bind';
  try {
    const response = await request({
      method: 'POST',
      url,
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * 搜索知识库
 */
export const searchKnowledgeByKey = async (payload) => {
  const { group = '全部', key = null, size = 10, page = 1 } = payload;
  if (!key) {
    return false;
  }
  const url = `/api/v1/swan/knowledge/search/${encodeURIComponent(
    group,
  )}/${encodeURIComponent(key)}?size=${size}&page=${page}`;
  try {
    const response = await request({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}