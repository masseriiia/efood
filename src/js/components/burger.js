const burger = document.querySelector('.nav-menu')
const nav = document.querySelector('.nav')

burger.addEventListener('click', function (){
    this.classList.toggle('active')
    nav.classList.toggle('open')
})
