import create from "zustand";

interface State {
  isCreated: boolean;
  setIsCreate: () => void;
}

export const useToDoDataStore = create<State>((set) => ({
  isCreated: false,
  setIsCreate: () => {
    set((state) => ({ isCreated: !state.isCreated }));
  },
}));
