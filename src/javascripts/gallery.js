import React, {Component, PropTypes} from 'react'
import PackeryComponent from './packery'
import ButtonBarComponent from './buttonBar'
import Images from './images'

const packeryOptions = {
  transitionDuration: '1s'
}

import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Gallery extends Component{

  constructor(props) {
    super(props);
    this.state = {
      visibleImages: Images,
      filterIndex: 0,
      filterOptions: ['All', 'Illustration', 'Animation', 'Design', 'Photo', 'Video']
    };
    this.setVisibleImages = this.setVisibleImages.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  setVisibleImages() {
    const currentFilter = this.state.filterOptions[this.state.filterIndex];
    const currentImages = Images.filter(function(child, index){
      return !!(currentFilter === 'All' || child.type === currentFilter)
    }.bind(this));
    this.setState({visibleImages: []}, function(){ this.setState({visibleImages: currentImages})});
  }

  setFilter() { 
    console.log('filtering', this);
    const newFilter = (this.state.filterIndex === 4 ? 0: this.state.filterIndex + 1);
    this.setState({filterIndex: newFilter}, this.setVisibleImages);
  }

  render() {
 
    const tiles = this.state.visibleImages.map(function(child, index){
      const generatedNumber = Math.floor(Math.random()*10+1);
      console.log(generatedNumber);
      const shape = (generatedNumber <= 7 ? 1 : generatedNumber <= 9 ? 2 : 3); 
      console.log('shape', shape);
      return (
          <div className={index+' grid-item-' + shape }>
          <img key={index} className={'image'} src={child.url} />
          </div>
          )
    });

    const currentFilter = this.state.filterOptions[this.state.filterIndex];

    return (
        <div className={'gallery-container'}>
        <ButtonBarComponent setFilter={this.setFilter} currentFilter={this.state.filterOptions[this.state.filterIndex]} />
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
