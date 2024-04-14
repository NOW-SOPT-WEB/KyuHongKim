/** menu_bar show & hidden 구현 */
const menuBar = document.querySelector(".menu_bar");
const menuHideBtn = document.querySelector(".menu_hide_btn");
const hambugerBtn = document.querySelector(".hambuger_btn");

function menuHideHandler() {
    menuBar.style.right = "-15vw";
}

function menuShowHandler() {
    menuBar.style.right = "0";
}

menuHideBtn.addEventListener("click", menuHideHandler);
hambugerBtn.addEventListener("click", menuShowHandler);
