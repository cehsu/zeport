import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import PackeryComponent from './packery'
import ShowcaseComponent from './showcase'

const packeryOptions = {
  transitionDuration: '1s'
}

import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tiles = this.props.images.map(function(image, index){
      //const generatedNumber = Math.floor(Math.random()*10+1);
      //const shape = (generatedNumber <= 7 ? 1 : generatedNumber <= 9 ? 2 : 3); 
      return (
          <Link to={ {pathname: '/work/'+index+'/1'} } key={index} className={`${index} grid-item-${image.shape} brick`}>
         <div className={'details'}>
          <div className={'title-detail'}>{image.name}</div>
          <div className={'type-detail'}>{image.type}</div>
          </div>
          <img onClick={this.props.setShowcaseItem.bind(this, index)} className={'image'} src={image.url} />  
          </Link>
          )
    }.bind(this));

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
        )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisImages = Object.getOwnPropertyNames(this.props.images);
    const nextImages = Object.getOwnPropertyNames(nextProps.images);
    if (thisImages.length !== nextImages.length) {
      console.log('images changed');
      return true;
    }
    for (var i = 0; i < thisImages.length; i++) {
      const imageName = thisImages[i];
      if (this.props.images[imageName] !== nextProps.images[imageName]) {
        console.log('images changed');
        return true;
      }
    }
    console.log('images unchanged');
    return false;
  }

}

export default Gallery
