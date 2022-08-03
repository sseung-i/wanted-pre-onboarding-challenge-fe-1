import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import myserver from "../axios";
import { useAuthStore } from "../store/auth";
import { useToDoDataStore } from "../store/todoData";
import TodoCard from "./components/TodoCard";

interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface Todos {
  todos: Todo[];
}

const Main = () => {
  const isLogined = useAuthStore((state) => state.isLogined);
  const setIsLogined = useAuthStore((state) => state.setIsLogined);
  const loginData = useToDoDataStore((state) => state.loginData);
  const todos = useToDoDataStore((state) => state.todos);

  console.log("현재 값", isLogined);
  console.log("가져와지냐???", todos);

  const setTodosData = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    try {
      const res = await myserver.get("/todos", {
        headers: { Authorization: `${token}` },
      });

      console.log(res.data.data);
      loginData({ todos: res.data.data } as Todos);
    } catch (err) {
      console.log("이것이 가져오는 에러다 ::", err);
    }
  };

  useEffect(() => {
    if (isLogined) {
      console.log("로그인된상태");
      setTodosData();
    } else {
      loginData({ todos: [] } as Todos);
    }
  }, [isLogined]);

  return (
    <Container>
      <Todos>
        <Header>
          <Title>To Do List!</Title>
          {isLogined ? (
            <LogoutBtn onClick={setIsLogined}>로그아웃</LogoutBtn>
          ) : (
            <LoginBtn to="/auth/login">로그인</LoginBtn>
          )}
        </Header>
        {isLogined ? (
          <Contents>
            <List>
              {todos.map((todo) => (
                <TodoCard {...todo} />
              ))}
            </List>
            <Details></Details>
          </Contents>
        ) : (
          <EmptyContent>로그인을 해주세요!</EmptyContent>
        )}
      </Todos>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Todos = styled.section``;

const Header = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100vw;
  height: 70px;
  padding: 0 30px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.light_gray};
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 900;
`;

const LoginBtn = styled(Link)`
  color: ${({ theme }) => theme.color.middle_gray};
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    color: ${({ theme }) => theme.color.main_point};
  }
`;

const LogoutBtn = styled.button``;

const EmptyContent = styled.article`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

const Contents = styled.article``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 30%;
  padding: 0.5rem 0.7rem;
  min-height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.color.light_gray};
`;

const Details = styled.article`
  width: 70%;
`;

export default Main;
