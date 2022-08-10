import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import myserver from "../../axios";
import { useAuthStore } from "../../store/auth";
import { useToDoDataStore } from "../../store/todoData";
import TodoCard from "./TodoCard";

interface TodoType {
  content: string;
  createdAt?: string;
  id?: string | undefined;
  title: string;
  updatedAt?: string;
}

const List = () => {
  const setIsCreate = useToDoDataStore((state) => state.setIsCreate);
  const isCreated = useToDoDataStore((state) => state.isCreated);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  ////

  const toDoList = useToDoDataStore((state) => state.toDoList);
  const getToDoList = useToDoDataStore((state) => state.getToDoList);

  const cancelCreate = () => {
    setIsCreate(false);
    navigate(-1);
  };

  const goToCreatePage = () => {
    setIsCreate(true);
    navigate("/detail/create");
  };

  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <Wrap>
      {token ? (
        <ToDoList>
          {isCreated ? (
            <CreateCancelBtn onClick={cancelCreate}>
              글쓰기 취소
            </CreateCancelBtn>
          ) : (
            <CreateBtn onClick={goToCreatePage}>새로운 메모</CreateBtn>
          )}
          {toDoList.map(({ id, title, content }: TodoType) => (
            <TodoCard key={`${id}`} id={id} title={title} content={content} />
          ))}
        </ToDoList>
      ) : (
        <></>
      )}
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
`;

const ToDoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  height: calc(100vh - 70px);
  overflow: scroll;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

const btnStyle = css`
  width: 100%;
  padding: 15px 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;

  cursor: pointer;
`;

const CreateBtn = styled.button`
  ${btnStyle}
  background-color: ${({ theme }) => theme.color.main_point};
`;

const CreateCancelBtn = styled.button`
  ${btnStyle}
  background-color: ${({ theme }) => theme.color.middle_gray};
`;

export default List;
