// 상품 클릭시 장바구니에 추가해주는 함수
export function addItemToCart() {
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
    if (confirm("장바구니에 상품이 담겼습니다. 장바구니로 이동하겠습니까?")) {
        window.location.href = "../html/cart.html";
    }
}
