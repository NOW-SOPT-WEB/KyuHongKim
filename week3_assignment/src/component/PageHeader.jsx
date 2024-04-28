import styled from "@emotion/styled";

const PageHeader = () => {
    return (
        <>
            <HeaderLayout>
                <TitleContainer>
                    <Title>맞추기</Title>
                    <Score>0/5</Score>
                </TitleContainer>
                <ResetBtn>Reset</ResetBtn>
            </HeaderLayout>
        </>
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
    color: whitesmoke;
`;

const Score = styled.span`
    font-size: ${({ theme }) => theme.fonts.xl};
    color: whitesmoke;
`;

const ResetBtn = styled.button`
    position: fixed;
    right: 0.5rem;
    top: 1rem;
    width: 10rem;
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    color: whitesmoke;
    border: solid 0;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fonts.lg};
`;

export default PageHeader;
