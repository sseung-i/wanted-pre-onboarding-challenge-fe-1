import styled, { css } from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("π₯² μ λ§ λ‘κ·Έμμ νμκ² μ΅λκΉ? π₯²")) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      return;
    }
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <Header>
        <Title>To Do List!</Title>
        {token ? (
          <LogoutBtn onClick={handleLogout}>λ‘κ·Έμμ</LogoutBtn>
        ) : (
          <Wrap>
            <LoginBtn to="/auth/login">λ‘κ·ΈμΈ</LoginBtn>
            <JoinBtn to="/auth/join">νμκ°μ</JoinBtn>
          </Wrap>
        )}
      </Header>
      <Outlet />
    </>
  );
};

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

const Wrap = styled.div``;

const NavButton = css`
  color: ${({ theme }) => theme.color.middle_gray};
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    color: ${({ theme }) => theme.color.main_point};
  }
`;

const LoginBtn = styled(Link)`
  ${NavButton}
`;

const JoinBtn = styled(Link)`
  ${NavButton}
  position: relative;
  margin-left: 30px;

  &::after {
    position: absolute;
    top: 2px;
    left: -15px;
    content: "";
    height: 13px;
    width: 1px;
    background-color: ${({ theme }) => theme.color.middle_gray};
  }
`;

const LogoutBtn = styled.button`
  ${NavButton}
`;

export default Nav;
