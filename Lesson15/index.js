initMenu();

function initMenu() {
    const navEl = document.querySelector('.nav'),
        navList = navEl.querySelector('.nav__list'),
        activeBorder = navList.querySelector('.nav__item-active'),
        links = navList.querySelectorAll('.nav__link'),
        navBurgerEl = document.querySelector('.nav__burger'),
        isWidthLess700 = window.matchMedia("(max-width: 700px)");

    if (isWidthLess700.matches) {
        navBurgerEl.addEventListener('click', toggleMenu);
    } else {
        setTimeout(() => setActiveLink( links[0] ), 600);

        for (let i=0; i<links.length; i++) {
            links[i].addEventListener('mouseenter', setHover);
            links[i].addEventListener('mouseleave', removeHover);
            links[i].addEventListener('focus', setHover);
            links[i].addEventListener('blur', removeHover);
        }
    }

    function toggleMenu() {
        navList.classList.toggle('nav__list--open');
        navEl.classList.toggle('nav--open');
    }

    function setHover( event ) {
        const link = event.target;

        setActiveBorderPosition( link );
    }

    function removeHover() {
        setActiveBorderPosition( navList.querySelector('.nav__link--active') );
    }

    function setActiveBorderPosition( link ) {
        const linkBox = link.getBoundingClientRect(),
            navListBox = navList.getBoundingClientRect();

        activeBorder.style.left = `${linkBox.left - navListBox.left}px`;
        activeBorder.style.transform = `scaleX(${linkBox.width})`;
    }

    function setActiveLink( link ) {
        for (let i=0; i<links.length; i++) {
            links[i].classList.remove('nav__link--active');
        }

        link.classList.add('nav__link--active');

        setActiveBorderPosition( link );
    }
}
