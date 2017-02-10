import React, {Component, PropTypes} from 'react'
import Showcase from 'javascripts/showcase'

class ShowcaseContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showcaseNumber: 0,
      showcaseIndex: 0,
      iframeWidth: "",
      iframeHeight: "",
      itemHeight: "",
      itemWidth: ""
    }
    this.setShowcase = this.setShowcase.bind(this);
    this.setIframe = this.setIframe.bind(this);
    this.setItem = this.setItem.bind(this);
  }

  setShowcase() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const showcaseIndex =  (this.props.params.number) ? this.props.params.number - 1 : 0;
    return {showcaseNumber: showcaseNumber, showcaseIndex: showcaseIndex};
  }

  setIframe(width) {
    let iframeWidth = (width < 640) ? "100%" : "640px";
    let iframeHeight = (width < 650) ? (width/640)* 340+"px" : "340px";
    return {iframeWidth: iframeWidth, iframeHeight: iframeHeight};
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
 
  componentDidMount() {
    const windowWidth = this.props.windowWidth;
    const { showcaseNumber, showcaseIndex } = this.setShowcase();
    const { iframeWidth, iframeHeight } = this.setIframe(windowWidth);
    const { itemHeight, itemWidth } = this.setItem(windowWidth, showcaseNumber, showcaseIndex);
    this.setState({showcaseNumber: showcaseNumber, showcaseIndex: showcaseIndex, iframeWidth: iframeWidth, iframeHeight: iframeHeight, itemHeight: itemHeight, itemWidth: itemWidth});
  }

  render () {
    return (
        <Showcase {...this.props} {...this.state}/>)   
  }
}

export default ShowcaseContainer
