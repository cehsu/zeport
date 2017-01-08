import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragXStart: null,
      dragXNext: null,
      direction: null,
      wait: false,
      drag: false
    };
    this.hideDrag = this.hideDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.setDrag = this.setDrag.bind(this);
    this.start = this.start.bind(this);
  }

  render() {
   if(this.props.showcaseItem !== false){
     const showcaseItem = this.props.images[this.props.showcaseItem];
     const showcaseIndex = this.props.showcaseIndex;
     const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
    return (
        <div>
          <img className={'showcase-image'} onTouchStart={this.start} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDragStart={this.start} onDrag={this.drag} onDragEnd={this.setDrag} src={image} />
          <div>{this.props.images[this.props.showcaseItem].name}</div>
          <div>{showcaseItem.slideshow.map(function(item, index){
             return (
                 <img key={index} className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
                 );
          })}
          </div>
        </div>
        )
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    if(this.props.showcaseItem !== false){
    document.getElementsByClassName('showcase-image')[0].addEventListener('dragstart', this.hideDrag);
    }
   }

  componentWillUnmount() {
    document.getElementsByClassName('showcase-image')[0].removeEventListener('dragstart', this.hideDrag);
  }

  start() {
    this.setState({drag: true});
  } 

  setDrag(){
    this.setState({direction: null, drag: false, dragXStart: null, dragXNext: null});
  }

  drag(event) {
    if(this.state.dragXStart === null){
      console.log('setting startX', event.clientX);
      this.setState({dragXStart: event.clientX});
    } else if((this.state.dragXNext === null) && (event.clientX !== this.state.dragXStart)&&(this.state.dragXStart!==null)) {
      console.log('setting nextX', event.clientX);
      this.setState({dragXNext: event.clientX}, function(){
        if(this.state.dragXStart < this.state.dragXNext){
          this.setState({direction: 'right'}, this.props.decrementIndex);
          } else if(this.state.dragXStart > this.state.dragXNext){
          this.setState({direction: 'left'}, this.props.incrementIndex);
        }
      });
    }
    console.log('dragging', event.clientX);
  }

  hideDrag(event) {
    if(this.props.showcaseItem !== false){
      event.dataTransfer.effectAllowed = 'none';
      const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
      event.dataTransfer.setData("text/plain", event.target.id);
      var img = new Image(); 
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="; 
      event.dataTransfer.setDragImage(img, 100, 100);
    }
  }


}

export default Showcase
