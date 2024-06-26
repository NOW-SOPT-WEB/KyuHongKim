import SHOPPING_LIST from "./store/itemData.js";
import { addItemToCart } from "./addItemToCart.js";
import { createShoppingList } from "./createElementList.js";

const section = document.querySelector(".shoppingList_container");

// 왼쪽 nav바의 버튼들에 상품 필터링 이벤트 적용
const btnList = document.querySelectorAll(".nav_btn");
btnList.forEach((btn) => {
    btn.addEventListener("click", () => {
        showShoppingList(`${btn.className.split("_")[0]}`);
    });
});

// 상품 필터링해주고 화면에 보여주는 함수
function showShoppingList(category) {
    section.innerHTML = "";

    const filterdList =
        category === "total"
            ? SHOPPING_LIST
            : SHOPPING_LIST.filter((elem) => elem.category === category);

    // html에 shopping 리스트 생성
    const list = createShoppingList(filterdList);
    list.forEach((elem) => (section.innerHTML += elem));

    // 삽입된 상품 요소에 click시 장바구니추가 이벤트 적용
    const items = document.querySelectorAll(".item");
    items.forEach((item) => item.addEventListener("click", addItemToCart));
}

// 첫 화면에서 전체 상품 랜더링
showShoppingList("total");
