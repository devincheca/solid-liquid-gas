class ImagePathLookup {
  constructor() {
    this.index = 'https://sarahlynguillen.com/images/';
    this.digital = 'https://sarahlynguillen.com/digital/';
    this.trad = 'https://sarahlynguillen.com/images/';
  }

  get() {
    const [_, __, fileName] = location.href.split('/');
    if (!fileName) return this.index;
    const [path] = fileName.split('.html');
    return path ? this[path] : this.index;
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
  imageList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .map(({ fileName, isNewLine }) => {
      const { width } = current.row[current.index];
      const newBox = getBox({ width });
      if (!isNewLine) {
        newBox.appendChild(getImageElement(`${imagePath}${fileName}`));
        current.rowDiv.appendChild(newBox);
        current.index = current.index + 1;
      }
      appendAndReset();
    });
  toggleLoader();
};
getImages();
