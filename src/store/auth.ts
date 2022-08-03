import create from "zustand";
interface State {
  isLogined: boolean;
  setIsLogined: () => void;
}
export const useAuthStore = create<State>((set) => ({
  isLogined: false,
  setIsLogined: () => {
    set((state) => ({ isLogined: !state.isLogined }));
  },
}));
