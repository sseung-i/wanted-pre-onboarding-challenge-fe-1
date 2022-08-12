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
  getToDo: (id: IdType) => void;
  getToDoList: () => void;
  deleteTodo: (id: IdType) => void;
  createTodo: (
    title: string,
    content: string,
    setIsCreate: (isCreated: boolean) => void
  ) => {};
}

export const useToDoDataStore = create<State>((set) => ({
  isCreated: false,
  setIsCreate: (isCreated) => {
    set({ isCreated });
  },
  toDo: { content: "", createdAt: "", id: "", title: "", updatedAt: "" },
  toDoList: [{ content: "", createdAt: "", id: "", title: "", updatedAt: "" }],
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
      const toDoList = res.data.data.reverse();

      set({ toDoList });
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

        // getToDoList()
        // const deleteDataArr = await afterDeleteData();
        // const reverseArr = deleteDataArr.reverse();
        // const newId = reverseArr[0].id;
        // console.log("newId", newId);
        // navigate(`/detail/${newId}`);
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
    }
  },
}));
