import { createPurchaseList } from "./createElementList.js";
import SHOPPING_LIST from "./store/itemData.js";
import { createCartList } from "./cart.js";

const buyBtn = document.querySelector(".buy_btn");
const purchaseBtn = document.querySelector(".purchase_btn");
const modal_close_btn = document.querySelector(".modal_close_btn");
const modal = document.querySelector(".modal_background");

// modal 보이기 함수
function showModal() {
    modal.style.display = "block";

    // 체크박스 체크된 item들만 필터링
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    const checkBoxes = document.querySelectorAll(".check");
    titleList = titleList.filter((_, index) => checkBoxes[index].checked);

    let cartList = [];
    titleList.forEach((title) => {
        SHOPPING_LIST.forEach((elem) => {
            if (elem.title === title) {
                cartList = [...cartList, elem];
            }
        });
    });

    // html 파일에 구매 내역 리스트 생성
    const purchaseContainer = document.querySelector(".purchase_container");
    purchaseContainer.innerHTML = "";
    const purchaseList = createPurchaseList(cartList);
    purchaseList.forEach((elem) => {
        purchaseContainer.innerHTML += elem;
    });

    // 총 구매 금액 계산해서 보여주기
    let totalPrice = 0;
    const price = document.querySelector(".total_price");
    cartList.forEach((elem) => (totalPrice += elem.price));
    price.textContent = `총 구매 금액: ${totalPrice.toLocaleString()}`;
}

// modal 숨기기 함수
function hideModal() {
    modal.style.display = "none";
}

function purchaseHandler() {
    alert("주문완료");
    modal.style.display = "none";
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    const checkBoxes = document.querySelectorAll(".check");
    titleList = titleList.filter((elem, index) => !checkBoxes[index].checked);
    localStorage.setItem("cartList", JSON.stringify(titleList));
    createCartList();
    const total_checkBox = document.querySelector(".total_check");
    total_checkBox.checked = false;
}

modal_close_btn.addEventListener("click", hideModal);
buyBtn.addEventListener("click", showModal);
purchaseBtn.addEventListener("click", purchaseHandler);
