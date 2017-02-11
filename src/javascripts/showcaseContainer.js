import React, {Component, PropTypes} from 'react'
import Showcase from 'javascripts/showcase'
import {setItem} from './showcase-functions'

class ShowcaseContainer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const dimensions = this.props.images[showcaseNumber].dimensions;
    console.log(dimensions);
    const windowWidth = this.props.windowWidth;
    console.log(windowWidth);
    console.log(showcaseIndex);
    const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
    const iframeWidth = (this.props.windowWidth < 640) ? "100%" : "640px";
    const iframeHeight = (this.props.windowWidth < 650) ? (this.props.windowWidth/640)* 340+"px" : "340px";
    const {itemHeight,itemWidth} = setItem(windowWidth, showcaseIndex, dimensions);

    return (
        <Showcase {...this.props} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} iframeWidth={iframeWidth} iframeHeight={iframeHeight} itemHeight={itemHeight} itemWidth={itemWidth} />)   
  }
}

export default ShowcaseContainer
