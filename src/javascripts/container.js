import React from 'react'
import Header from 'javascripts/header'
import Footer from 'javascripts/footer'
import Gallery from 'javascripts/gallery'
import Showcase from 'javascripts/showcase'
import ButtonBar from 'javascripts/buttonBar'
import Images from 'javascripts/images'
import 'stylesheets/modules/container'
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterIndex: 0,
      filterOptions: ['All', 'Illustration', 'Animation', 'Design', 'Film', 'Photo'],
      showcaseItem: false,
      showcaseIndex: 0
    } 
    this.setFilter = this.setFilter.bind(this);
    this.setShowcaseItem = this.setShowcaseItem.bind(this);
    this.setShowcaseIndex = this.setShowcaseIndex.bind(this);
  }

  setFilter() {
    const newFilter = (this.state.filterIndex === 4 ? 0 : this.state.filterIndex + 1);
    this.setState({filterIndex: newFilter});
  }

  setShowcaseItem(index) {
    console.log('settingShowcaseItem', index);
    this.setState({showcaseItem: index});
  }

  setShowcaseIndex(event) {
    console.log(event);
  }

  render () {
    const currentFilter = this.state.filterOptions[this.state.filterIndex];
    const visibleImages = Images.filter(function(image, index){
      return !!(currentFilter === 'All' || image.type === currentFilter)
    });

    return (
      <div className='container'>
        <Header setFilter={this.setFilter} filter={currentFilter} />
        <Showcase {...this.state} setIndex={this.setShowcaseIndex} images={visibleImages} />
        <Gallery setFilter={this.setFilter} setShowcaseItem={this.setShowcaseItem} filter={currentFilter} images={visibleImages} />
        <Footer />
      </div>
    )
  }
}

export default Container
