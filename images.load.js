class ImagePathLookup {
  index = 'https://sarahlynguillen.com/images/';
  digital = 'https://sarahlynguillen.com/digital/';
  trad = 'https://sarahlynguillen.com/images/';

  constructor() {}

  get() {
    const hrefArray = location.href.split('/');
    const fileName = location.href.includes('https')
      ? hrefArray[3]
      : hrefArray[8];
    if (!fileName) return this.digital;
    const [path] = fileName.split('.html');
    if (path === 'index') return this.digital;
    return path ? this[path] : this.digital;
  }
};
const imagePath = new ImagePathLookup().get();
const elem = document.querySelector('.grid');
const getRowSpan = () => {
  const betweenOneAndFive = Math.floor((Math.random() * 10) / 2);
  return betweenOneAndFive > 0 ? betweenOneAndFive : getRowSpan();
};
const getRowWidths = (arr = []) => {
  arr.push({ width: getRowSpan() });
  const colSum = arr.reduce((sum, { width }) => width + sum, 0);
  if (colSum === 5) return arr;
  if (colSum < 5) return arr.concat([{ width: 5 - colSum }]);
  if (colSum > 5) return arr.filter((_, i) => i <= arr.length);
};
const getBox = ({ width }) => {
  const box = document.createElement('div');
  box.className = `box-${width}`;
  return box;
};
const getNewRowDiv = () => {
  const row = document.createElement('div');
  row.className = 'grid-row';
  return row;
};
const toggleLoader = () => {
  const loader = document.getElementById('gallery-loader');
  loader.style.display = loader.style.display === 'none'
    ? 'block'
    : 'none';
};
const getImageElement = (src) => {
  const image = document.createElement('img');
  image.src = src;
  image.className = 'collage-img';
  return image;
}
const getImages = async () => {
  const manifest = await fetch(`${imagePath}manifest.json`);
  const imageList = await manifest.json();
  const current = {
    row: getRowWidths(),
    index: 0,
    rowDiv: getNewRowDiv(),
  };
  const resetCurrent = () => {
    current.row = getRowWidths();
    current.index = 0;
    current.rowDiv = getNewRowDiv();
  };
  const isDesktop = screen.availWidth > 576;
  const carriageReturn = () => {
    elem.appendChild(current.rowDiv);
    resetCurrent();
  };
  const appendAndReset = () => {
    if (isDesktop) {
      if (current.index === current.row.length) carriageReturn();
    } else carriageReturn();
  };
  const resumeDiv = document.getElementById('resume');
  if (resumeDiv) elem.appendChild(document.getElementById('resume'));
  imageList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .map(({ fileName, isNewLine }, i) => {
      const { width } = current.row[current.index];
      const newBox = getBox({ width });
      if (!isNewLine) {
        newBox.appendChild(getImageElement(`${imagePath}${fileName}`));
        current.rowDiv.appendChild(newBox);
        current.index = current.index + 1;
      }
      i === imageList.length - 1 ? carriageReturn() : appendAndReset();
    });
  toggleLoader();
};
getImages();
