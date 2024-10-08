import "./App.css";
import styled from "@emotion/styled";
import GlobalStyle from "./styles/GlobalStyle";
import { useEffect, useState, useRef } from "react";
import { selectCards } from "./util/cardSelect.js";
import Card from "./component/Card";
import Modal from "./component/common/Modal.jsx";
import PageHeader from "./component/PageHeader";
import ButtonWrapper from "./component/ButtonWrapper";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme.js";

// 뒤집어 줘야하는 카드 표시해주는 함수
const controlReverse = (isReverse, key) => {
    return isReverse.map((elem, index) => {
        return key === index ? !elem : elem;
    });
};

function App() {
    // 초기값들
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(5);
    const [cardArray, setCardArray] = useState(selectCards(level));

    // 카드 수 만큼의 false 값 담긴 배열 생성
    const booleanInitial = Array.from({ length: level * 2 }, () => false);

    // 뒤집혀야할 카드 표시 배열
    const [isReverse, setIsReverse] = useState(booleanInitial);

    // 첫번째 클릭한 카드 담는 state
    const [selectCard, setSelectCard] = useState({});

    // 클릭 금지 카드 표시 배열
    const disable = useRef(booleanInitial);

    // modal
    const modalRef = useRef();

    // 화면 초기화
    const resetValues = () => {
        setCardArray(selectCards(level));
        setIsReverse(booleanInitial);
        setScore(0);
    };

    // level 달라질때 화면 초기화
    useEffect(() => {
        resetValues();
    }, [level]);

    const matchCardHandler = (key, id, temp) => {
        if (selectCard.id === id) {
            // 점수+1
            setScore((prevState) => prevState + 1);
            // 나머지 카드 클릭 허용
            for (let i = 0; i < disable.current.length; i++) {
                if (temp.includes(i)) disable.current[i] = false;
            }
            // 두 카드 클릭 금지 지정
            disable.current[key] = true;
            disable.current[selectCard.key] = true;
        } else {
            // 두카드가 다른 경우 1초 있다 다시 뒤집어주기
            setTimeout(() => {
                setIsReverse((prevState) => controlReverse(prevState, key));
                setIsReverse((prevState) =>
                    controlReverse(prevState, selectCard.key)
                );
                // 나머지 카드 클릭 허용
                for (let i = 0; i < disable.current.length; i++) {
                    if (temp.includes(i)) disable.current[i] = false;
                }
            }, 1000);
        }
    };

    // card click 했을때
    const cardClickHandler = (key, id) => {
        setIsReverse(controlReverse(isReverse, key));

        if (!selectCard) {
            setSelectCard({ key: key, id: id });
            disable.current[key] = true;
        } else {
            let temp = [];

            // 선택된 두 카드 제외하고 클릭 금지
            for (let i = 0; i < disable.current.length; i++) {
                if (!disable.current[i]) {
                    disable.current[i] = true;
                    temp.push(i);
                }
            }
            matchCardHandler(key, id, temp);

            // 카드 선택 초기화
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

    // 모달 닫으면 리셋
    const modalCloseHandler = () => {
        modalRef.current.close();
        resetValues();
    };
    // 다 맞췄을 경우 모달 띄어주기
    if (score === level) {
        modalRef.current.showModal();
    }
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
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
