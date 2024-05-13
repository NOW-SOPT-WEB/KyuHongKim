import styled from 'styled-components';
import { Button } from '../components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const MainPage = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();

  return (
    <MainPageContainer>
      <MainTitle>메인페이지</MainTitle>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=pSUydWEqKwE"
        muted
        controls
        playing
        width={'100%'}
        height={'100%'}
      />
      <ButtonWrapper>
        <Button
          onClick={() => {
            navigate(`/my/${memberId}`);
          }}
          type="button">
          내 정보
        </Button>
        <Button
          onClick={() => {
            navigate('/signUp');
          }}
          type="button">
          회원가입
        </Button>
      </ButtonWrapper>
    </MainPageContainer>
  );
};

const MainTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.xl};
`;
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
