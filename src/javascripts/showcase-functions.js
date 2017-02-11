export function setItem(width, pieceIndex, dimensions) {
  console.log(width, pieceIndex, dimensions);
  console.log('testing');
  let itemHeight, itemWidth, numWidth, numHeight;
  if(dimensions){
    itemHeight = (width > 700) ? dimensions[pieceIndex][1] : "100%";
    itemWidth = (width > 700) ? dimensions[pieceIndex][0] : "100%";
    numWidth = itemWidth.replace(/[px]/gi, '');
    numHeight = itemHeight.replace(/[px]/gi, '');
    if ((numWidth > width) && ((numWidth - width ) > (numHeight - 600))){
      itemWidth = (width * 0.9) + "px";
      itemHeight = ((width * 0.9) / dimensions[pieceIndex][0] )*dimensions[pieceIndex][1] +"px";
    } else if (numHeight > 660) {
      itemHeight = "660px";
      itemWidth = (660 / dimensions[pieceIndex][1] ) * dimensions[pieceIndex][0] + "px";
    }   
  }   
  console.log(itemHeight);
  console.log(itemWidth);
  return {itemHeight: itemHeight, itemWidth: itemWidth};
}
