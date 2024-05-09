import styled from 'styled-components';
import { Button } from '../components/common/Button';

const MainPage = () => {
  return (
    <MainPageContainer>
      <MainImg src="src/assets/웨비단체사진.JPG" />
      <ButtonWrapper>
        <Button>내 정보</Button>
        <Button>회원가입</Button>
      </ButtonWrapper>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.main`
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 7rem;
  align-items: center;
  background-color: aliceblue;
  width: 60%;
  height: 40rem;
`;

const MainImg = styled.img`
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

export default MainPage;
