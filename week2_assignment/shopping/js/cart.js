import SHOPPING_LIST from "./store/itemData.js";

// 장바구니 구현 함수
export function createCartList() {
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    let cartList = [];
    titleList.forEach((title) => {
        SHOPPING_LIST.forEach((elem) => {
            if (elem.title === title) {
                cartList = [...cartList, elem];
            }
        });
    });

    const cartRow = document.querySelector("#cart_row");
    const tb = document.querySelector(".cart_body");
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

// 장바구니 상품 삭제 함수
function deleteItem() {
    let titleList = JSON.parse(localStorage.getItem(`cartList`));
    titleList.splice(this.closest("tr").rowIndex - 1, 1);
    localStorage.setItem("cartList", JSON.stringify(titleList));
    createCartList();
}

// 전체 체크
const totalChcek = document.querySelector(".total_check");
function checkWhole() {
    const checkBoxes = document.querySelectorAll(".check");
    checkBoxes.forEach((elem) => (elem.checked = totalChcek.checked));
}

totalChcek.addEventListener("click", checkWhole);

// 최초 랜더링
createCartList();
