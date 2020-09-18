export enum DispatchState {
  close = 'CLOSE',
  selected = 'SELECTED',
  dispatching = 'DISPATCHING',
  timeout = 'TIMEOUT',
  accepted = 'ACCEPTED',
}

export interface DispatchData  {
  dispatchState?: DispatchState,
  questionType?: string,
  from?: string,
  orderId?: string,
  pattern?: string,
  dispatchRoomId?: string,
  acceptRoomId?: string,
  staffId?: string,
}