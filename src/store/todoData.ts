import create from "zustand";
import myserver from "../axios";

const token = localStorage.getItem("token");

interface ToDoType {
  content: string;
  createdAt?: string;
  id?: string;
  title: string;
  updatedAt?: string;
}

type IdType = string | undefined;

interface State {
  isCreated: boolean;
  setIsCreate: (isCreated: boolean) => void;
  toDo: ToDoType;
  toDoList: ToDoType[];
  updateToDoData: { title: string; content: string };
  getToDo: (id: IdType) => void;
  getToDoList: () => Promise<string>;
  deleteTodo: (id: IdType) => void;
  createTodo: (
    title: string,
    content: string,
    setIsCreate: (isCreated: boolean) => void
  ) => {};
  updateTodo: (id: IdType, title: string, content: string) => void;
  defaultUpdateToDoData: () => void;
  changeNewData: (targetId: string, value: string) => void;
}

export const useToDoDataStore = create<State>((set) => ({
  isCreated: false,
  setIsCreate: (isCreated) => {
    set({ isCreated });
  },
  toDo: { content: "", createdAt: "", id: "", title: "", updatedAt: "" },
  toDoList: [{ content: "", createdAt: "", id: "", title: "", updatedAt: "" }],
  updateToDoData: {
    content: "",
    title: "",
  },
  getToDo: async (id) => {
    try {
      const res = await myserver.get(`/todos/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const toDo = res.data.data;
      set({ toDo });
    } catch (err) {
      console.log("todo 데이터 가져오기 에러", err);
    }
  },
  getToDoList: async () => {
    try {
      const res = await myserver.get("/todos", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const toDoList = await res.data.data.reverse();

      set({ toDoList });

      return toDoList[0].id;
    } catch (err) {
      console.log("todo List 데이터 가져오기 에러 ::", err);
    }
  },
  deleteTodo: async (id) => {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await myserver.delete(`/todos/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (
    title: string,
    content: string,
    setIsCreate: (isCreated: boolean) => void
  ) => {
    if (window.confirm("글 작성을 완료하시겠습니까?")) {
      try {
        const res = await myserver.post(
          "/todos",
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setIsCreate(false);

        return res.data.data.id;
      } catch (err) {
        console.log("글 작성 완료 에러 ::", err);
      }
    } else {
      return;
    }
  },
  updateTodo: async (id, title, content) => {
    if (window.confirm("글 작성을 완료하시겠습니까?")) {
      try {
        await myserver.put(
          `/todos/${id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      } catch (err) {
        console.log("새로운 투두 만들다가 실패!!");
      }
    } else {
      return;
    }
  },
  defaultUpdateToDoData: () => {
    set((state) => ({
      updateToDoData: { title: state.toDo.title, content: state.toDo.content },
    }));
  },
  changeNewData: (targetId, value) => {
    if (targetId === "title") {
      set((state) => ({
        updateToDoData: { ...state.updateToDoData, title: value },
      }));
    } else {
      set((state) => ({
        updateToDoData: { ...state.updateToDoData, content: value },
      }));
    }
  },
}));
