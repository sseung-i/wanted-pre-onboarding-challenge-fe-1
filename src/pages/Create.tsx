import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useToDoDataStore } from "../store/todoData";
import Detail from "./components/Detail";

const Create = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const { title, content } = data;
  const navigate = useNavigate();

  const setIsCreate = useToDoDataStore((state) => state.setIsCreate);
  const createTodo = useToDoDataStore((state) => state.createTodo);
  const changeData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const postNewToDoData = async () => {
    const newTodoId = await createTodo(title, content, setIsCreate);
    navigate(`/${newTodoId}`);
  };

  useEffect(() => {
    setIsCreate(true);
  }, []);

  const submitDisabled = title === "" || content === "";

  return (
    <Detail>
      <Top>
        <Title id="title" type="text" placeholder="제목" onKeyUp={changeData} />
        <ModifyBtn onClick={postNewToDoData} disabled={submitDisabled}>
          작성완료
        </ModifyBtn>
      </Top>
      <Area
        id="content"
        placeholder="내용을 입력하세요 :)"
        onKeyUp={changeData}
      />
    </Detail>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.middle_gray};
`;

const placeholder = css`
  &::placeholder {
    color: ${({ theme }) => theme.color.light_gray};
  }
`;

const Title = styled.input`
  border: none;
  width: 100%;
  font-size: 1.3rem;
  ${placeholder}
`;

const Area = styled.textarea`
  width: 100%;
  height: 60vh;
  margin-top: 30px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  ${placeholder}
`;

const Btn = styled.button`
  height: fit-content;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.middle_gray};
  word-break: keep-all;
  cursor: pointer;
`;

const ModifyBtn = styled(Btn)`
  background-color: #fff;
  &:disabled {
    background-color: ${({ theme }) => theme.color.light_gray};
    cursor: default;
  }
`;

export default Create;
