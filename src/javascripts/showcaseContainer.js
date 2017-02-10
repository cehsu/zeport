import React, {Component, PropTypes} from 'react'
import Showcase from 'javascripts/showcase'

class ShowcaseContainer extends React.Component {
  constructor(props){
    super(props);
    this.setItem = this.setItem.bind(this);
  }

  setItem(width, piece, pieceIndex) {
    let itemHeight, itemWidth, numWidth, numHeight;
    const showcaseItem = this.props.images[piece];
    const dimensions = showcaseItem.dimensions;
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
    return {itemHeight: itemHeight, itemWidth: itemWidth};
  }

  render() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
    const iframeWidth = (this.props.windowWidth < 640) ? "100%" : "640px";
    const iframeHeight = (this.props.windowWidth < 650) ? (this.props.windowWidth/640)* 340+"px" : "340px";
    const {itemHeight,itemWidth} = this.setItem(this.props.windowWidth, showcaseNumber, showcaseIndex);

    return (
        <Showcase {...this.props} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} iframeWidth={iframeWidth} iframeHeight={iframeHeight} itemHeight={itemHeight} itemWidth={itemWidth} />)   
  }
}

export default ShowcaseContainer
