import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Main = () => {
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  useEffect(() => {
    // token && navigate("/detail");
  }, []);

  return (
    <Container>
      <EmptyContent>로그인을 해주세요!</EmptyContent>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const EmptyContent = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.color.light_gray};
`;

export default Main;
