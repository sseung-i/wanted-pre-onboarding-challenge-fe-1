import create from "zustand";

interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  // [key: string]: string;
}

interface Todos {
  todos: Todo[];
}

interface State {
  todos: Todo[];
  loginData: ({ todos }: Todos) => void;
}
export const useToDoDataStore = create<State>((set) => ({
  todos: [],
  loginData: ({ todos }: Todos) => {
    set((state) => ({ todos: [...todos] } as Todos));
  },
}));
