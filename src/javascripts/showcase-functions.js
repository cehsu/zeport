export function setItem(width, pieceIndex, dimensions) {
  //if item has dimensions, resize height and width
  let itemHeight, itemWidth, numWidth, numHeight;
  const mobile = !(width > 700);
  const showcaseWidth = (mobile) ? width : (width * 0.9);
  const showcaseHeight = 600;
  if(dimensions){
    numHeight = dimensions[pieceIndex][1].replace(/[px]/gi, '');
    numWidth = dimensions[pieceIndex][0].replace(/[px]/gi, '');
    //resize wide items to showcase width
    if ((numWidth - showcaseWidth ) > (numHeight - showcaseHeight)){
      console.log('wide item is: ', dimensions, width);
      itemWidth = showcaseWidth + "px";
      itemHeight = (showcaseWidth/ numWidth)*numHeight +"px";
    //resize tall items to showcase height
    } else if (numHeight > showcaseHeight) {
      console.log('tall item is: ', dimensions, width);
      itemHeight = showcaseHeight + "px";
      itemWidth = (600 / numHeight ) * numWidth + "px";
    //resize short items to fit showcase width
    } else if ((600 - numHeight) > (showcaseWidth - numWidth)) {
      console.log('short item is: ', dimensions, width);
      itemWidth = showcaseWidth;
      itemHeight = (numWidth/showcaseWidth)*numHeight+"px";
    //resize narrow items to fit showcase height
    } else if ((600 - numHeight) < (showcaseWidth - numWidth)) {
      console.log('narrow item is: ', dimensions, width);
      itemHeight = '600px';
      itemWidth = (numHeight/600)*numWidth+"px";
    //format already appropriately dimensioned items
    } else {
      console.log('appropriate item is: ', dimensions, width);
      console.log('numHeight is: ', numHeight);
      itemHeight = numHeight+"px";
      itemWidth = numWidth + "px";
    }
  }   
  return {itemHeight: itemHeight, itemWidth: itemWidth};
}
