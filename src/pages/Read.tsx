import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import myserver from "../axios";
import Detail from "./components/Detail";

interface Todo {
  title?: string;
  content?: string;
  // id: string;
  // createdAt: string;
  updatedAt?: string;
}

const Read = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const { title, content }: Todo = data;
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const res = await myserver.get(`/todos/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(res.data.data);
    } catch (err) {
      console.log("Detail 데이터 가져오기 에러", err);
    }
  };

  const afterDeleteData = async () => {
    try {
      const res = await myserver.get(`/todos`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("삭제 이후 데이터", res.data.data);
      return res.data.data;
    } catch (err) {
      console.log("Detail 데이터 가져오기 에러", err);
    }
  };

  const goToModifyPage = () => {
    navigate(`/detail/modify/${id}`);
  };

  const deleteTodo = async () => {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await myserver.delete(`/todos/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const deleteDataArr = await afterDeleteData();
        const reverseArr = deleteDataArr.reverse();
        const newId = reverseArr[0].id;
        console.log("newId", newId);
        navigate(`/detail/${newId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Detail>
      <Top>
        <Title>{title}</Title>
        <BtnWrap>
          <ModifyBtn onClick={goToModifyPage}>수정하기</ModifyBtn>
          <DeleteBtn onClick={deleteTodo}>삭제하기</DeleteBtn>
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
