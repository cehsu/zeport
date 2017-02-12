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
    if (mobile){
      itemWidth = "100%";
      itemHeight = "auto";
    } else {
      if ((numWidth - showcaseWidth) > (numHeight - showcaseHeight)){
         numHeight = (showcaseWidth/numWidth)*numHeight;
         numWidth = showcaseWidth;
    //resize tall items to showcase height
    } if(numHeight > showcaseHeight) {
      numWidth = (600 / numHeight ) * numWidth;
      numHeight = showcaseHeight;
    //format already appropriately dimensioned items
    }
      itemHeight = numHeight+"px";
      itemWidth = numWidth + "px";
    }
  }   
    return {itemHeight: itemHeight, itemWidth: itemWidth};
}
