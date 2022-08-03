import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthInput from "./components/AuthInput";
import myserver from "../axios";
import { useAuthStore } from "../store/auth";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const setIsLogined = useAuthStore((state) => state.setIsLogined);

  const haveTokenTest = (token: string) => {
    alert("다시오셨군요! 자동로그인 되었습니다 :)");
    setIsLogined();
    token && navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("로그인페이지", token);
    token && haveTokenTest(token);
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target);
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitDisabled = () => {
    // const regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    // const emailCheck = data.email.match(regExp);
    const pwCheck = 6 <= data.password.length;

    const varidation = pwCheck && true;
    return !varidation;
  };

  const handleLogin = async () => {
    try {
      const res = await myserver.post("/users/login", data);
      // console.log(res);
      const { message, token } = res.data;
      localStorage.setItem("token", token);
      alert(message);
      navigate("/");
    } catch (err: any) {
      alert(err.response.data.details);
      console.log(err);
    }
  };

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
