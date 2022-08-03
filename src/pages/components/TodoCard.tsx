import React from "react";
import styled from "styled-components";

interface Todo {
  [key: string]: string;
}

const TodoCard = ({ title, content }: Todo) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Date></Date>
    </Card>
  );
};

const Card = styled.li`
  width: 100%;
  padding: 15px 10px;
  border-radius: 5px;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  padding-bottom: 3px;
  border-bottom: 1px solid ${({ theme }) => theme.color.light_gray};
`;

const Content = styled.p`
  margin-top: 10px;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.p``;

export default TodoCard;
