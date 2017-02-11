import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { xOffset, transition, showcaseNumber, showcaseIndex, setIndex, incrementIndex, decrementIndex} = this.props;
    const showcaseItem = this.props.images[showcaseNumber];
    const thumbs = showcaseItem.thumbs;
    const slideshow = showcaseItem.slideshow;
    const slideShowLength = slideshow.length;
    return (
        <div>
        {slideShowLength < 5 && slideShowLength > 1 && <div className={'flex-container'}>
          {thumbs.map(function(item, index){
            return (
              <Link key={index} to={ {pathname: '/work/'+(showcaseNumber-1)+'/'+(index+1)} }>
                <img onClick={() => setFocus(index)} className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
              </Link>
            )})
          }
        </div> }
        {slideShowLength > 4 && <div className={'slider-container'}>
          <div onClick={()=>{decrementIndex(showcaseIndex, slideShowLength)}}  className={'arrow left'}></div>
          <div className={'track-container'}>
            <div style={{transform: 'translate('+ xOffset + 'px)', transition: transition}} className={'track'} >
              <img onClick={() => setIndex((slideShowLength - 4), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 4]} />
              <img onClick={() => setIndex((slideShowLength - 3), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 3]} />
              <img onClick={() => setIndex((slideShowLength - 2), showcaseIndex, slideShowLength)} className={((slideShowLength - 2) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 2]} />
              <img onClick={() => setIndex((slideShowLength - 1), showcaseIndex, slideShowLength)} className={((slideShowLength - 1) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 1]} />

              {thumbs.map(function(item, sliderIndex){
                return (
                  <img key={sliderIndex} onClick={() => setIndex(sliderIndex, showcaseIndex, slideShowLength)} className={(sliderIndex === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={item} />
                )})
              }
              <img onClick={() => setIndex(0, showcaseIndex, slideShowLength)} className={(0 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[0]} />
              <img onClick={() => setIndex(1, showcaseIndex, slideShowLength)} className={(1 === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[1]} />
              <img onClick={() => setIndex(2, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[2]} />
              <img onClick={() => setIndex(3, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[3]} />
            </div>
          </div>
          <div onClick={()=>{incrementIndex(showcaseIndex, slideShowLength)}} className={'arrow right'}></div>
          </div>}
        </div>
        )
  }

}

export default Showcase
