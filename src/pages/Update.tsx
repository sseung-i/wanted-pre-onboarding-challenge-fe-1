import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import myserver from "../axios";
import { useToDoDataStore } from "../store/todoData";
import Detail from "./components/Detail";

interface PlaceHolder {
  submitDisabled: boolean;
  theme: any;
}

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const getToDo = useToDoDataStore((state) => state.getToDo);

  // 초기값 세팅
  const toDo = useToDoDataStore((state) => state.toDo);
  const defaultUpdateToDoData = useToDoDataStore(
    (state) => state.defaultUpdateToDoData
  );

  // 수정 완료
  const updateTodo = useToDoDataStore((state) => state.updateTodo);

  // 인풋 입력 수정값
  const changeNewData = useToDoDataStore((state) => state.changeNewData);
  const updateToDoData = useToDoDataStore((state) => state.updateToDoData);

  console.log("수정 할 데이터 가져왔니 ?", updateToDoData);

  const changeData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id: targetId, value } = e.target;
    // console.log(typeof targetId, value);
    changeNewData(targetId, value);
    // setData((prev) => ({ ...prev, [id]: value }));
  };

  const postNewToDoData = async () => {
    const { title, content } = updateToDoData;
    updateTodo(id, title, content);
    navigate(`/${id}`);
  };

  const { title, content } = toDo;
  const submitDisabled =
    updateToDoData.title !== "" && updateToDoData.content !== "";

  useEffect(() => {
    defaultUpdateToDoData();
  }, []);

  return (
    <Detail>
      <Top>
        <Title
          id="title"
          type="text"
          placeholder="제목"
          defaultValue={title}
          onKeyUp={changeData}
        />
        <ModifyBtn onClick={postNewToDoData} submitDisabled={submitDisabled}>
          작성완료
        </ModifyBtn>
      </Top>
      <Area
        id="content"
        placeholder="내용을 입력하세요 :)"
        defaultValue={content}
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

const Btn = styled.div`
  height: fit-content;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.middle_gray};
  word-break: keep-all;
  cursor: pointer;
`;

const ModifyBtn = styled(Btn)`
  ${({ submitDisabled, theme }: PlaceHolder) => {
    if (submitDisabled) {
      return css`
        background-color: #fff;
      `;
    } else {
      return css`
        background-color: ${theme.color.light_gray};
        cursor: default;
      `;
    }
  }};
`;

export default Update;
