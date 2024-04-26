// 필터링된 상품의 element가 담긴 배열 생성 함수
export function createShoppingList(filterdList) {
    return filterdList.map((elem) => {
        return `
            <article class="item ${elem.category}">
                <img src=${elem.src} alt=${elem.title}/>
                <span><i class="fa-regular fa-heart love"></i></span>
                <span>${elem.title}</span>
                <span>${elem.price.toLocaleString()}</span>
            </article>
        `;
    });
}

// 결제할 상품의 element가 담긴 배열 생성 함수
export function createPurchaseList(purchaseList) {
    return purchaseList.map((elem) => {
        return `
            <article class="purchase_item">
                <img src=${elem.src} alt=${elem.title} />
                <p>${elem.title}</p>
                <p>${elem.price.toLocaleString()}</p>
            </article>
        `;
    });
}
