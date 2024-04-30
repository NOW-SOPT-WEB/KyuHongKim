import styled from "@emotion/styled";
import ButtonWrapper from "./ButtonWrapper";
import Card from "./Card";
import { useRef, useState } from "react";

const Main = ({ level, cardArray, setScore, setLevel, cardClickHandler }) => {
    const cardComponents = cardArray.map((elem, index) => {
        return (
            <Card
                key={index}
                id={elem.id}
                src={elem.src}
                cardClickHandler={cardClickHandler}
            />
        );
    });

    return (
        <MainLayout>
            <ButtonWrapper setLevel={setLevel} />
            <CardLayout>{cardComponents}</CardLayout>
        </MainLayout>
    );
};

const MainLayout = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CardLayout = styled.section`
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
`;

export default Main;
