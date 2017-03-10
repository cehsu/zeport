import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import 'stylesheets/modules/showcase';
import 'stylesheets/utilities/clearfix';

const ShowcaseSlider = (props) => {
  const { xOffset, transition, showcaseNumber, showcaseIndex, setIndex, incrementIndex, decrementIndex } = props;
  const showcaseItem = props.images[showcaseNumber];
  const thumbs = showcaseItem.thumbs;
  const slideshow = showcaseItem.slideshow;
  const slideShowLength = slideshow.length;
  return (
    <div>
      {slideShowLength < 5 && slideShowLength > 1 && <div className={'flex-container'}>
        {thumbs.map((item, index) => {
          return (
            <Link key={index} to={{ pathname: '/work/' + (showcaseNumber - 1) + '/' + (index + 1) }}>
              <img className={(index === showcaseIndex) ? 'focus' : 'non-focus'} src={item} />
            </Link>
          )})
        }
      </div> }
      {slideShowLength > 4 && <div className={'slider-container'}>
        <div onClick={() => decrementIndex(showcaseIndex, slideShowLength)} className={'arrow left'} />
        <div className={'track-container'}>
          <div style={{ transform: 'translate(' + xOffset + 'px)', transition: transition }} className={'track'} >
            <img onClick={() => setIndex((slideShowLength - 4), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 4]} />
            <img onClick={() => setIndex((slideShowLength - 3), showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[slideShowLength - 3]} />
            <img onClick={() => setIndex((slideShowLength - 2), showcaseIndex, slideShowLength)} className={((slideShowLength - 2) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 2]} />
            <img onClick={() => setIndex((slideShowLength - 1), showcaseIndex, slideShowLength)} className={((slideShowLength - 1) === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[slideShowLength - 1]} />
              {thumbs.map((item, sliderIndex) => {
                return (
                  <img key={sliderIndex} onClick={() => setIndex(sliderIndex, showcaseIndex, slideShowLength)} className={(sliderIndex === showcaseIndex) ? 'slider-item focus' : 'slider-item non-focus'} src={item} />
                );
              })}
            <img onClick={() => setIndex(0, showcaseIndex, slideShowLength)} className={(showcaseIndex === 0) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[0]} />
            <img onClick={() => setIndex(1, showcaseIndex, slideShowLength)} className={(showcaseIndex === 1) ? 'slider-item focus' : 'slider-item non-focus'} src={thumbs[1]} />
            <img onClick={() => setIndex(2, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[2]} />
            <img onClick={() => setIndex(3, showcaseIndex, slideShowLength)} className={'slider-item non-focus'} src={thumbs[3]} />
          </div>
        </div>
        <div onClick={() => incrementIndex(showcaseIndex, slideShowLength)} className={'arrow right'} />
      </div>}
    </div>
  );
};

ShowcaseSlider.propTypes = {
  xOffset: React.PropTypes.number.isRequired,
  transition: React.PropTypes.string.isRequired,
  showcaseNumber: React.PropTypes.number.isRequired,
  showcaseIndex: React.PropTypes.number.isRequired,
  setIndex: React.PropTypes.func.isRequired,
  incrementIndex: React.PropTypes.func.isRequired,
  decrementIndex: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
};

export default ShowcaseSlider;
