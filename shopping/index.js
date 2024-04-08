const menu_hide_btn = document.querySelector(".menu_hide_btn");
const menu_bar = document.querySelector("#menu_bar");
const hambuger_btn = document.querySelector(".hambuger_btn");

function menu_hide_handler() {
    menu_bar.style.right = "-15vw";
}

function menu_show_handler() {
    menu_bar.style.right = "0";
}

menu_hide_btn.addEventListener("click", menu_hide_handler);
hambuger_btn.addEventListener("click", menu_show_handler);
console.log(menu_remove_btn);
