import styled from 'styled-components';
import { Button } from '../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BASE_URL,
  ID_KEY,
  NEW_PW_KEY,
  NEW_PW_VERIFICATION,
  NICKNAME_KEY,
  PHONE_KEY,
  PREVIOUS_PW_KEY,
} from '../constants';
import InputSet from '../components/common/InputSet';
import { useState } from 'react';
import { useEffect } from 'react';

const MyPage = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  // 첫 랜더링시에만 회원정보 받아오기
  useEffect(() => {
    axiosGetHandler();
  }, []);

  // get 요청으로 회원정보 받아오기
  const axiosGetHandler = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/member/info`, {
        headers: { memberId: memberId },
      });
      const memberData = response.data.data;
      setData(memberData);
    } catch (error) {
      console.log(error);
    }
  };

  // patch 요청으로 비밀번호 변경하기
  const axiosChangePwHanlder = async (pwData) => {
    try {
      await axios.patch(`${BASE_URL}/member/password`, pwData, {
        headers: { memberId: memberId },
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  // 비밀번호 변경 버튼 눌렀을 때
  const handleSubmit = (event) => {
    event.preventDefault();

    // FormData로 input 값들 받아와 객체화
    const fd = new FormData(event.target);
    const pwData = Object.fromEntries(fd.entries());

    // 빈칸 있는지 아닌지 확인
    const condition =
      pwData[NEW_PW_KEY] &&
      pwData[PREVIOUS_PW_KEY] &&
      pwData[NEW_PW_VERIFICATION];

    // 빈칸 없으면 patch 요청 보내기
    if (condition) {
      axiosChangePwHanlder(pwData);
    } else {
      alert('빈칸을 채워주세요');
    }
  };

  return (
    <MyPageContainer>
      <MyPageTitle>마이 페이지</MyPageTitle>
      <DataList>
        <Line>
          <DataTitle>ID</DataTitle>
          <Data>{data && data[ID_KEY]}</Data>
        </Line>
        <Line>
          <DataTitle>닉네임</DataTitle>
          <Data>{data && data[NICKNAME_KEY]}</Data>
        </Line>
        <Line>
          <DataTitle>전화번호</DataTitle>
          <Data>{data && data[PHONE_KEY]}</Data>
        </Line>
      </DataList>
      <ToggleButton onClick={() => setIsOpen(!isOpen)} type="button">
        비밀번호 변경창
      </ToggleButton>
      <ChangePwForm onSubmit={handleSubmit}>
        {isOpen && (
          <InputList>
            <InputSet
              labelText={'기존 비밀번호'}
              id={PREVIOUS_PW_KEY}
              name={PREVIOUS_PW_KEY}
            />
            <InputSet
              labelText={'새로운 비밀번호'}
              id={NEW_PW_KEY}
              name={NEW_PW_KEY}
            />
            <InputSet
              labelText={'비밀번호 확인'}
              id={NEW_PW_VERIFICATION}
              name={NEW_PW_VERIFICATION}
            />
            <Button>비밀번호 변경</Button>
          </InputList>
        )}
      </ChangePwForm>
      <ButtonWrapper>
        <Button
          onClick={() => {
            navigate(`/main/${memberId}`);
          }}
          type="button">
          홈으로
        </Button>
      </ButtonWrapper>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.main`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  background-color: aliceblue;
  width: 60%;
  height: 40rem;
`;
const MyPageTitle = styled.h3`
  height: 5rem;
  line-height: 5rem;
  font-size: ${({ theme }) => theme.fonts.xl};
`;

const ChangePwForm = styled.form``;

const ToggleButton = styled.button`
  width: 8rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.lightYellow};
  border: 0;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 15%;
`;
const InputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;
const DataList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Line = styled.div`
  display: flex;
  gap: 1rem;
`;

const DataTitle = styled.div``;
const Data = styled.div``;
