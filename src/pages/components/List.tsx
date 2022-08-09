import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import myserver from "../../axios";
import { useAuthStore } from "../../store/auth";
import { useToDoDataStore } from "../../store/todoData";
import TodoCard from "./TodoCard";

interface Todo {
  [key: string]: string;
}

const List = () => {
  const [listData, setListData] = useState([{}]);

  const setIsCreate = useToDoDataStore((state) => state.setIsCreate);
  const isCreated = useToDoDataStore((state) => state.isCreated);
  const isLogined = useAuthStore((state) => state.isLogined);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(listData);

  const getList = async () => {
    try {
      const res = await myserver.get("/todos", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const reversData: Todo[] = res.data.data.reverse();
      reversData && setListData(reversData);
    } catch (err) {
      console.log("이것이 에러다 ::", err);
    }
  };

  const cancelCreate = () => {
    setIsCreate(false);
    navigate(-1);
  };

  const goToCreatePage = () => {
    setIsCreate(true);
    navigate("/detail/create");
  };

  useEffect(() => {
    console.log("로그인 상태", isLogined);
    getList();
  }, [id]);

  if (!isLogined) navigate("/");

  return (
    <Wrap>
      {isLogined ? (
        <ToDoList>
          {isCreated ? (
            <CreateCancelBtn onClick={cancelCreate}>
              글쓰기 취소
            </CreateCancelBtn>
          ) : (
            <CreateBtn onClick={goToCreatePage}>새로운 메모</CreateBtn>
          )}
          {listData.map((todo: Todo) => (
            <TodoCard
              key={`${todo.id}`}
              id={todo.id}
              title={todo.title}
              content={todo.content}
            />
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
