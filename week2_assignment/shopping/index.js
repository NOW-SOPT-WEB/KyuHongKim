/** menu_bar show & hidden 구현 */
const menu_bar = document.querySelector("#menu_bar");
const menu_hide_btn = document.querySelector(".menu_hide_btn");
const hambuger_btn = document.querySelector(".hambuger_btn");

function menu_hide_handler() {
    menu_bar.style.right = "-15vw";
}

function menu_show_handler() {
    menu_bar.style.right = "0";
}

menu_hide_btn.addEventListener("click", menu_hide_handler);
hambuger_btn.addEventListener("click", menu_show_handler);
/** */

/** nav 클릭시 해당 쇼핑리스트 보여주기 구현 */
const shoppingList = document.querySelectorAll(".shoppingList");
const btn_list = document.querySelectorAll(".nav_btn");

// name값에 해당하는 쇼핑리스트의 display값을 block으로,
// 나머지 쇼핑리스트들은 none값을 줘서 해당하는 쇼핑리스트만 보여주는 함수
function showList(name) {
    shoppingList.forEach((elem) => {
        if (elem.id === name) elem.style.display = "block";
        else elem.style.display = "none";
    });
}

// nav의 각 버튼에 click 이벤트 추가
btn_list.forEach((elem) => {
    elem.addEventListener("click", () => {
        showList(`${elem.className.split("_")[0]}List`);
    });
});
/** */

const click = document.querySelector(".click");

function addItem() {
    if (confirm("장바구니에 추가하겠습니까?") === true) {
        console.log(this.children[0]);
        let temp = {
            src: this.children[0].src,
            title: this.children[2].innerText,
            price: this.children[3].innerText,
            category: this.className.split(" ")[1],
        };
        localStorage.setItem(
            `${this.children[2].innerText}`,
            JSON.stringify(temp)
        );
        console.log(
            JSON.parse(localStorage.getItem(`${this.children[2].innerText}`))
        );
    }
}

click.addEventListener("click", addItem);

// function createCartItem() {
//     let temp = JSON.parse(
//         localStorage.getItem(`${this.children[2].innerText}`)
//     );
//     return (

//     );
// }
