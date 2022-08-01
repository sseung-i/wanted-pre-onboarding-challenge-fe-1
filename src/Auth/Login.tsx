import React, { useState } from "react";
import styled from "styled-components";
import LoginInput from "./components/LoginInput";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

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

  return (
    <LoginPage>
      <Wrap>
        <Title isSuccese={handleSubmitDisabled()}>나만의 Todo List</Title>
        <LoginInput
          iconClass="fa-solid fa-at fa-2x"
          type="email"
          handleChangeInput={handleChangeInput}
        />
        <LoginInput
          iconClass="fa-solid fa-lock fa-2x"
          type="password"
          handleChangeInput={handleChangeInput}
        />
        <SubmitBtn disabled={handleSubmitDisabled()}>로그인 하기</SubmitBtn>
      </Wrap>
      <JoinBtn>회원가입하기</JoinBtn>
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
    isSuccese ? theme.color.dark_gray : theme.color.succese};
`;

const SubmitBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 20px;
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.succese};

  &:disabled {
    color: ${({ theme }) => theme.color.middle_gray};
    background-color: ${({ theme }) => theme.color.light_gray};
    cursor: auto;
  }
`;

const JoinBtn = styled.button`
  color: ${({ theme }) => theme.color.middle_gray};
  text-decoration: underline;
`;

export default Login;
