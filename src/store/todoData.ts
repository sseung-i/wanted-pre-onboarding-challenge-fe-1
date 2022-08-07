import create from "zustand";

interface State {
  isCreated: boolean;
  nowData: string;
  nowToDoView: (nowData: string) => void;
  setIsCreate: () => void;
}

export const useToDoDataStore = create<State>((set) => ({
  isCreated: false,
  nowData: "",
  nowToDoView: (nowData: string) => {
    set({ nowData });
  },
  setIsCreate: () => {
    set((state) => ({ isCreated: !state.isCreated }));
  },
}));
