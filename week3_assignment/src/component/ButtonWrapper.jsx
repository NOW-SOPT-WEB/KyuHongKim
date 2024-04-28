import styled from "@emotion/styled";

const ButtonWrapper = () => {
    return (
        <ButtonLayout>
            <LevelButton>Easy</LevelButton>
            <LevelButton>Normal</LevelButton>
            <LevelButton>Hard</LevelButton>
        </ButtonLayout>
    );
};

const ButtonLayout = styled.section`
    margin: 0 auto;
    display: flex;
    gap: 2rem;
    margin-top: 3rem;
`;

const LevelButton = styled.button`
    width: 5rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    color: whitesmoke;
    border: solid 0;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fonts.md};
`;

export default ButtonWrapper;
