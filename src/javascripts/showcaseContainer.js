import React, {Component, PropTypes} from 'react'
import Showcase from 'javascripts/showcase'
import ShowcaseDetails from 'javascripts/showcaseDetails'
import {setItem} from './showcase-functions'

class ShowcaseContainer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const showcaseItem = this.props.images[showcaseNumber];
    const dimensions = showcaseItem.dimensions;
    const windowWidth = this.props.windowWidth;
    const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
    const iframeWidth = (windowWidth < 640) ? "100%" : "640px";
    const iframeHeight = (windowWidth < 650) ? (windowWidth/640)* 340+"px" : "340px";
    const {itemHeight,itemWidth} = setItem(windowWidth, showcaseIndex, dimensions);

    return (
        <div className={'showcase-container'}>
        <Showcase {...this.props} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} iframeWidth={iframeWidth} iframeHeight={iframeHeight} itemHeight={itemHeight} itemWidth={itemWidth} />
        <ShowcaseDetails showcaseItem={showcaseItem} />
        </div>)   
  }
}

export default ShowcaseContainer
