import React, {Component, PropTypes} from 'react'
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
   if(this.props.showcaseItem !== false){
     const showcaseItem = this.props.images[this.props.showcaseItem];
     const showcaseIndex = this.props.showcaseIndex;
     const setIndex = this.props.setIndex;
     const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
    return (
        <div>
          <img className={'showcase-image'} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDrag={this.drag} onDragEnd={this.setDrag} src={image} />
          <div>{this.props.images[this.props.showcaseItem].name}</div>
          <div>{showcaseItem.slideshow.map(function(item, index){ 
             const setInnerIndex = function() {
                  setIndex(index);
                  console.log('setting index');
                };

             return (
               <img key={index} onClick={setInnerIndex} className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
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

  setDrag(){
    this.setState({direction: null, dragXStart: null, dragXNext: null});
  }

  drag(event) {
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
          this.setState({direction: 'right'}, this.props.decrementIndex);
          } else if(this.state.dragXStart > this.state.dragXNext){
          this.setState({direction: 'left'}, this.props.incrementIndex);
        }
      });
      } else if (event.type === 'touchmove' && (this.state.dragXStart !== event.touches[0].clientX)){
      this.setState({dragXNext: event.touches[0].clientX}, function(){
        if(this.state.dragXStart < this.state.dragXNext){
          this.setState({direction: 'right'}, this.props.decrementIndex);
        } else if (this.state.dragXStart > this.state.dragXNext) {
          this.setState({direction: 'left'}, this.props.incrementIndex);
        }
        });
      }
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
