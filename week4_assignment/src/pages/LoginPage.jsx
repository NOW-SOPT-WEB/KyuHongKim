import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ID_KEY, PW_KEY } from '../constants';
import { useState } from 'react';
import { useRef } from 'react';
import flowerImg from '/src/assets/flower.jpg';

const LoginPage = () => {
  const navigate = useNavigate();

  // 첫 랜더링 화면에서는 error 메세지 안보여주기 위한 상태값
  const firstRender = useRef(true);

  // ID, PW 미입력시 Error 발생시켜줄 상태값 관리
  const [showError, setShowError] = useState({
    authenticationId: true,
    password: true,
  });

  // Login Post 요청
  const axiosLoginHandler = async (loginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/member/login`, loginData);
      const memberId = response.headers.location;
      navigate(`/main/${memberId}`);
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  // 로그인 form 전송 요청
  const handleSubmit = (event) => {
    event.preventDefault();

    firstRender.current ? (firstRender.current = false) : '';

    // FormData 사용해서 입력된 값 객체화
    const fd = new FormData(event.target);
    const loginData = Object.fromEntries(fd.entries());

    if (!showError[ID_KEY] && !showError[PW_KEY]) {
      axiosLoginHandler(loginData);
    } else {
      for (let key in loginData) {
        const inputValue = loginData[key];
        handleInputChange(inputValue, key);
      }
    }
  };

  // input 값 비어있는지 아닌지 검사 후 error state 관리
  const handleInputChange = (value, identifier) => {
    value
      ? setShowError((prevState) => ({
          ...prevState,
          [identifier]: false,
        }))
      : setShowError((prevState) => ({
          ...prevState,
          [identifier]: true,
        }));
  };

  return (
    <LoginPageContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginImg src={flowerImg} />
      <LoginForm onSubmit={handleSubmit}>
        <InputSet
          labelText="ID"
          id={ID_KEY}
          name={ID_KEY}
          onChange={(event) => handleInputChange(event.target.value, ID_KEY)}
        />
        {!firstRender.current && showError[ID_KEY] && (
          <ErrorText>값을 입력해주세요</ErrorText>
        )}
        <InputSet
          labelText="PW"
          id={PW_KEY}
          name={PW_KEY}
          onChange={(event) => handleInputChange(event.target.value, PW_KEY)}
        />
        {!firstRender.current && showError[PW_KEY] && (
          <ErrorText>값을 입력해주세요</ErrorText>
        )}
        <ButtonWrapper>
          <Button>로그인</Button>
          <Button
            onClick={() => {
              navigate('/signUp');
            }}
            type="button">
            회원가입
          </Button>
        </ButtonWrapper>
      </LoginForm>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.main`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.skyBlue};
  width: 60%;
  height: 40rem;
  border: 1rem;
`;
const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;
const LoginTitle = styled.h3`
  height: 5rem;
  line-height: 5rem;
  font-size: ${({ theme }) => theme.fonts.xl};
`;

const LoginImg = styled.img`
  height: 10rem;
  width: 10rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
