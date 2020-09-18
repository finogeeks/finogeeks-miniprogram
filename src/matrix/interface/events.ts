import { Message } from "./message";

export interface TimelineUpdateEvent {
  type: 'NEW_MESSAGE' | 'PAGINATE_BACK' | 'PAGINATE_FORWARD' | 'MESSAGE_UPDATE'
  timeline: Message[]
  newMessage?: Message
  loadedTimeline?: Message[]
}
