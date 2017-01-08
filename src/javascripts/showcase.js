import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragX: null,
      wait: false,
      drag: false
    };
    this.hideDrag = this.hideDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.throttle = this.throttle.bind(this);
    this.patientIncrement = this.patientIncrement.bind(this);
    this.setDrag = this.setDrag.bind(this);
    this.start = this.start.bind(this);
  }

  render() {
   if(this.props.showcaseItem !== false){
    const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
    return (
        <div>
          <img className={'showcase-image'} onDragStart={this.start} onDrag={this.drag} onDragEnd={this.setDrag} src={image} />
          <div>{this.props.images[this.props.showcaseItem].name}</div>
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
    console.log('starting drag');
    this.setState({drag: true});
  } 

  throttle(callback, event) {
    console.log('throttling', 'context', this);
    return function() {
      console.log('inside wait', this.state.wait, callback, event);
      if(!this.state.wait) {
        console.log('dragging event');
        callback(event);
        this.setState({wait: true});
        setTimeout(function(){if(!this.state.drag){console.log('unwaiting'); this.setState({wait: false})}}.bind(this), 500);
      }
    }.bind(this);
  }
  
  setDrag(){
    console.log('ending drag');
    this.setState({drag: false, dragX: null});
  }

  patientIncrement(event) {
    const setIndex = function(indexEvent) {
    (indexEvent.clientX < this.state.dragX) ? this.props.incrementIndex() : this.props.decrementIndex();
    return this.setState({dragX: null});  
    }
    const func = this.throttle(setIndex.bind(this), event);
    return func();
  }

  drag(event) {
    console.log('draggin', 'context', this);
    if(this.state.dragX === null){
      this.setState({dragX: event.clientX});
    } else {
      console.log('incrementing/decrementing');
      this.patientIncrement(event);
      this.setDrag();
    }
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
