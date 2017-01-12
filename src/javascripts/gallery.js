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
      const generatedNumber = Math.floor(Math.random()*10+1);
      const shape = (generatedNumber <= 7 ? 1 : generatedNumber <= 9 ? 2 : 3); 
      return (
          <Link to={ {pathname: '/work', query: {piece: image.name+'&&'+(index+1)}} } key={index} className={index+' grid-item-' + shape }>
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

  shouldComponentUpdate(nextProps, nextState){
    for(var prop in this.props){
      if (this.props[prop] !== nextProps[prop]){
        return false;
      }
    }
    return false;
  }
}

export default Gallery
