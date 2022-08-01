import React from "react";
import styled from "styled-components";

interface PropsType {
  iconClass: string;
  type: string;
  handleChangeInput: JSX.IntrinsicElements["input"]["onChange"];
}

type FirstInputType = { isFirst: boolean };

const LoginInput = ({ iconClass, type, handleChangeInput }: PropsType) => {
  return (
    <InputWrap isFirst={type === "email"}>
      <Icon className={iconClass} />
      <Input type={type} onChange={handleChangeInput} />
    </InputWrap>
  );
};

const InputWrap = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-bottom: ${({ isFirst }: FirstInputType) => isFirst && "10px"};
`;

const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  color: #ddd;
`;

const Input = styled.input.attrs(({ type }) => ({
  type,
  id: type,
}))`
  width: 80%;
  height: 36px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
`;

export default LoginInput;
