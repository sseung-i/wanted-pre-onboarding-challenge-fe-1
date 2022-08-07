import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import myserver from "../axios";
import AuthInput from "./components/AuthInput";

interface SystemError {
  code: string;
  config: {};
  message: string;
  name: string;
  request: XMLHttpRequest;
  response: {};
}

const Join = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleJoin = async () => {
    try {
      const res = await myserver.post("/users/create", data);
      console.log(res.status);
      alert("환영합니다! 로그인 해 주세요 :)");
      res.status === 200 && navigate("/");
    } catch (err: any) {
      if (err.response.status === 409) {
        alert(err.response.data.details);
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    }
  };

  return (
    <LoginPage>
      <Wrap>
        <Title isSuccese={handleSubmitDisabled()}>회원가입</Title>
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
        <SubmitBtn disabled={handleSubmitDisabled()} onClick={handleJoin}>
          회원가입 하기
        </SubmitBtn>
      </Wrap>
      <JoinBtn to="/auth/login">로그인하기</JoinBtn>
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

const Wrap = styled.form`
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

export default Join;
