import React, { Component, PropTypes } from 'react';
import Showcase from 'javascripts/showcase';
import ShowcaseSlider from 'javascripts/showcaseSlider';
import ShowcaseDetails from 'javascripts/showcaseDetails';
import { setItem } from 'javascripts/showcase-functions';

class ShowcaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliding: false,
      transition: '0.5s',
    };
    this.setIndex = this.setIndex.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.decrementIndex = this.decrementIndex.bind(this);
  }

  setIndex(newIndex, oldIndex, length) {
    const mobile = (this.props.windowWidth < 700);
    const swingleft = (mobile) ? -500 : -300;
    if (!this.state.sliding) {
      this.setState({ sliding: true });
      if ((newIndex - oldIndex) > 2) {
        const tx = this.props.xOffset + ((oldIndex + (length - newIndex)) * 100);
        this.props.setOffset(tx);
        if (this.props.xOffset > swingleft) {
          setTimeout(() => {
            this.props.setOffset(this.props.xOffset - (length * 100)); this.setState({ transition: '0s' });
          }, 550);
          setTimeout(() => {
            this.setState({ transition: '0.5s', sliding: false });
          }, 590);
        }
      } else if ((oldIndex - newIndex) > 2) {
        const tx = this.props.xOffset - ((newIndex + (length - oldIndex)) * 100);
        this.props.setOffset(tx);
        if (this.props.xOffset < -200) {
          setTimeout(() => {
            this.props.setOffset(this.props.xOffset + (length * 100)); this.setState({ transition: '0s' });
          }, 550);
          setTimeout(() => {
            this.setState({ transition: '0.5s', sliding: false });
          }, 590);
        }
      } else {
        const tx = this.props.xOffset + ((oldIndex - newIndex) * 100);
        this.props.setOffset(tx); this.setState({ sliding: false });
      }
    }
    setTimeout(() => {
      this.props.router.push('work/' + this.props.params.piece + '/' + (newIndex + 1));
    }, 600);
  }

  incrementIndex(currentIndex, length) {
    const newIndex = (currentIndex === length - 1) ? 0 : (currentIndex + 1);
    const oldIndex = currentIndex;
    this.setIndex(newIndex, oldIndex, length);
  }

  decrementIndex(currentIndex, length) {
    const newIndex = (currentIndex === 0) ? (length - 1) : (currentIndex - 1);
    const oldIndex = currentIndex;
    this.setIndex(newIndex, oldIndex, length);
  }

  render() {
    const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
    const { xOffset, windowWidth } = this.props;
    const showcaseItem = this.props.images[showcaseNumber];
    const dimensions = showcaseItem.dimensions;
    const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
    const iframeWidth = (windowWidth < 640) ? '100%' : windowWidth * 0.9 + 'px';
    const iframeHeight = (windowWidth < 650) ? (windowWidth / 640) * 340 + 'px' : (windowWidth * 0.9) * (340 / 640) + 'px';
    const { itemHeight, itemWidth } = setItem(windowWidth, showcaseIndex, dimensions);
    const { setIndex, incrementIndex, decrementIndex } = this;

    return (
      <div className={'showcase-container'}>
        <Showcase {...this.props} {...this.state} setIndex={setIndex} incrementIndex={incrementIndex} decrementIndex={decrementIndex} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} iframeWidth={iframeWidth} iframeHeight={iframeHeight} itemHeight={itemHeight} itemWidth={itemWidth} />
        <ShowcaseSlider {...this.props} {...this.state} xOffset={xOffset} setIndex={setIndex} incrementIndex={incrementIndex} decrementIndex={decrementIndex} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} />
        <ShowcaseDetails showcaseItem={showcaseItem} />
      </div>
    );
  }
}

ShowcaseContainer.propTypes = {
  windowWidth: React.PropTypes.number.isRequired,
  xOffset: React.PropTypes.number.isRequired,
  setOffset: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
};

export default ShowcaseContainer;
