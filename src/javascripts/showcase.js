import React, {Component, PropTypes} from 'react'
import ProgressiveImage from 'react-progressive-image'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import { Link } from 'react-router'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: null,
      dragStart: null,
      dragEnd: null,
      direction: null
    };
    this.hideDrag = this.hideDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.setDrag = this.setDrag.bind(this);
  }

  render() {
    const { showcaseNumber, showcaseIndex, iframeHeight, iframeWidth, itemHeight, itemWidth } = this.props;
    const showcaseItem = this.props.images[showcaseNumber];
    const thumbs = showcaseItem.thumbs;
    const slideshow = showcaseItem.slideshow;
    const slideShowLength = slideshow.length;
    const {xOffset, sliding, transition, setIndex, incrementIndex, decrementIndex} = this.props;
    const dragOn = (slideShowLength > 1) ? this.drag : undefined;
    return (
      <div>
        {(((showcaseItem.type !== "Animation")&&(showcaseItem.type !== "Video")) || (slideshow[0].indexOf('gif')>-1)) && 
            <ProgressiveImage src={slideshow[showcaseIndex]} placeholder={showcaseItem.sthumbs[showcaseIndex]}>
              {(image) => <img style={{height: itemHeight, width: itemWidth}} className={'showcase-image'} onTouchStart={dragOn} onTouchMove={dragOn} onTouchEnd={dragOn} src={image} />}
            </ProgressiveImage>}
          {(((showcaseItem.type === "Animation")||(showcaseItem.type === "Video"))&& (slideshow[0].indexOf('gif')===-1)) && <iframe src={slideshow[0]} height={iframeHeight} width={iframeWidth} frameBorder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>}
      </div>
      )
  }

  componentDidUpdate() {
    const showcaseImage = document.getElementsByClassName('showcase-image')[0];
    if (showcaseImage) {
      document.getElementsByClassName('showcase-image')[0].addEventListener('dragstart', this.hideDrag);
    }
  }

  componentWillUnmount() {
    document.getElementsByClassName('showcase-image')[0].removeEventListener('dragstart', this.hideDrag);
  }

  setDrag(){
    this.setState({direction: null, dragXStart: null, dragXNext: null});
  }

  drag(e) {
    const currentIndex = this.props.showcaseIndex;
    const length = this.props.images[this.props.showcaseNumber].slideshow.length;
    if(e.type === "touchstart"){
      console.log('start', e.touches[0].clientX);
      this.setState({dragStart: e.touches[0].clientX});
      console.log('state', this.state.dragStart);
    } else if (e.type === "touchmove"){
      var direction = (this.state.dragStart > this.state.dragEnd) ? "left" : "right";
console.log('move', e.touches[0].clientX);
console.log('direction', direction);
      this.setState({dragEnd: e.touches[0].clientX, direction: direction});
console.log('state', this.state.dragEnd);
    } else if (e.type === "touchend"){
      console.log('touchend', this.dragState > this.dragEnd, this.dragStart, this.dragEnd);
      if(Math.abs(this.state.dragStart - this.state.dragEnd) > 150){
      var updateIndex = (this.state.direction === "left") ? this.props.decrementIndex(currentIndex, length) : this.props.incrementIndex(currentIndex, length);
      }
     this.setState({direction: direction, dragStart: null, dragEnd: null});
    }
  }

  hideDrag(event) {
    if(this.props.params.piece){
      event.dataTransfer.effectAllowed = 'none';
      const image = this.props.images[this.props.showcaseNumber].slideshow[this.props.showcaseIndex]
        event.dataTransfer.setData("text/plain", event.target.id);
      var img = new Image(); 
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="; 
      event.dataTransfer.setDragImage(img, 100, 100);
    }
  }

}

export default Showcase
