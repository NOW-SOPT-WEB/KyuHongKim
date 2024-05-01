import styled from "@emotion/styled";
import MyButton from "./util/MyButton";

const PageHeader = ({ score, level, resetHandler }) => {
    return (
        <HeaderLayout>
            <TitleContainer>
                <Title>연예인 맞추기</Title>
                <Score>
                    {score}/{level}
                </Score>
            </TitleContainer>
            <ResetBtn onClick={resetHandler}>Reset</ResetBtn>
        </HeaderLayout>
    );
};

const HeaderLayout = styled.header`
    width: 100%;
    height: 7rem;
    background-color: ${({ theme }) => theme.colors.skyBlue};
    display: flex;
`;

const TitleContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fonts.xxl};
    font-weight: 600;
    color: whitesmoke;
`;

const Score = styled.span`
    font-size: ${({ theme }) => theme.fonts.xl};
    color: whitesmoke;
`;

const ResetBtn = styled(MyButton)`
    position: fixed;
    right: 0.5rem;
    top: 1rem;
    width: 10rem;
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    font-size: ${({ theme }) => theme.fonts.xl};
`;

export default PageHeader;
