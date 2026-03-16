import { create } from 'zustand';

// 定义消息的数据结构
interface Message {
  id: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

// 定义 Store 的状态结构
interface MessageState {
  messages: Message[];
  unreadCount: number;
  addMessage: (message: Message) => void;
  markAsRead: (id: string) => void;
}

// 创建消息 Store
export const useMessageStore = create<MessageState>((set) => ({
  // 初始状态
  messages: [],
  unreadCount: 0,

  // 添加消息
  addMessage: (message) => {
    set((state) => ({
      messages: [message, ...state.messages],
      unreadCount: state.unreadCount + 1,
    }));
  },

  // 标记为已读
  markAsRead: (id) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },
}));
