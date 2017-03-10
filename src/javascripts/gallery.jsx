import React, { Component, PropTypes } from 'react';
import ProgressiveImage from 'react-progressive-image';
import { Link } from 'react-router';
import PackeryComponent from './packery';
import 'stylesheets/modules/gallery';
import 'stylesheets/utilities/clearfix';

const packeryOptions = {
  transitionDuration: '1s',
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  
  shouldComponentUpdate(nextProps) {
    const thisImages = Object.getOwnPropertyNames(this.props.images);
    const nextImages = Object.getOwnPropertyNames(nextProps.images);
    if (thisImages.length !== nextImages.length) {
      return true;
    }
    for (let i = 0; i < thisImages.length; i += 1) {
      const imageName = thisImages[i];
      if (this.props.images[imageName] !== nextProps.images[imageName]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const tiles = this.props.images.map((image, index) => (
      (
        <Link onClick={() => this.props.setOffset((this.props.windowWidth < 700) ? -400 : -200) } to={{ pathname: '/work/'+index+'/1' }} key={index} className={`${index} grid-item-${image.shape} brick`}>
          <div className={'details'}>
            <div className={'details-container'}>
              <div className={'title-detail'}>{image.name}</div>
              <div className={'type-detail'}>{image.type}</div>
            </div>
          </div>
          <ProgressiveImage src={image.brick} placeholder={image.bthumb}>
            {(image) => <img className={'image'} src={image} />}
          </ProgressiveImage>
        </Link>
      )
    ));

    return (
      <div className={'gallery-container'}>
        <PackeryComponent
          ref="PackeryComponent"
          className={'packery'}
          element={'ul'}
          options={packeryOptions}
          disableImagesLoaded={false}
        >
          {tiles}
        </PackeryComponent>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: React.PropTypes.array.isRequired,
  setOffset: React.PropTypes.func.isRequired,
  windowWidth: React.PropTypes.number.isRequired,
};

export default Gallery;
