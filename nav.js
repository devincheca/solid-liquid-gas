/*
<!-- using the first hit here for the navigation -->
<!-- https://1stwebdesigner.com/pure-css-navigation-menus/ -->
*/
const generateNav = () => {
  const navUl = document.getElementById('nav-ul');
  const closeNav = () => document.getElementById("overlay-input").click();
  const isOnPage = href => location.href.includes(href);
  const getOnClick = href => isOnPage(href) ? closeNav : () => null;
  const navLis = [{
    name: 'Home',
    href: 'index.html',
  }, /*{
    name: 'About Me',
    href: 'about.html',
  }, */{
    name: 'Digital Portfolio',
    href: 'digital.html',
  }, {
    name: 'Traditional Portfolio',
    href: 'trad.html',
  }, {
    name: 'A Lost Connection',
    href: 'https://alostconnection.sarahlynguillen.com/',
  }];
  navLis.map(({ name, href }) => {
    const navLi = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = isOnPage(href) ? '#' : href;
    anchor.innerHTML = name;
    anchor.onclick = getOnClick(href);
    navLi.appendChild(anchor);
    navUl.appendChild(navLi);
  });
};
generateNav();

