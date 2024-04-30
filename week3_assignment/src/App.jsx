import "./App.css";
import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { useEffect, useState, useRef } from "react";
import { selectCards } from "./component/util/cardSelect";
import Card from "./component/Card";
import Modal from "./component/util/Modal";
import PageHeader from "./component/PageHeader";

const controlReverse = (isReverse, key) => {
    const temp = isReverse.map((elem, index) => {
        if (key === index) {
            return !elem;
        } else {
            return elem;
        }
    });
    return temp;
};

function App() {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(5);

    const [cardArray, setCardArray] = useState(selectCards(9, level));

    const reverseInitial = Array.from({ length: level }, () => false);
    const [isReverse, setIsReverse] = useState([
        ...reverseInitial,
        ...reverseInitial,
    ]);

    const disable = useRef([...reverseInitial, ...reverseInitial]);

    const [selectCard, setSelectCard] = useState();

    useEffect(() => {
        setCardArray(selectCards(9, level));
        setIsReverse([...reverseInitial, ...reverseInitial]);
    }, [level]);

    // card click 했을때
    const cardClickHandler = (key, id) => {
        setIsReverse(controlReverse(isReverse, key));

        if (!selectCard) {
            setSelectCard({ key: key, id: id });
        } else {
            let temp = [];

            for (let i = 0; i < disable.current.length; i++) {
                if (!disable.current[i]) {
                    disable.current[i] = true;
                    temp.push(i);
                }
            }

            if (selectCard.id === id) {
                setScore((prevState) => {
                    return prevState + 1;
                });
                disable.current[key] = true;
                disable.current[selectCard.key] = true;
                for (let i = 0; i < disable.current.length; i++) {
                    if (temp.includes(i)) disable.current[i] = false;
                }
            } else {
                setTimeout(() => {
                    setIsReverse(controlReverse(isReverse, key));
                    setIsReverse(controlReverse(isReverse, selectCard.key));
                    for (let i = 0; i < disable.current.length; i++) {
                        if (temp.includes(i)) disable.current[i] = false;
                    }
                }, 1000);
            }
            setSelectCard();
        }
    };

    // cardList 생성해주기
    const cardComponents = cardArray.map((elem, index) => {
        return (
            <Card
                key={index}
                index={index}
                id={elem.id}
                src={elem.src}
                cardClickHandler={cardClickHandler}
                isReverse={isReverse}
                disable={disable.current}
            />
        );
    });

    // level 버튼 클릭했을때
    const levelClickHandler = (level) => {
        setLevel(level);
        setIsReverse([...reverseInitial, ...reverseInitial]);
        setScore(0);
    };

    // modal
    const modalRef = useRef();
    if (score === level) {
        modalRef.current.showModal();
    }

    const resetHandler = () => {
        setCardArray(selectCards(9, level));
        setIsReverse([...reverseInitial, ...reverseInitial]);
        setScore(0);
        for (let i = 0; i < disable.current.length; i++) {
            disable.current[i] = false;
        }
    };

    const modalCloseHandler = () => {
        modalRef.current.close();
        setCardArray(selectCards(9, level));
        setIsReverse([...reverseInitial, ...reverseInitial]);
        setScore(0);
    };
    return (
        <>
            <Modal modalRef={modalRef} modalCloseHandler={modalCloseHandler} />
            <GlobalStyle />
            <PageHeader
                score={score}
                level={level}
                resetHandler={resetHandler}
            />
            <MainLayout>
                <ButtonLayout>
                    <LevelButton onClick={() => levelClickHandler(5)}>
                        Easy
                    </LevelButton>
                    <LevelButton onClick={() => levelClickHandler(7)}>
                        Normal
                    </LevelButton>
                    <LevelButton onClick={() => levelClickHandler(9)}>
                        Hard
                    </LevelButton>
                </ButtonLayout>
                <CardList>{cardComponents}</CardList>
            </MainLayout>
        </>
    );
}

// main
const MainLayout = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CardList = styled.section`
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
`;

// button section
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

export default App;
