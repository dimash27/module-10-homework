let btn = document.querySelector('#toggleButton')
let icon1 = document.querySelector('#icon1')
let icon2 = document.querySelector('#icon2')

btn.addEventListener('click', () => {
    icon1.classList.toggle('active')
    icon2.classList.toggle('active')
})