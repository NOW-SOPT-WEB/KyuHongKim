import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../constants';
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { params } = useParams();
  const axiosSignUpHandler = async (memberData) => {
    try {
      const response = await axios.post(`${BASE_URL}/member/join`, memberData);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const memberData = Object.fromEntries(fd.entries());

    axiosSignUpHandler(memberData);
  };
  return (
    <SignUpPageContainer>
      <SignUpTitle>회원가입 페이지</SignUpTitle>
      <SignUpForm onSubmit={handleSubmit}>
        <InputSet
          type="text"
          labelText="ID"
          id="authenticationId"
          name="authenticationId"
        />
        <InputSet
          type="text"
          labelText="비밀번호"
          id="password"
          name="password"
        />
        <Description>
          비밀번호 형식은 8자이상, 숫자, 특수문자, 영어 알파벳이
          포함되어야합니다
        </Description>

        <InputSet
          type="text"
          labelText="닉네임"
          id="nickname"
          name="nickname"
        />
        <InputSet type="text" labelText="전화번호" id="phone" name="phone" />
        <Description>전화번호 형식은 010-****-****입니다.</Description>
        <ButtonWrapper>
          <Button type="submit">회원가입</Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            type="button">
            뒤로가기
          </Button>
        </ButtonWrapper>
      </SignUpForm>
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
const Description = styled.p`
  color: ${({ theme }) => theme.colors.purple};
  font-size: ${({ theme }) => theme.fonts.ssm};
`;
const SignUpForm = styled.form``;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default SignUpPage;
