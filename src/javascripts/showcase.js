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
     const slideShowLength = this.props.images[this.props.showcaseItem].slideshow.length;
     const setIndex = this.props.setIndex;
     const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
    return (
        <div>
          <img className={'showcase-image'} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDrag={this.drag} onDragEnd={this.setDrag} src={image} />
          <div>{this.props.images[this.props.showcaseItem].name}</div>
          <div className={'flex-container'} >{showcaseItem.slideshow.map(function(item, sliderIndex){
           console.log(item, sliderIndex); 
             const setInnerIndex = function() {
               console.log('setting inner index');
               //remove first element
               document.getElementsByClassName('first')[0].classList.add('outgoing');
               //for two steps do the same at twice speed add visible class to 6th element, set timeout to 7th and 2nd (also need to make neg one and neg two elements for right spin)
               
               //transition everyone else  
               const things = document.getElementsByClassName('slider-item');
               for(var props in things){
                 if(props >= 0){
                   console.log('props num', props, things[props]);
                 }
               } 
               //set new index
               //document.getElementsByClassName('outgoing')[0].remove();
               setTimeout(function(){setIndex(sliderIndex);}.bind(this),500);
                };
             const getClass = function() {
            console.log('starting getclass', sliderIndex, showcaseIndex, slideShowLength);
               if (((showcaseIndex - 2) >= 0) && (sliderIndex === (showcaseIndex - 2))){
                 console.log(sliderIndex, showcaseIndex, 0);
                 return 'first'; 
               } else if ((showcaseIndex === 1) && (sliderIndex === (slideShowLength - 1))){
                 console.log(sliderIndex, showcaseIndex, 0);
                 return 'first';
               } else if ((showcaseIndex === 0) && (sliderIndex === (slideShowLength - 2))){
                 console.log(sliderIndex, showcaseIndex, 0);
                 return 'first';
               } else if ((((showcaseIndex - 1) >= 0) && (sliderIndex === (showcaseIndex - 1))) || ((showcaseIndex === 0) && (sliderIndex === (slideShowLength - 1)))){
                 console.log(sliderIndex, showcaseIndex, 1);
                 return 'second';
               } else if (sliderIndex === showcaseIndex) {
                 console.log(sliderIndex, showcaseIndex, 2);
                 return 'third';
               } else if (((showcaseIndex + 1) < slideShowLength) && (sliderIndex === (showcaseIndex + 1))){
                 console.log(sliderIndex, showcaseIndex, 3);
                 return 'fourth';
               } else if ((showcaseIndex === (slideShowLength - 1))&& (sliderIndex === 0)){
                 console.log(sliderIndex, showcaseIndex, 3);
                 return 'fourth';
                } else if (((showcaseIndex + 2) < slideShowLength) && (sliderIndex === (showcaseIndex + 2))){
                  console.log(sliderIndex, showcaseIndex, 4);
                  return 'fifth';
               } else if ((showcaseIndex === (slideShowLength - 1)) && (sliderIndex === 1)){
                 console.log(sliderIndex, showcaseIndex, 4);
                 return 'fifth';
               } else if ((showcaseIndex === (slideShowLength - 2)) && (sliderIndex === 0)) {
                 console.log(sliderIndex, showcaseIndex, 4);
                 return 'fifth';
               }
             };
             if(getClass()){
             return (
               <img key={sliderIndex} onClick={setInnerIndex} className={(sliderIndex === showcaseIndex) ? 'slider-item focus '+getClass() + ' slider-key-' + sliderIndex : 'slider-item non-focus '+getClass()+' slider-key-'+sliderIndex} src={item} />
              );
             }
             return false;
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
