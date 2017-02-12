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
      dragXStart: null,
      dragXNext: null,
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
    return (
      <div>
        {(((showcaseItem.type !== "Animation")&&(showcaseItem.type !== "Video")) || (slideshow[0].indexOf('gif')>-1)) && 
            <ProgressiveImage src={slideshow[showcaseIndex]} placeholder={showcaseItem.sthumbs[showcaseIndex]}>
              {(image) => <img style={{height: itemHeight, width: itemWidth}} className={'showcase-image'} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDrag={this.drag} onDragEnd={this.setDrag} src={image} />}
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

  drag(event) {
    const currentIndex = this.props.showcaseIndex;
    const length = this.props.images[this.props.showcaseNumber].slideshow.length;
    if(event.type === 'drag'){
    } else if (event.type === 'touch'){
    }
    if(this.state.dragXStart === null){
      if(event.type === 'drag'){
        this.setState({dragXStart: event.clientX});
      } else if (event.type === 'touchmove'){
        this.setState({dragXStart: event.touches[0].pageX});
      }
    } else if((this.state.dragXNext === null) && (this.state.dragXStart!==null)) {
      if (event.type === 'drag' && (this.state.dragXStart !== event.clientX)){
        this.setState({dragXNext: event.clientX}, function(){
          if(this.state.dragXStart < this.state.dragXNext){
            this.setState({direction: 'right'}, this.props.decrementIndex(currentIndex, length));
          } else if(this.state.dragXStart > this.state.dragXNext){
            this.setState({direction: 'left'}, this.props.incrementIndex(currentIndex, length));
          }
        });
      } else if (event.type === 'touchmove' && (this.state.dragXStart !== event.touches[0].clientX)){
        this.setState({dragXNext: event.touches[0].clientX}, function(){
          if(this.state.dragXStart < this.state.dragXNext){
            this.setState({direction: 'right'}, this.props.decrementIndex(currentIndex, length));
          } else if (this.state.dragXStart > this.state.dragXNext) {
            this.setState({direction: 'left'}, this.props.incrementIndex(currentIndex, length));
          }
        });
      }
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
