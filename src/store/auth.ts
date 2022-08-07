import create from "zustand";

interface State {
  isLogined: boolean;
  setIsLogined: (now: boolean) => void;
}

export const useAuthStore = create<State>((set) => ({
  isLogined: false,
  setIsLogined: (now: boolean) => {
    set({ isLogined: now });
  },
}));
