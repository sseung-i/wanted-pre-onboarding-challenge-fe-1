import create from "zustand";

interface State {
  isCreated: boolean;
  setIsCreate: (isCreated: boolean) => void;
}

export const useToDoDataStore = create<State>((set) => ({
  isCreated: false,
  setIsCreate: (isCreated) => {
    set({ isCreated });
  },
}));
