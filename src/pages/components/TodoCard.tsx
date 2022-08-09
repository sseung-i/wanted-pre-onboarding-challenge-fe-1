import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

interface Props {
  id: string;
  title: string;
  content: string;
  key: string;
  // [key: string]: string;
}

const TodoCard = (props: Props) => {
  const { title, content, id } = props;
  const { id: nowPage } = useParams();
  const navigate = useNavigate();

  const setNowView = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <Card onClick={setNowView} shadow={nowPage === id}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Card>
  );
};

const Card = styled.li`
  width: 100%;
  max-width: 30vw;
  padding: 15px 10px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: ${({ shadow }: { shadow: boolean }) =>
    shadow && "0 0 6px 0 rgba(0,0,0,0.7)"};
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
  color: ${({ theme }) => theme.color.dark_gray};
`;

export default TodoCard;
