import { addItem, createShoppingList } from "./index.js";
import SHOPPING_LIST from "./itemData.js";

const section = document.querySelector(".container");
const btnList = document.querySelectorAll(".nav_btn");

// 왼쪽 nav바의 버튼들에 상품 필터 이벤트 적용
btnList.forEach((elem) => {
    elem.addEventListener("click", () => {
        showShoppingList(`${elem.className.split("_")[0]}`);
    });
});

function showShoppingList(category) {
    section.innerHTML = "";
    let filterdList;
    // category에 따른 상품 필터링
    if (category === "total") filterdList = SHOPPING_LIST;
    else {
        filterdList = SHOPPING_LIST.filter(
            (elem) => elem.category === category
        );
    }

    // html 파일에 요소 삽입
    const list = createShoppingList(filterdList);
    list.forEach((elem) => (section.innerHTML += elem));

    // 삽입된 상품 요소에 click시 장바구니에 추가 이벤트 적용
    const items = document.querySelectorAll(".item");
    items.forEach((elem) => elem.addEventListener("click", addItem));
}

// 첫 화면에서 전체 상품 랜더링
showShoppingList("total");
