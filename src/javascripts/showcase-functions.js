export function setItem(width, pieceIndex, dimensions) {
  //  if item has dimensions, resize height and width
  let itemHeight;
  let itemWidth;
  let numWidth;
  let numHeight;
  const mobile = !(width > 700);
  const showcaseWidth = (width * 0.9);
  const showcaseHeight = 600;
  if (dimensions) {
    numHeight = dimensions[pieceIndex][1].replace(/[px]/gi, '');
    numWidth = dimensions[pieceIndex][0].replace(/[px]/gi, '');
    //  resize wide items and mobile items to showcase width
    if (mobile) {
      itemWidth = '100%';
      itemHeight = 'auto';
    } else {
      if (numWidth - showcaseWidth) {
        numHeight *= (showcaseWidth / numWidth);
        numWidth = showcaseWidth;
      //  resize tall items to showcase height
      }
      if (numHeight > showcaseHeight) {
        numWidth *= (600 / numHeight);
        numHeight = showcaseHeight;
      //  format already appropriately dimensioned items
      }
      itemHeight = numHeight + 'px';
      itemWidth = numWidth + 'px';
    }
  }
  return { itemHeight, itemWidth };
}
