import cardData from "../Constant/cardData";

// 랜덤으로 카드 Id 선택후 배열 반환해주는 함수
export const selectCards = (cardCount) => {
    let randomIndexArray = [];
    for (let i = 0; i < cardCount; i++) {
        const randomNum = Math.floor(Math.random() * cardData.length);
        if (randomIndexArray.indexOf(randomNum) === -1) {
            randomIndexArray.push(randomNum);
        } else {
            i--;
        }
    }
    let cardArray = randomIndexArray.map((elem) => cardData[elem]);
    cardArray = [...cardArray, ...cardArray];
    shuffle(cardArray);
    return cardArray;
};

// 배열 순서 섞어주는 함수
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
