import React, {Component, PropTypes} from 'react'
import PackeryComponent from './packery'
import Images from './images'

const packeryOptions = {
  transitionDuration: '1s'
}

import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Gallery extends Component{

  constructor(props){
    super(props);
    this.state = {
      filter: false
    };
  }

  render() {
 
    const tiles = Images.filter(function(child, index){
      return !!(!this.state.filter||child.type === this.state.filter);
    }.bind(this)).sort(function(a, b){
      return a.year - b.year;
    }).map(function(child, index){
      return (
          <div className={'grid-item-'+Math.floor(Math.random()*3+1)}>
          <img key={index} className={'image'} src={child.url}/>
          </div>
          )
    })
 

    return (
        <div className={'gallery-container'}>
        <div className={'button touch'}>All</div>
        <div className={'button intersect'}>About</div>
        <div className={'button underline'}>Shop</div>
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
};
export default Gallery
