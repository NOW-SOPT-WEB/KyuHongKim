import { createPurchaseList } from "./index.js";
import SHOPPING_LIST from "./itemData.js";

// 장바구니 상품 삭제 함수
function deleteItem() {
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    titleList.splice(this.closest("tr").rowIndex - 1, 1);
    localStorage.setItem("cartList", JSON.stringify(titleList));
    createCartList();
}

// 장바구니 구현 함수
function createCartList() {
    let titleList = JSON.parse(localStorage.getItem(`cartList`));

    const cartList = SHOPPING_LIST.filter((elem) =>
        titleList.includes(elem.title)
    );
    const cartRow = document.querySelector("#cart_row");
    const tb = document.querySelector("#cart_body");
    tb.innerHTML = "";

    // 장바구니 테이블 만들기
    cartList.forEach((elem) => {
        let clone = document.importNode(cartRow.content, true);
        let td = clone.querySelectorAll("td");
        td[1].firstElementChild.setAttribute("src", elem.src);
        td[2].textContent = elem.title;
        td[3].textContent = elem.price.toLocaleString();
        td[4].textContent = elem.category;
        tb.appendChild(clone);
    });

    // 삭제 이벤트 할당
    let deleteBtnList = document.querySelectorAll(".delete_btn");
    deleteBtnList.forEach((elem) => elem.addEventListener("click", deleteItem));
}

// 최초 랜더링
createCartList();

// 전체 체크
const totalChcek = document.querySelector(".total_check");
function checkWhole() {
    const checkBoxes = document.querySelectorAll(".check");
    checkBoxes.forEach((elem) => (elem.checked = totalChcek.checked));
}

totalChcek.addEventListener("click", checkWhole);

// modal
const buyBtn = document.querySelector(".buy_btn");
const purchaseBtn = document.querySelector(".purchase_btn");
const checkInputList = document.querySelectorAll(".check");
const modal_close_btn = document.querySelector(".modal_close_btn");

const purchaseList = [];

// function clickHandler() {
//     if (this.checked) {
//         purchaseList.append(this.closest("tr").rowIndex - 1);
//     } else {
//         if (purchaseList.includes(this.closest("tr").rowIndex - 1)) {
//             purchaseList.splice();
//         }
//     }
// }

// checkInputList.forEach((elem) => {
//     elem.addEventListener("click", clickHandler);
// });

const modal = document.querySelector(".modal");

function showModal() {
    let totalPrice = 0;
    modal.style.display = "block";
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    const purchaseContainer = document.querySelector(".purchase_container");
    const price = document.querySelector(".total_price");
    purchaseContainer.innerHTML = "";

    const checkBoxes = document.querySelectorAll(".check");
    titleList = titleList.filter((elem, index) => checkBoxes[index].checked);

    const cartList = SHOPPING_LIST.filter((elem) =>
        titleList.includes(elem.title)
    );
    cartList.forEach((elem) => (totalPrice += elem.price));
    const purchaseList = createPurchaseList(cartList);
    purchaseList.forEach((elem) => {
        purchaseContainer.innerHTML += elem;
    });
    price.textContent = `총 구매 금액: ${totalPrice.toLocaleString()}`;
}

function hideModal() {
    modal.style.display = "none";
}
modal_close_btn.addEventListener("click", hideModal);

function purchaseHandler() {
    alert("주문완료");
    modal.style.display = "none";
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    const checkBoxes = document.querySelectorAll(".check");
    titleList = titleList.filter((elem, index) => !checkBoxes[index].checked);
    localStorage.setItem("cartList", JSON.stringify(titleList));
    createCartList();
}

buyBtn.addEventListener("click", showModal);
purchaseBtn.addEventListener("click", purchaseHandler);
