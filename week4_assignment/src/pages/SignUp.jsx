import styled from 'styled-components';
import { Button } from '../components/common/Button';
import InputSet from '../components/common/InputSet';
import { useNavigate } from 'react-router-dom';
import {
  BASE_URL,
  ID_KEY,
  NICKNAME_KEY,
  PHONE_KEY,
  PW_KEY,
} from '../constants';
import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
import { pwUtil } from '../utils/pwUtil';

const SignUpPage = () => {
  const navigate = useNavigate();

  // input이 비었는지 체크하는 상태
  const [isBlank, setIsBlank] = useState({
    [ID_KEY]: true,
    [PW_KEY]: true,
    [NICKNAME_KEY]: true,
    [PHONE_KEY]: true,
  });

  const firstRender = useRef(true);

  const idRef = useRef();
  const pwRef = useRef();
  const nickNameRef = useRef();
  const phoneRef = useRef();

  // post 요청으로 회원가입 해주기
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

  // 회원가입 버튼 눌렀을 때
  const handleSubmit = (event) => {
    event.preventDefault();

    firstRender.current ? (firstRender.current = false) : '';
    const fd = new FormData(event.target);
    const memberData = Object.fromEntries(fd.entries());

    // 각 input이 비어있으면 isBlank 상태에 반영
    for (let key in memberData) {
      const inputValue = memberData[key];
      !inputValue
        ? setIsBlank((prevState) => ({
            ...prevState,
            [key]: true,
          }))
        : setIsBlank((prevState) => ({
            ...prevState,
            [key]: false,
          }));
    }

    const pwCorrect = pwUtil(memberData[PW_KEY]);
    // 값이 비어있지 않고 비밀번호 양식이 올바를 때만 회원가입 요청 보내기
    if (!memberData[ID_KEY]) {
      alert('id를 입력하세요');
      idRef.current.focus();
    } else if (!memberData[PW_KEY]) {
      alert('비밀번호를 입력하세요');
      pwRef.current.focus();
    } else if (!memberData[NICKNAME_KEY]) {
      alert('닉네임을 입력하세요');
      nickNameRef.current.focus();
    } else if (!memberData[PHONE_KEY]) {
      alert('전화번호를 입력하세요');
      phoneRef.current.focus();
    } else if (!pwCorrect) {
      alert('비밀번호 양식이 올바르지 않습니다.');
    } else {
      axiosSignUpHandler(memberData);
    }
  };

  // 전화번호 자동으로 변환해주기
  const phoneAutoHyphen = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };

  return (
    <SignUpPageContainer>
      <SignUpTitle>회원가입 페이지</SignUpTitle>
      <SignUpForm onSubmit={handleSubmit}>
        <InputSet
          labelText="ID"
          id={ID_KEY}
          name={ID_KEY}
          blank={isBlank[ID_KEY] && !firstRender.current}
          inputRef={idRef}
        />
        <InputSet
          labelText="비밀번호"
          id={PW_KEY}
          name={PW_KEY}
          blank={isBlank[PW_KEY] && !firstRender.current}
          inputRef={pwRef}
        />
        <Description>
          비밀번호 형식은 8자이상, 숫자, 특수문자, 영어 알파벳이
          포함되어야합니다
        </Description>

        <InputSet
          labelText="닉네임"
          id={NICKNAME_KEY}
          name={NICKNAME_KEY}
          blank={isBlank[NICKNAME_KEY] && !firstRender.current}
          inputRef={nickNameRef}
        />

        <InputSet
          labelText="전화번호"
          id={PHONE_KEY}
          name={PHONE_KEY}
          onInput={(event) => phoneAutoHyphen(event)}
          maxLength="13"
          blank={isBlank[PHONE_KEY] && !firstRender.current}
          inputRef={phoneRef}
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
