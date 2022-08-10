import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthInput from "./components/AuthInput";
import myserver from "../axios";
import { useAuthStore } from "../store/auth";
import { useToDoDataStore } from "../store/todoData";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const setIsLogined = useAuthStore((state) => state.setIsLogined);
  const navigate = useNavigate();

  ///

  const toDoList = useToDoDataStore((state) => state.toDoList);
  const getToDoList = useToDoDataStore((state) => state.getToDoList);

  /* 로그인 데이터 담기 */

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitDisabled = () => {
    const pwCheck = 8 <= data.password.length;
    const emailCheck = data.email.includes("@") && data.email.includes(".");

    const varidation = pwCheck && emailCheck;
    return !varidation;
  };

  /******************* */
  const getData = async (token: string) => {
    try {
      const res = await myserver.get("/todos/", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const reverseData = res.data.data.reverse();
      return reverseData[0].id;
    } catch (err) {
      console.log("Detail 데이터 가져오기 에러", err);
    }
  };

  // 1. 로그인하기 클릭!
  const handleLogin = async () => {
    try {
      // 2. 로그인 토큰 가져오기
      const res = await myserver.post("/users/login", data);

      // 3. 로컬스토리지에 토큰 담기
      const { message, token } = res.data;
      localStorage.setItem("token", token);

      // 4. 로그인 완료
      alert(message);
      getToDoList();
      console.log("로그인 할 때 ", toDoList);

      // 5. 루트로 이동
      navigate(`/${toDoList[0].id}`);
    } catch (err: any) {
      alert(err.response.data.details);
      console.log(err);
    }
  };

  // 로컬스토리지에 토큰이 존재한다면 자동로그인
  const haveTokenTest = async (token: string) => {
    alert("꺄~💕 다시오셨군요! 자동로그인 되었습니다 🥰 ");
    setIsLogined(true);
    if (token) {
      const id = await getData(token);
      navigate(`/${id}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && haveTokenTest(token);
  }, []);

  return (
    <LoginPage>
      <Wrap>
        <Title isSuccese={handleSubmitDisabled()}>나만의 Todo List</Title>
        <AuthInput
          iconClass="fa-solid fa-at fa-2x"
          type="email"
          handleChangeInput={handleChangeInput}
        />
        <AuthInput
          iconClass="fa-solid fa-lock fa-2x"
          type="password"
          handleChangeInput={handleChangeInput}
        />
        <SubmitBtn disabled={handleSubmitDisabled()} onClick={handleLogin}>
          로그인 하기
        </SubmitBtn>
      </Wrap>
      <JoinBtn to="/auth/join">회원가입하기</JoinBtn>
    </LoginPage>
  );
};

const LoginPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 10px;
  overflow: hidden;
`;

const Title = styled.h1`
  padding: 20px 0 10px;
  color: ${({ isSuccese, theme }: { isSuccese: boolean; theme: any }) =>
    isSuccese ? theme.color.dark_gray : theme.color.main_point};
`;

const SubmitBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 20px;
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.main_point};

  &:disabled {
    color: ${({ theme }) => theme.color.middle_gray};
    background-color: ${({ theme }) => theme.color.light_gray};
    cursor: auto;
  }
`;

const JoinBtn = styled(Link)`
  color: ${({ theme }) => theme.color.middle_gray};
  text-decoration: underline;
`;

export default Login;
