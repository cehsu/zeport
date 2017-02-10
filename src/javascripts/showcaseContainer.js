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
  }

  componentDidMount() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
    const w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    let iframeWidth = (width < 640) ? "100%" : "640px";
    let iframeHeight = (width < 650) ? (width/640)* 340+"px" : "340px";
    let itemHeight, itemWidth, numWidth, numHeight;
    if(this.props.images[showcaseNumber].dimensions){
      itemHeight = (width > 700) ? showcaseItem.dimensions[showcaseIndex][1] : "100%";
      itemWidth = (width > 700) ? showcaseItem.dimensions[showcaseIndex][0] : "100%";
      numWidth = itemWidth.replace(/[px]/gi, '');
      numHeight = itemHeight.replace(/[px]/gi, '');
      if ((numWidth > width) && ((numWidth - width ) > (numHeight - 600))){
        itemWidth = (width * 0.9) + "px";
        itemHeight = ((width * 0.9) / showcaseItem.dimensions[showcaseIndex][0] )*showcaseItem.dimensions[showcaseIndex][1] +"px";
      } else if (numHeight > 660) {
        itemHeight = "660px";
        itemWidth = (660 / showcaseItem.dimensions[showcaseIndex][1] ) * showcaseItem.dimensions[showcaseIndex][0] + "px";
        console.log("tall", itemWidth, itemHeight);
      }
    }
    console.log('helo');
    console.log(showcaseNumber, showcaseIndex, iframeWidth, iframeHeight, itemHeight, itemWidth);
    this.setState({showcaseNumber: showcaseNumber, showcaseIndex: showcaseIndex, iframeWidth: iframeWidth, iframeHeight: iframeHeight, itemHeight: itemHeight, itemWidth: itemWidth});
  }

  render () {
    return (
        <Showcase {...this.props} {...this.state}/>)   
  }
}

export default ShowcaseContainer
