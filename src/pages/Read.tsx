import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useToDoDataStore } from "../store/todoData";
import Detail from "./components/Detail";

const Read = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getToDo = useToDoDataStore((state) => state.getToDo);
  const toDo = useToDoDataStore((state) => state.toDo);
  const toDoList = useToDoDataStore((state) => state.toDoList);
  const deleteTodo = useToDoDataStore((state) => state.deleteTodo);
  const getToDoList = useToDoDataStore((state) => state.getToDoList);

  const { title, content } = toDo;

  const afterDelete = async () => {
    getToDoList();
    navigate(`/${toDoList[0].id}`);
  };

  const goToModifyPage = () => {
    navigate(`/detail/update/${id}`);
  };

  const handleDeleteTodo = async () => {
    deleteTodo(id);
    afterDelete();
  };

  useEffect(() => {
    if (token) {
      getToDo(id);
      navigate(`/${id}`);
    } else {
      navigate("/auth/login");
    }
  }, [id]);

  return (
    <Detail>
      <Top>
        <Title>{title}</Title>
        <BtnWrap>
          <ModifyBtn onClick={goToModifyPage}>수정하기</ModifyBtn>
          <DeleteBtn onClick={handleDeleteTodo}>삭제하기</DeleteBtn>
        </BtnWrap>
      </Top>
      <Area>{content}</Area>
    </Detail>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.middle_gray};
`;

const Title = styled.div`
  font-size: 1.3rem;
`;

const Area = styled.div`
  width: 100%;
  height: 60vh;
  margin-top: 30px;
  padding: 10px 15px;
  word-wrap: break-word;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.div`
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.middle_gray};
  cursor: pointer;
`;

const ModifyBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

export default Read;
