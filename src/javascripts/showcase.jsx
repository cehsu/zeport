import React, { Component, PropTypes } from 'react';
import ProgressiveImage from 'react-progressive-image';
import 'stylesheets/modules/showcase';
import 'stylesheets/utilities/clearfix';

class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: null,
      dragStart: null,
      dragEnd: null,
      direction: null,
    };
    this.hideDrag = this.hideDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.setDrag = this.setDrag.bind(this);
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

  setDrag() {
    this.setState({ direction: null, dragXStart: null, dragXNext: null });
  }

  drag(e) {
    const currentIndex = this.props.showcaseIndex;
    const length = this.props.images[this.props.showcaseNumber].slideshow.length;
    if (e.type === 'touchstart') {
      this.setState({ dragStart: e.touches[0].clientX });
    } else if (e.type === 'touchmove') {
      const direction = (this.state.dragStart > this.state.dragEnd) ? 'left' : 'right';
      this.setState({ dragEnd: e.touches[0].clientX, direction });
    } else if (e.type === 'touchend') {
      if (Math.abs(this.state.dragStart - this.state.dragEnd) > 150) {
        if (this.state.direction === 'left') {
          this.props.incrementIndex(currentIndex, length);
        } else {
          this.props.decrementIndex(currentIndex, length);
        }
      }
      this.setState({ direction: this.state.direction, dragStart: null, dragEnd: null });
    }
  }

  hideDrag(event) {
    if (this.props.params.piece) {
      event.dataTransfer.effectAllowed = 'none';
      event.dataTransfer.setData('text/plain', event.target.id);
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      event.dataTransfer.setDragImage(img, 100, 100);
    }
  }

  render() {
    const { showcaseNumber, showcaseIndex, iframeHeight, iframeWidth, itemHeight, itemWidth } = this.props;
    const showcaseItem = this.props.images[showcaseNumber];
    const slideshow = showcaseItem.slideshow;
    const slideShowLength = slideshow.length;
    const dragOn = (slideShowLength > 1) ? this.drag : undefined;
    return (
      <div>
        {(((showcaseItem.type !== 'Animation') && (showcaseItem.type !== 'Video')) || (slideshow[0].indexOf('gif') > -1)) &&
        <ProgressiveImage src={slideshow[showcaseIndex]} placeholder={showcaseItem.sthumbs[showcaseIndex]}>
          {(image) => <img style={{ height: itemHeight, width: itemWidth }} className={'showcase-image'} onTouchStart={dragOn} onTouchMove={dragOn} onTouchEnd={dragOn} src={image} />}
        </ProgressiveImage>}
        {(((showcaseItem.type === 'Animation') || (showcaseItem.type === 'Video')) && (slideshow[0].indexOf('gif') === -1)) && <iframe src={slideshow[0]} height={iframeHeight} width={iframeWidth} frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />}
      </div>
    );
  }
}

Showcase.propTypes = {
  iframeHeight: React.PropTypes.string.isRequired,
  iframeWidth: React.PropTypes.string.isRequired,
  itemHeight: React.PropTypes.string.isRequired,
  itemWidth: React.PropTypes.string.isRequired,
  incrementIndex: React.PropTypes.func.isRequired,
  decrementIndex: React.PropTypes.func.isRequired,
  showcaseIndex: React.PropTypes.number.isRequired,
  showcaseNumber: React.PropTypes.number.isRequired,
  images: React.PropTypes.array.isRequired,
  params: React.PropTypes.object,
};

export default Showcase;
