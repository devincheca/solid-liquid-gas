const generateFooter = () => {
  const navUl = document.getElementById('nav-ul');
  const closeNav = () => document.getElementById("overlay-input").click();
  const isOnPage = href => location.href.includes(href);
  const getOnClick = href => isOnPage(href) ? closeNav : () => null;
  const footerList = [{
    className: 'webtoon-icon',
    src: 'https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301',
    href: 'https://www.webtoons.com/en/creator/y9927',
  }, {
    className: 'fa fa-deviantart',
    href: 'https://www.deviantart.com/norikotanaka469/gallery/all',
  }, {
    className: 'fa fa-linkedin-square',
    href: '',
  }];
  Array.from(document.getElementsByClassName('external-icons'))
    .map(div => {
      footerList
        .map(({ className, href, src }) => {
          const img = document.createElement('img');
          const icon = document.createElement('i');
          if (src) {
            img.src = src;
            img.className = className;
          } else {
            icon.className = className;
          }
          const anchor = document.createElement('a');
          anchor.href = href;
          anchor.className = 'icon-anchor';
          anchor.appendChild(src ? img : icon);
          div.appendChild(anchor);
        });
    });
};
generateFooter();

