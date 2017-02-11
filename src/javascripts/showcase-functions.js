export function setItem(width, pieceIndex, dimensions) {
  //if item has dimensions, resize height and width
  let itemHeight, itemWidth, numWidth, numHeight;
  const mobile = !(width > 700);
  const showcaseWidth = (width * 0.9);
  const showcaseHeight = 600;
  if(dimensions){
    numHeight = dimensions[pieceIndex][1].replace(/[px]/gi, '');
    numWidth = dimensions[pieceIndex][0].replace(/[px]/gi, '');
    //resize wide items and mobile items to showcase width
    if (mobile || ((numWidth - showcaseWidth ) > (numHeight - showcaseHeight))){
      itemWidth = (mobile) ? "100%" : showcaseWidth + "px";
      itemHeight = (showcaseWidth/numWidth)*numHeight +"px";
    //resize tall items to showcase height
    } else if (numHeight > showcaseHeight) {
      itemHeight = showcaseHeight + "px";
      itemWidth = (600 / numHeight ) * numWidth + "px";
    //format already appropriately dimensioned items
    } else {
      itemHeight = numHeight+"px";
      itemWidth = numWidth + "px";
    }
  }   
  return {itemHeight: itemHeight, itemWidth: itemWidth};
}
