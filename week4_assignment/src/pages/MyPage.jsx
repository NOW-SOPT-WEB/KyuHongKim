import styled from 'styled-components';
import { Button } from '../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import InputSet from '../components/common/InputSet';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const MyPage = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosGetHandler();
  }, []);
  console.log(data);
  const axiosGetHandler = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/member/info`, {
        headers: { memberId: memberId },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const axiosChangePwHanlder = async (pwData) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/member/password`,
        pwData,
        { headers: { memberId: memberId } }
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const pwData = Object.fromEntries(fd.entries());
    const condition =
      pwData['newPassword'] &&
      pwData['newPasswordVerification'] &&
      pwData['previousPassword'];
    if (condition) {
      axiosChangePwHanlder(pwData);
    }
  };

  return (
    <MyPageContainer>
      <MyPageTitle>마이 페이지</MyPageTitle>
      <DataList>
        <Line>
          <DataTitle>ID</DataTitle>
          <Data>{data && data['authenticationId']}</Data>
        </Line>
        <Line>
          <DataTitle>닉네임</DataTitle>
          <Data>{data && data['nickname']}</Data>
        </Line>
        <Line>
          <DataTitle>전화번호</DataTitle>
          <Data>{data && data['phone']}</Data>
        </Line>
      </DataList>
      <ChangePwForm onSubmit={handleSubmit}>
        <Button onClick={() => setOpen(!open)} type="button">
          비밀번호 변경창
        </Button>

        {open && (
          <InputList>
            <InputSet
              type={'text'}
              labelText={'기존 비밀번호'}
              id={'previousPassword'}
              name={'previousPassword'}
            />
            <InputSet
              type={'text'}
              labelText={'새로운 비밀번호'}
              id={'newPassword'}
              name={'newPassword'}
            />
            <InputSet
              type={'text'}
              labelText={'비밀번호 확인'}
              id={'newPasswordVerification'}
              name={'newPasswordVerification'}
            />
            <Button>비밀번호 변경</Button>
          </InputList>
        )}

        <ButtonWrapper>
          <Button
            onClick={() => {
              navigate(`/main/${memberId}`);
            }}
            type="button">
            홈으로
          </Button>
        </ButtonWrapper>
      </ChangePwForm>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.main`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
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
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
const InputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
export default MyPage;
