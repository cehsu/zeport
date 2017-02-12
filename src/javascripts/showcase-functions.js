export function setItem(width, pieceIndex, dimensions) {
  //if item has dimensions, resize height and width
  let itemHeight, itemWidth, numWidth, numHeight;
  const mobile = !(width > 700);
  const showcaseWidth = (width * 0.9);
  const showcaseHeight = 600;
  const limitDiff = (showcaseWidth - showcaseHeight);
  if(dimensions){
    console.log('it begins');
    console.log(dimensions[pieceIndex]);
    console.log(mobile, 'mobile');
    numHeight = dimensions[pieceIndex][1].replace(/[px]/gi, '');
    numWidth = dimensions[pieceIndex][0].replace(/[px]/gi, '');
    console.log(numWidth - showcaseWidth, 'widthdiff');
    console.log(numHeight - showcaseHeight, 'heightdiff');
    //resize wide items and mobile items to showcase width
    if (mobile){
      console.log('in mobile');
      itemWidth = "100%";
      itemHeight = "auto";
    } else {
      console.log('in not mobile');
      if ((numWidth -( showcaseWidth + limitDiff )) > (numHeight - showcaseHeight)){
         console.log('toowide', numWidth, numHeight); 
         numHeight = (showcaseWidth/numWidth)*numHeight;
         numWidth = showcaseWidth;
         console.log(numWidth, numHeight);  
    //resize tall items to showcase height
    } if(numHeight > showcaseHeight) {
      console.log('in too tall');
      console.log(numWidth, numHeight); 
      numWidth = (600 / numHeight ) * numWidth;
      numHeight = showcaseHeight;
    //format already appropriately dimensioned items
    }
      console.log('format non mobile');
      itemHeight = numHeight+"px";
      itemWidth = numWidth + "px";
    }
  }   
    console.log('it ends');
    console.log(itemWidth, itemHeight);
    return {itemHeight: itemHeight, itemWidth: itemWidth};
}
