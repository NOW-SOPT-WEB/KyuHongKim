import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginImg src="src/assets/flower.jpg" />
      <InputSet type="string" labelText="ID" inputId="ID" />
      <InputSet type="pw" labelText="PW" inputId="PW" />
      <ButtonWrapper>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </ButtonWrapper>
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
`;

const LoginImg = styled.img`
  height: 20rem;
  width: 30rem;
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
