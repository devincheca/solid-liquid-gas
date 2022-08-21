const imagePath = 'https://sarahlynguillen.com/images/';
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
const getImages = async () => {
  const manifest = await fetch(`${imagePath}manifest.json`);
  const imageList = await manifest.json();
  const current = {
    row: getRowWidths(),
    index: 0,
    rowDiv: getNewRowDiv(),
  };
  const shuffledImageList = imageList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  if (screen.availWidth > 576) {
    shuffledImageList
      .map(({ fileName, isNewLine }) => {
        const { width } = current.row[current.index];
        const newBox = getBox({ width });
        const image = document.createElement('img');
        if (!isNewLine) {
          image.src = `${imagePath}${fileName}`;
          image.className = 'collage-img';
          newBox.appendChild(image);
          current.rowDiv.appendChild(newBox);
          current.index = current.index + 1;
        }
        if (current.index === current.row.length) {
          elem.appendChild(current.rowDiv);
          current.row = getRowWidths();
          current.index = 0;
          current.rowDiv = getNewRowDiv();
        }
      });
  } else {
    shuffledImageList
      .map(fileName => {
        const { width } = current.row[current.index];
        const newBox = getBox({ width });
        const image = document.createElement('img');
        image.src = `${imagePath}${fileName}`;
        image.className = 'collage-img';
        newBox.appendChild(image);
        current.rowDiv.appendChild(newBox);
        current.index = current.index + 1;
        elem.appendChild(current.rowDiv);
        current.row = getRowWidths();
        current.index = 0;
        current.rowDiv = getNewRowDiv();
      });
  }
  toggleLoader();
};
getImages();
