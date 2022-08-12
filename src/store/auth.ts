import create from "zustand";
import myserver from "../axios";

interface State {
  getToken: (data: { email: string; password: string }) => {};
}

export const useAuthStore = create<State>((set) => ({
  getToken: async (data) => {
    try {
      // 2. 로그인 토큰 가져오기
      const res = await myserver.post("/users/login", data);

      // 3. 로컬스토리지에 토큰 담기
      const { message, token } = res.data;
      localStorage.setItem("token", token);
      alert(message);
    } catch (err: any) {
      alert(err.response.data.details);
      console.log(err);
    }
  },
}));
