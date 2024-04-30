import "./App.css";
import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { useEffect, useState, useRef } from "react";
import { selectCards } from "./component/util/cardSelect";
import Card from "./component/Card";
import Modal from "./component/util/Modal";
import PageHeader from "./component/PageHeader";
import ButtonWrapper from "./component/ButtonWrapper";

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
    // 초기값들
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(5);
    const [cardArray, setCardArray] = useState(selectCards(9, level));

    const booleanArray = Array.from({ length: level }, () => false);
    const booleanInitial = [...booleanArray, ...booleanArray];
    const [isReverse, setIsReverse] = useState([booleanInitial]);

    const disable = useRef(booleanInitial);

    // 첫번째 클릭한 카드
    const [selectCard, setSelectCard] = useState();

    const resetValues = () => {
        setCardArray(selectCards(9, level));
        setIsReverse(booleanInitial);
        setScore(0);
    };
    useEffect(() => {
        resetValues();
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
    };

    // modal
    const modalRef = useRef();
    if (score === level) {
        modalRef.current.showModal();
    }

    const modalCloseHandler = () => {
        modalRef.current.close();
        resetValues();
    };

    return (
        <>
            <Modal modalRef={modalRef} modalCloseHandler={modalCloseHandler} />
            <GlobalStyle />
            <PageHeader
                score={score}
                level={level}
                resetHandler={resetValues}
            />
            <MainLayout>
                <ButtonWrapper levelClickHandler={levelClickHandler} />
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
    margin-top: 1rem;
    gap: 0.3rem;
`;

export default App;
