'use strict'

const burger  = (burgerBtn, closeBtn, modal, activeClass) => {
    const menuOpen = document.querySelector(`.${burgerBtn}`)
    const menuClose = document.querySelector(`.${closeBtn}`)
    const menu = document.querySelector(`.${modal}`)

    menuOpen.addEventListener('click', () => {
        menu.classList.add(`${activeClass}`)
    })
    menuClose.addEventListener('click', () => {
        menu.classList.remove(`${activeClass}`)
    })
}

const accordion = (list, item, itemActive) => {
    const listItem = document.querySelector(`.${list}`)

    listItem.addEventListener('click', (e) => {
        if (e.target.closest(`.${item}`)) {
            e.target.closest(`.${item}`).classList.toggle(`${itemActive}`)
        }
    })
}

if (document.querySelector('.certificates__slider')) {
    const swiper = new Swiper('.certificates__slider', {
        loop: true,

        slidesPerView: 'auto',
        navigation: {
            nextEl: '.certificates__arrow_right',
            prevEl: '.certificates__arrow_left',
        },

    });
}

if (document.querySelector('.companies__inner')) {
    const swiper2 = new Swiper('.companies__inner', {
        loop: true,

        slidesPerView: 'auto',
        navigation: {
            nextEl: '.certificates__arrow_right',
            prevEl: '.certificates__arrow_left',
        },

    });
}

const tabs = () => {
    const tabs = document.querySelector('.design-tent-nav')
    let count = 1

    tabs.addEventListener('click', (e) => {
        if (e.target.closest('.design-tent-nav__item')) {
            tabs.querySelectorAll('.design-tent-nav__item').forEach(item => {
                item.classList.remove('design-tent-nav__item_active')
            })
            e.target.closest('.design-tent-nav__item').classList.add('design-tent-nav__item_active')

            const model = document.querySelector('.design-tent__model > img')

            model.setAttribute('src', `./img/design/${e.target.closest('.design-tent-nav__item').getAttribute('data-image')}.png`)
            count = +e.target.closest('.design-tent-nav__item').getAttribute('data-image')
        }
    })

    const autoTabs = () => {
        if (count <= 2) {
            tabs.querySelectorAll('.design-tent-nav__item').forEach((item) => {
                item.classList.remove('design-tent-nav__item_active')
            })
            tabs.querySelectorAll('.design-tent-nav__item')[count].classList.add('design-tent-nav__item_active')
            document.querySelector('.design-tent__model > img').setAttribute('src', `./img/design/${tabs.querySelectorAll('.design-tent-nav__item')[count].getAttribute('data-image')}.png`)
            count++
        } else if (count > 2) {
            count = 0
        }
    }

    setInterval(autoTabs, 4000)
}

const tabTask = () => {
    const tabsPanelType = document.querySelector('.task-form__radios[data-radios-tabs="1"]');
    const hiddenSubForm = document.querySelector('.task__subform[data-subform="hidden"]');

    const tabsPanelSize = document.querySelector('.task-form__radios[data-radios-tabs="2"]');
    const inputsSize =  tabsPanelSize.querySelectorAll('input');
    const hiddenBlocks = document.querySelectorAll('.task-selectors[data-task="hidden"]');

    tabsPanelType.addEventListener('click', (e) => {
        if(e.target.closest('input')) {
            const input = e.target.closest('input').id;
            if (input == 'type-3') {
                if(hiddenSubForm.classList.contains('task__subform_diabled')) {
                    hiddenSubForm.classList.remove('task__subform_diabled');
                }
            } else {
                hiddenSubForm.classList.add('task__subform_diabled');
                inputsSize.forEach(input => input.checked = false);
                hiddenBlocks.forEach(item => {
                    item.querySelectorAll('input').forEach(input => {
                        input.checked = false;
                    })
                    item.classList.add('task-selectors_disabled');
                });
            }
        }
    });

    tabsPanelSize.addEventListener('click', (e) => {
        if (e.target.closest('input')) {
            const btn = e.target.closest('input');
            inputsSize.forEach((input, index) => {
                if (btn === input) {
                    if (hiddenBlocks[index].classList.contains('task-selectors_disabled')) {
                        hiddenBlocks[index].classList.remove('task-selectors_disabled');
                    }
                } else {
                    hiddenBlocks[index].classList.add('task-selectors_disabled');
                }
            })
        }
    });
}

const checkHeight = () => {
    const pageHeight = document.body.scrollHeight
    const leftMenu = document.querySelector('main .left-menu')


    window.addEventListener('scroll', () => {
        if (scrollY > 1000 && scrollY > pageHeight - 1400) {
            leftMenu.classList.remove('left-menu_active')
        } else {
            leftMenu.classList.add('left-menu_active')
        }
    })
}

const navMob = () => {
    const headerList = document.querySelector('.header__list')

    headerList.addEventListener('click', (e) => {
        if (e.target.closest('.header__link')) {
            e.preventDefault()
        }

    })
}


burger('header-mob__burger', 'header__close', 'header__inner', 'header__inner_active')
if (document.querySelector('.vacancies__inner')) {
    accordion('vacancies__inner', 'vacancies-block__item', 'vacancies-block__item_active')
}
if (document.querySelector('.design-tent-nav')) {
    tabs()
}
if (document.body.scrollWidth > 1230) {
    checkHeight()
}

if (document.body.scrollWidth < 1230) {
    navMob()
}
if (document.querySelector('.task-form__radios[data-radios-tabs="1"]') && document.querySelector('.task-form__radios[data-radios-tabs="2"]')) {
    tabTask();
}