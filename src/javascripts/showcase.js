import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import Images from 'javascripts/images'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragXStart: null,
      dragXNext: null,
      direction: null,
      xOffset: -200,
      showcaseIndex: 0,
      sliding: false,
      transition: '0.5s',
      length: this.props.images[this.props.showcaseItem].slideshow.length
    };
    this.hideDrag = this.hideDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.setDrag = this.setDrag.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.decrementIndex = this.decrementIndex.bind(this);
  }

  render() {
    const showcaseItem = Images[this.props.params.piece];
     const showcaseIndex = this.state.showcaseIndex;
     const slideshow = showcaseItem.slideshow;
     const slideShowLength = slideshow.length;
     const setIndex = this.setIndex;
     const setFocus = this.setFocus;
       return (
        <div>
          <img className={'showcase-image'} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDrag={this.drag} onDragEnd={this.setDrag} src={slideshow[showcaseIndex]} />
          <div>{showcaseItem.name}</div>
          {slideShowLength < 5 && slideShowLength > 1 && <div className={'flex-container'}>
            <div>hello</div>
            {slideshow.map(function(item, index){
              return (
                <Link to={ {pathname: '/work', query: {piece: item.name+'_'+(index+1)}} }>
                  <img key={index} onClick={() => setFocus(index)} className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
                </Link>
              )
            })
            }

            </div> }
          {slideShowLength > 4 && <div className={'track-container'}>
          <div style={{transform: 'translate('+ this.state.xOffset+ 'px)', transition: this.state.transition}} className={'flex-container'} >
            <img onClick={() => this.setIndex((slideShowLength - 4), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={slideshow[slideShowLength - 4]} />
            <img onClick={() => this.setIndex((slideShowLength - 3), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={slideshow[slideShowLength - 3]} />
            <img onClick={() => this.setIndex((slideShowLength - 2), showcaseIndex, slideShowLength)} className={((slideShowLength - 2) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={slideshow[slideShowLength - 2]} />
            <img onClick={() => this.setIndex((slideShowLength - 1), showcaseIndex, slideShowLength)} className={((slideShowLength - 1) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={slideshow[slideShowLength - 1]} />

          {slideshow.map(function(item, sliderIndex){
             return (
               <img key={sliderIndex} onClick={() => setIndex(sliderIndex, showcaseIndex, slideShowLength)} className={(sliderIndex === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={item} />
              );
             }
          )}
           <img onClick={() => this.setIndex(0, showcaseIndex, slideShowLength)} className={(0 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={slideshow[0]} />
           <img onClick={() => this.setIndex(1, showcaseIndex, slideShowLength)} className={(1 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={slideshow[1]} />
           <img onClick={() => this.setIndex(2, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={slideshow[2]} />
           <img onClick={() => this.setIndex(3, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={slideshow[3]} />
          </div>
          </div>}
        </div>
        )
  }

  componentDidUpdate() {
    if(this.props.showcaseItem !== false){
    document.getElementsByClassName('showcase-image')[0].addEventListener('dragstart', this.hideDrag);
    }
   }

  componentWillUnmount() {
    document.getElementsByClassName('showcase-image')[0].removeEventListener('dragstart', this.hideDrag);
  }

  setFocus(newIndex) {
    this.setState({showcaseIndex: newIndex});
  }
  
  setIndex(newIndex, oldIndex) {
    const length = this.state.length;
    if (!this.state.sliding){
      this.setState({sliding: true});
      if((newIndex - oldIndex) > 3){
        const tx = this.state.xOffset + ((oldIndex + (length - newIndex))*100);
        this.setState({xOffset: tx, showcaseIndex: newIndex});
        if (this.state.xOffset > -300){
          setTimeout(
            function(){
              this.setState({transition: '0s', xOffset: this.state.xOffset - (length * 100)});
            }.bind(this), 550);
          setTimeout(
            function(){
              this.setState({transition: '0.5s', sliding: false});
            }.bind(this), 590);
       }
      } else if ((oldIndex - newIndex) > 3) {
         const tx = this.state.xOffset - ((newIndex + (length - oldIndex))*100);
         this.setState({xOffset: tx, showcaseIndex: newIndex});
         if (this.state.xOffset < -200){
           setTimeout(
             function(){
               this.setState({transition: '0s', xOffset: this.state.xOffset + (length * 100)});
             }.bind(this), 550);
           setTimeout(
             function(){
               this.setState({transition: '0.5s', sliding: false});
             }.bind(this), 590);
         }
      } else {
        const tx = this.state.xOffset + ((oldIndex  - newIndex)*100);
        this.setState({xOffset: tx, showcaseIndex: newIndex, sliding: false});
      }
    }
  }
 
  incrementIndex() {
    const newIndex = (this.state.showcaseIndex === this.state.length - 1) ? 0 : (this.state.showcaseIndex + 1)
    const oldIndex = this.state.showcaseIndex;
    this.setIndex(newIndex, oldIndex);
  }
  
  decrementIndex() {
    const newIndex = (this.state.showcaseIndex === 0) ? (this.state.length - 1) : (this.state.showcaseIndex - 1);
    const oldIndex = this.state.showcaseIndex;
    this.setIndex(newIndex, oldIndex);
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
          this.setState({direction: 'right'}, this.decrementIndex);
          } else if(this.state.dragXStart > this.state.dragXNext){
          this.setState({direction: 'left'}, this.incrementIndex);
        }
      });
      } else if (event.type === 'touchmove' && (this.state.dragXStart !== event.touches[0].clientX)){
      this.setState({dragXNext: event.touches[0].clientX}, function(){
        if(this.state.dragXStart < this.state.dragXNext){
          this.setState({direction: 'right'}, this.decrementIndex);
        } else if (this.state.dragXStart > this.state.dragXNext) {
          this.setState({direction: 'left'}, this.incrementIndex);
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