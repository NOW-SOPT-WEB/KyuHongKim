// 필터링된 상품의 element가 담긴 배열 생성 함수
export function createShoppingList(filterdList) {
    return filterdList.map((item) => {
        return `
            <article class="item ${item.category}">
                <img src=${item.src} alt=${item.title}/>
                <span><i class="fa-regular fa-heart love"></i></span>
                <span>${item.title}</span>
                <span>${item.price.toLocaleString()}</span>
            </article>
        `;
    });
}

// 결제할 상품의 element가 담긴 배열 생성 함수
export function createPurchaseList(purchaseList) {
    return purchaseList.map((item) => {
        return `
            <article class="purchase_item">
                <img src=${item.src} alt=${item.title} />
                <p>${item.title}</p>
                <p>${item.price.toLocaleString()}</p>
            </article>
        `;
    });
}
