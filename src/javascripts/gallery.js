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
      visibleImages: Images,
      filterIndex: 0,
      filterOptions: ['All', 'Illustration', 'Animation', 'Photo', 'Video']
    };
    this.updateFilter = this.updateFilter.bind(this);
  }

  setVisibleImages = function(){
    const currentFilter = this.state.filterOptions[this.state.filterIndex];
    const currentImages = Images.filter(function(child, index){
      return !!(currentFilter === 'All' || child.type === currentFilter)
    }.bind(this)).sort(function(a, b){
      return a.year - b.year;
    });
    this.setState({visibleImages: currentImages});
  }

  updateFilter = function(){ 
    const newFilter = (this.state.filterIndex === 4 ? 0: this.state.filterIndex + 1);
    this.setState({filterIndex: newFilter}, this.setVisibleImages);
  }

  render() {
 
    const tiles = this.state.visibleImages.map(function(child, index){
      return (
          <div className={'grid-item-'+Math.floor(Math.random()*3+1)}>
          <img key={index} className={'image'} src={child.url} />
          </div>
          )
    });

    const currentFilter = this.state.filterOptions[this.state.filterIndex];

    return (
        <div className={'gallery-container'}>
        <div onClick={this.updateFilter} className={'button touch'}>{currentFilter}</div>
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
