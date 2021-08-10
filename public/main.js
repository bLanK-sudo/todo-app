const theme = document.querySelector('.theme')
const body = document.getElementsByTagName('body')
const list = document.querySelector('.list')
const type = document.querySelector('.type')
const line = document.querySelectorAll('.line')
const lineCompleted = document.querySelectorAll('.line-completed')
const formContainer = document.querySelector('.form-container')
const reg = document.querySelectorAll('.reg')
const regBtn = document.querySelectorAll('.reg-btn')
const headerInfo = document.querySelector('.header-info')
const hr = document.querySelectorAll('hr')
function addTheme() {
    if (list) {
        body[0].classList.add('light-wallpaper')
        list.classList.add('light-list')
        type.classList.add('light-type')
        if (line) {
            line.forEach(e => {
                e.classList.add('light-line')
            })
        }
        if (lineCompleted) {
            lineCompleted.forEach(e => {
                e.classList.add('light-line-completed')
            })
        }
        hr.forEach(e => {
            e.classList.add('light-hr')
        })
        theme.src = "./images/icon-moon.svg"
    }
    // else{
    //     body[0].classList.add('light-wallpaper')
    //     headerInfo.classList.add('header-info-light')
    //     formContainer.classList.add('light-list')
    //     reg.forEach(e => {
    //         e.classList.add('regg')
    //     })
    //     regBtn.forEach(e => {
    //         e.classList.add('reg-light')
    //     })
    //     theme.src = "./images/icon-moon.svg"
    // }
}

function removeTheme() {
    if (list) {
        body[0].classList.remove('light-wallpaper')
        list.classList.remove('light-list')
        type.classList.remove('light-type')
        if (line) {
            line.forEach(e => {
                e.classList.remove('light-line')
            })
        }
        if (lineCompleted) {
            lineCompleted.forEach(e => {
                e.classList.remove('light-line-completed')
            })
        }

        hr.forEach(e => {
            e.classList.remove('light-hr')
        })
        theme.src = "./images/icon-sun.svg"
    }
    // else{
    //     body[0].classList.remove('light-wallpaper')
    //     formContainer.classList.remove('light-list')
    //     headerInfo.classList.remove('header-info-light')
    //     reg.forEach(e => {
    //         e.classList.remove('regg')
    //     })
    //     regBtn.forEach(e => {
    //         e.classList.remove('reg-light')
    //     })
    //     theme.src = "./images/icon-sun.svg"
    // }
}
let darkmode = localStorage.getItem('theme');
const enableDarkMode = () => {
    removeTheme()
    localStorage.setItem('theme', 'enabled')
}
const disableDarkMode = () => {
    addTheme()
    localStorage.setItem('theme', null)
}
if (darkmode == 'enabled') {
    enableDarkMode()
} else {
    disableDarkMode()
}
theme.addEventListener('click', e => {
    darkmode = localStorage.getItem('theme')
    if (darkmode !== 'enabled') {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})