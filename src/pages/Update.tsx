import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import myserver from "../axios";
import Detail from "./components/Detail";

interface PlaceHolder {
  submitDisabled: boolean;
  theme: any;
}

const Update = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const { title, content } = data;
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const changeData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const postNewToDoData = async () => {
    if (window.confirm("글 작성을 완료하시겠습니까?")) {
      try {
        await myserver.put(
          `/todos/${id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        navigate(`/detail/${id}`);
      } catch (err) {
        console.log("새로운 투두 만들다가 실패!!");
      }
    } else {
      return;
    }
  };

  const getBeforeData = async () => {
    try {
      const res = await myserver.get(`/todos/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setData(res.data.data);
    } catch (err) {
      console.log("수정 페이지 기존데이터 에러다 ::", err);
    }
  };

  useEffect(() => {
    getBeforeData();
  }, []);

  const submitDisabled = title !== "" && content !== "";

  return (
    <Detail>
      <Top>
        <Title
          id="title"
          type="text"
          placeholder="제목"
          defaultValue={title}
          onKeyUp={changeData}
        />
        <ModifyBtn onClick={postNewToDoData} submitDisabled={submitDisabled}>
          작성완료
        </ModifyBtn>
      </Top>
      <Area
        id="content"
        placeholder="내용을 입력하세요 :)"
        defaultValue={content}
        onKeyUp={changeData}
      />
    </Detail>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.middle_gray};
`;

const placeholder = css`
  &::placeholder {
    color: ${({ theme }) => theme.color.light_gray};
  }
`;

const Title = styled.input`
  border: none;
  width: 100%;
  font-size: 1.3rem;
  ${placeholder}
`;

const Area = styled.textarea`
  width: 100%;
  height: 60vh;
  margin-top: 30px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  ${placeholder}
`;

const Btn = styled.div`
  height: fit-content;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.color.light_gray};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.middle_gray};
  word-break: keep-all;
  cursor: pointer;
`;

const ModifyBtn = styled(Btn)`
  ${({ submitDisabled, theme }: PlaceHolder) => {
    if (submitDisabled) {
      return css`
        background-color: #fff;
      `;
    } else {
      return css`
        background-color: ${theme.color.light_gray};
        cursor: default;
      `;
    }
  }};
`;

export default Update;
