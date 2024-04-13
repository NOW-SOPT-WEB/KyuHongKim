const temp = JSON.parse(localStorage.getItem(`모션데스크`));
console.log(temp);

const cartRow = document.querySelector("#cart_row");
const tb = document.querySelector("#cart_body");
let clone = document.importNode(cartRow.content, true);
let td = clone.querySelectorAll("td");
// td[1].textContent = temp.src;
td[2].textContent = temp.title;
td[3].textContent = temp.price;
td[4].textContent = temp.category;

tb.appendChild(clone);
console.log(td);
