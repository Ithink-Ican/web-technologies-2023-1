let menu = document.querySelector('.header__menu_container');
let burger = document.querySelector('.header__burger');
let mail_768 = document.querySelector('.mail_768');
let header = document.querySelector('header');
// let menu_logo = document.querySelector('.menu_logo');
// let logo_container = document.querySelector('.header__logo_container');


burger.onclick = function(e) {
    menu.classList.toggle('active__menu');
    burger.classList.toggle('active__menu');
    document.body.classList.toggle('lock');
    header.classList.toggle('active__header');
}

document.querySelectorAll(".menu__link").forEach(n => n.addEventListener("click", () => {
    menu.classList.remove("active__menu");
    burger.classList.remove("active__menu");
    document.body.classList.remove('lock');
    header.classList.remove('active__header');
}))