import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
import { pwUtil } from '../utils/pwUtil';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [pwCorrect, setPwCorrect] = useState(false);
  const [isBlank, setIsBlank] = useState({
    id: true,
    password: true,
    nickname: true,
    phone: true,
  });
  const [isRed, setIsRed] = useState({
    id: false,
    password: false,
    nickname: false,
    phone: false,
  });
  const idRef = useRef();
  console.log(idRef.current);
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
    // if (
    //   !isBlank['id'] &&
    //   !isBlank['password'] &&
    //   !isBlank['nickname'] &&
    //   !isBlank['phone'] &&
    //   pwCorrect
    // ) {
    axiosSignUpHandler(memberData);
    // } else {
    //   if (isBlank['id']) {
    //     alert('id를 입력하세요');
    //   }
    //   if (isBlank['password']) {
    //     alert('비밀번호를 입력하세요');
    //   }
    //   if (isBlank['nickname']) {
    //     alert('닉네임을 입력하세요');
    //   }
    //   if (isBlank['phone']) {
    //     alert('전화번호를 입력하세요');
    //   }
  };
  const phoneAutoHyphen = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };
  const handleChange = (event, identifier) => {
    if (!event.target.value) {
      setIsBlank((prevState) => ({
        ...prevState,
        [identifier]: true,
      }));
      console.log(idRef.current);
      idRef.current.focus();
    } else {
      setIsBlank((prevState) => ({
        ...prevState,
        [identifier]: false,
      }));
    }
    console.log(isBlank);
  };
  const handlePw = (event) => {
    console.log(pwUtil(event.target.value));
    setPwCorrect(pwUtil(event.target.value));
  };
  const changeBorder = (target) => {};
  return (
    <SignUpPageContainer>
      <SignUpTitle>회원가입 페이지</SignUpTitle>
      <SignUpForm onSubmit={handleSubmit}>
        <InputSet
          type="text"
          labelText="ID"
          id="authenticationId"
          name="authenticationId"
          onChange={(event) => handleChange(event, 'id')}
          blank={isBlank['id']}
          idRef={idRef}
        />
        <InputSet
          type="text"
          labelText="비밀번호"
          id="password"
          name="password"
          onChange={(event) => {
            handleChange(event, 'password');
            handlePw(event);
          }}
          blank={isBlank['password']}
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
          onChange={(event) => handleChange(event, 'nickname')}
          blank={isBlank['nickname']}
        />
        <InputSet
          type="text"
          labelText="전화번호"
          id="phone"
          name="phone"
          onInput={() => phoneAutoHyphen(event)}
          maxLength="13"
          onChange={(event) => handleChange(event, 'phone')}
          blank={isBlank['phone']}
        />
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
