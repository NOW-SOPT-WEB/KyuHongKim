import "./App.css";
import styled from "@emotion/styled";

import GlobalStyle from "./styles/GlobalStyle";

import { useEffect, useState, useRef } from "react";
import { selectCards, shuffle } from "./component/util/cardSelect";
import Card from "./component/Card";

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
        console.log("click", key, id);
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
                disable={disable}
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
            <dialog
                ref={modalRef}
                className="px-20 py-10 outline-none text-lg font-semibold backdrop:bg-black backdrop:opacity-70"
            >
                <h1>게임 클리어!</h1>
                <button
                    onClick={modalCloseHandler}
                    className="mx-auto px-5 py-2 w-full bg-red-400 outline-none"
                >
                    게임으로 돌아가기
                </button>
            </dialog>
            <GlobalStyle />
            <HeaderLayout>
                <TitleContainer>
                    <Title>맞추기</Title>
                    <Score>
                        {score}/{level}
                    </Score>
                </TitleContainer>
                <ResetBtn onClick={resetHandler}>Reset</ResetBtn>
            </HeaderLayout>
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

// header
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
