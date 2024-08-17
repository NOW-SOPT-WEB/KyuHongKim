import styled from "@emotion/styled";

const Card = ({ index, id, src, cardClickHandler, isReverse, disable }) => {
    return (
        <CardWrapper
            key={index}
            onClick={() => cardClickHandler(index, id)}
            disable={disable[index]}
        >
            <CardLayout isReverse={isReverse[index]}>
                <Front style={{ backgroundImage: `url(${src})` }}></Front>
                <Back></Back>
            </CardLayout>
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    height: 12rem;
    width: 9rem;
    cursor: pointer;
    perspective: 1100px;
    pointer-events: ${(props) => (props.disable ? "none" : "auto")};
`;
const CardLayout = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.4s;
    transform-style: preserve-3d;
    transform: ${(props) =>
        props.isReverse ? "rotateY(180deg)" : "rotateY(0)"};
`;
const Front = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: 100% 100%;
    border-radius: 0.5rem;
    backface-visibility: hidden;
    transform: rotateY(180deg);
`;

const Back = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("src/assets/card.jpg");
    background-position: center;
    background-size: 100% 100%;
    backface-visibility: hidden;
`;

export default Card;
