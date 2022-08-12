import styled from "styled-components";
import List from "./List";

interface ChildProps {
  children?: React.ReactNode;
}

const Detail = ({ children }: ChildProps) => {
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
