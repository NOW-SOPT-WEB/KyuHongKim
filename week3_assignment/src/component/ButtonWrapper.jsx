import styled from "@emotion/styled";
import MyButton from "./common/MyButton";

const ButtonWrapper = ({ levelClickHandler }) => {
    return (
        <ButtonLayout>
            <LevelButton onClick={() => levelClickHandler(5)}>Easy</LevelButton>
            <LevelButton onClick={() => levelClickHandler(7)}>
                Normal
            </LevelButton>
            <LevelButton onClick={() => levelClickHandler(9)}>Hard</LevelButton>
        </ButtonLayout>
    );
};

// button section
const ButtonLayout = styled.section`
    margin: 0 auto;
    display: flex;
    gap: 2rem;
    margin-top: 3rem;
`;

const LevelButton = styled(MyButton)`
    width: 6rem;
    height: 2.3rem;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    font-size: ${({ theme }) => theme.fonts.md};
`;

export default ButtonWrapper;
