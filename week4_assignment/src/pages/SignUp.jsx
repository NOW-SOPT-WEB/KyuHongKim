import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <SignUpTitle>회원가입 페이지</SignUpTitle>

      <InputSet type="string" labelText="ID" inputId="id" />
      <InputSet type="pw" labelText="비밀번호" inputId="pw" />
      <InputSet type="string" labelText="닉네임" inputId="nickname" />
      <InputSet type="string" labelText="전화번호" inputId="callNum" />
      <ButtonWrapper>
        <Button>회원가입</Button>
        <Button>뒤로가기</Button>
      </ButtonWrapper>
    </SignUpPageContainer>
  );
};

const SignUpPageContainer = styled.main`
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

const SignUpTitle = styled.h3`
  height: 5rem;
  line-height: 5rem;
  font-size: ${({ theme }) => theme.fonts.xl};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default SignUpPage;
