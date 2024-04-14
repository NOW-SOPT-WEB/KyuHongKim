// 상품 클릭시 장바구니에 추가해주는 함수
export function addItem() {
    if (confirm("장바구니에 추가하겠습니까?") === true) {
        const itemTitle = this.children[2].innerText;

        if (!localStorage.getItem("cartList")) {
            localStorage.setItem("cartList", JSON.stringify([itemTitle]));
        } else {
            let cartList = JSON.parse(localStorage.getItem("cartList"));

            // 장바구니 상품 중복 방지
            cartList = cartList.includes(itemTitle)
                ? cartList
                : [...cartList, itemTitle];
            localStorage.setItem("cartList", JSON.stringify(cartList));
        }
        window.location.href = "../html/cart.html";
    }
}

// HTML파일에 삽입될 상품 element 배열 생성 함수
export function createShoppingList(filterdList) {
    return filterdList.map((elem) => {
        return `
            <div class="item ${elem.category}">
                <img src=${elem.src} alt=${elem.title}/>
                <span><i class="fa-regular fa-heart love"></i></span>
                <span>${elem.title}</span>
                <span>${elem.price.toLocaleString()}</span>
            </div>
        `;
    });
}
