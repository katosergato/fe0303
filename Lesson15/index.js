initMenu();

function initMenu() {
    const navList = document.querySelector('.nav__list'),
        activeBorder = navList.querySelector('.nav__item-active'),
        links = navList.querySelectorAll('.nav__link');

    setTimeout(() => setActiveLink( links[0] ), 600);

    for (let i=0; i<links.length; i++) {
        links[i].addEventListener('mouseenter', setHover);
        links[i].addEventListener('mouseleave', removeHover);
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
