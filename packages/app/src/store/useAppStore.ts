import { create } from 'zustand';

interface AppState {
  serviceUnavailable: boolean;
}

// 定义应用操作方法的类型接口
interface AppActions {
  setServiceUnavailable: (status: boolean) => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set) => ({
  serviceUnavailable: false,
  setServiceUnavailable: (status) => set({ serviceUnavailable: status }),
}));
