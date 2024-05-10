import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();

  const [showError, setShowError] = useState({
    email: false,
    password: false,
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const loginData = Object.fromEntries(fd.entries());

    axiosLoginHandler(loginData);
  };

  const handleInputBlur = (value) => {
    if (!value) {
    }
  };
  return (
    <LoginPageContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginImg src="src/assets/flower.jpg" />
      <LoginForm onSubmit={handleSubmit}>
        <InputSet
          type="text"
          labelText="ID"
          id="authenticationId"
          name="authenticationId"
          onBlur={(event) => handleInputBlur()}
        />
        <InputSet type="text" labelText="PW" id="password" name="password" />
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

const LoginTitle = styled.h3`
  height: 5rem;
  line-height: 5rem;
  font-size: ${({ theme }) => theme.fonts.xl};
`;

const LoginImg = styled.img`
  height: 10rem;
  width: 10rem;
`;

const LoginForm = styled.form``;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
