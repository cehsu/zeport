import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragXStart: null,
      dragXNext: null,
      direction: null,
      xOffset: -200 - (100*(this.props.params.number - 1)),
      showcaseIndex: ((this.props.params.number - 1) || 0),
      sliding: false,
      transition: '0.5s',
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
    const showcaseNumber = (this.props.params) ? this.props.piece : 0;
    const showcaseItem = (this.props.params) ? this.props.images[this.props.params.piece] : this.props.images[0];
    const thumbs = showcaseItem.thumbs;
    const showcaseIndex = (this.props.params) ? this.props.params.number - 1 : 0;
     const slideshow = showcaseItem.slideshow;
     const slideShowLength = slideshow.length;
     const setIndex = this.setIndex;
     const setFocus = this.setFocus;
       return (
        <div className={'showcase-container'} >
        {(((showcaseItem.type !== "Animation")&&(showcaseItem.type !== "Film")) || (slideshow[0].indexOf('gif')>-1)) && <img className={'showcase-image'} onTouchMove={this.drag} onTouchEnd={this.setDrag} onDrag={this.drag} onDragEnd={this.setDrag} src={slideshow[showcaseIndex]} />}
        {(((showcaseItem.type === "Animation")||(showcaseItem.type === "Film"))&& (slideshow[0].indexOf('gif')===-1)) && <iframe src={slideshow[0]} height='360' width='640' frameborder='0' webkitallowfullscreen mozillaallowfullscreen allowFullScreen></iframe>}
         {slideShowLength < 5 && slideShowLength > 1 && <div className={'flex-container'}>
            {thumbs.map(function(item, index){
              return (
                <Link key={index} to={ {pathname: '/work/'+showcaseNumber+'/'+(index+1)} }>
                  <img onClick={() => setFocus(index)} className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
                </Link>
              )
            })
            }

            </div> }
          {slideShowLength > 4 && <div className={'slider-container'}>
          <div onClick={()=>{this.decrementIndex(showcaseIndex, slideShowLength)}}  className={'arrow left'}></div>
            <div className={'track-container'}>
            <div style={{transform: 'translate('+ this.state.xOffset+ 'px)', transition: this.state.transition}} className={'track'} >
            <img onClick={() => this.setIndex((slideShowLength - 4), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 4]} />
            <img onClick={() => this.setIndex((slideShowLength - 3), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 3]} />
            <img onClick={() => this.setIndex((slideShowLength - 2), showcaseIndex, slideShowLength)} className={((slideShowLength - 2) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 2]} />
            <img onClick={() => this.setIndex((slideShowLength - 1), showcaseIndex, slideShowLength)} className={((slideShowLength - 1) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 1]} />

          {thumbs.map(function(item, sliderIndex){
             return (
               <img key={sliderIndex} onClick={() => setIndex(sliderIndex, showcaseIndex, slideShowLength)} className={(sliderIndex === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={item} />
              );
             }
          )}
           <img onClick={() => this.setIndex(0, showcaseIndex, slideShowLength)} className={(0 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[0]} />
           <img onClick={() => this.setIndex(1, showcaseIndex, slideShowLength)} className={(1 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[1]} />
           <img onClick={() => this.setIndex(2, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[2]} />
           <img onClick={() => this.setIndex(3, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[3]} />
          </div>
          </div>
          <div onClick={()=>{this.incrementIndex(showcaseIndex, slideShowLength)}} className={'arrow right'}></div>
          </div>}
          <div className={(((showcaseItem.type === 'Animation') || (showcaseItem.type === 'Film'))&&(slideshow[0].indexOf('gif')===-1)) ? 'item-details landscape' : 'item-details'}>
          {showcaseItem.name && <div className={'item-title'}>{showcaseItem.name}</div>}
          {showcaseItem.year && <div>{showcaseItem.year}</div>}
          {showcaseItem.materials && <div>{showcaseItem.materials}</div>}
          {showcaseItem.team && <div>{showcaseItem.team}</div>}
          {showcaseItem.description && <div>{showcaseItem.description}</div>}
          {showcaseItem.client && <div>{showcaseItem.client}</div>}
          </div>

        </div>
        )
  }

  componentDidUpdate() {
    if(this.props.showcaseItem !== false){
    document.getElementsByClassName('showcase-image')[0].addEventListener('dragstart', this.hideDrag);
    }
    return true;
   }

  componentWillUnmount() {
    document.getElementsByClassName('showcase-image')[0].removeEventListener('dragstart', this.hideDrag);
  }

  setFocus(newIndex) {
    this.setState({showcaseIndex: newIndex});
  }
  
  setIndex(newIndex, oldIndex, length) {
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
    setTimeout(function(){
      this.setState({showcaseIndex: newIndex});
      this.props.router.push('work/'+this.props.params.piece+'/'+(newIndex+1));
    }.bind(this),600);
  }
 
  incrementIndex(currentIndex, length) {
    const newIndex = (currentIndex === length - 1) ? 0 : (currentIndex + 1)
    const oldIndex = currentIndex;
    this.setIndex(newIndex, oldIndex, length);
  }
  
  decrementIndex(currentIndex, length) {
    const newIndex = (currentIndex  === 0) ? (length - 1) : (currentIndex - 1);
    const oldIndex = currentIndex;
    this.setIndex(newIndex, oldIndex, length);
  }

  setDrag(){
    this.setState({direction: null, dragXStart: null, dragXNext: null});
  }

  drag(event) {
    const currentIndex = this.props.params.number-1;
    const length = this.props.images[this.props.params.piece].slideshow.length;
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
          this.setState({direction: 'right'}, this.decrementIndex(currentIndex, length));
          } else if(this.state.dragXStart > this.state.dragXNext){
          this.setState({direction: 'left'}, this.incrementIndex(currentIndex, length));
        }
      });
      } else if (event.type === 'touchmove' && (this.state.dragXStart !== event.touches[0].clientX)){
      this.setState({dragXNext: event.touches[0].clientX}, function(){
        if(this.state.dragXStart < this.state.dragXNext){
          this.setState({direction: 'right'}, this.decrementIndex(currentIndex, length));
        } else if (this.state.dragXStart > this.state.dragXNext) {
          this.setState({direction: 'left'}, this.incrementIndex(currentIndex, length));
        }
        });
      }
    }
  }

  hideDrag(event) {
    if(this.props.showcaseItem !== false){
      event.dataTransfer.effectAllowed = 'none';
      const image = this.props.images[this.props.params.piece].slideshow[(this.props.params.number - 1)]
      event.dataTransfer.setData("text/plain", event.target.id);
      var img = new Image(); 
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="; 
      event.dataTransfer.setDragImage(img, 100, 100);
    }
  }
  
}

export default Showcase
