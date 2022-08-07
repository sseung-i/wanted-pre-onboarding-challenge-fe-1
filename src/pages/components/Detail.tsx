import { useEffect } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../store/auth";
import List from "./List";

interface ChildProps {
  children?: React.ReactNode;
}

const Detail = ({ children }: ChildProps) => {
  const token = localStorage.getItem("token");

  const setIsLogined = useAuthStore((state) => state.setIsLogined);

  useEffect(() => {
    if (token) {
      setIsLogined(true);
    }
  }, []);
  return (
    <Container>
      <List />
      <DetailView>{children}</DetailView>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
`;

const DetailView = styled.div`
  width: 70%;
  padding: 3% 5%;
`;

export default Detail;
