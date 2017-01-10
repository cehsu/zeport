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
      showcaseIndex: 0,
    } 
    this.setFilter = this.setFilter.bind(this);
    this.setShowcaseItem = this.setShowcaseItem.bind(this);
    this.setShowcaseIndex = this.setShowcaseIndex.bind(this);
    this.incrementShowcaseIndex = this.incrementShowcaseIndex.bind(this);
    this.decrementShowcaseIndex = this.decrementShowcaseIndex.bind(this);
  }

  setFilter() {
    const newFilter = (this.state.filterIndex === 4 ? 0 : this.state.filterIndex + 1);
    this.setState({filterIndex: newFilter});
  }

  setShowcaseItem(index) {
    this.setState({showcaseItem: index, showcaseIndex: 0});
  }

  setShowcaseIndex(index) {
    this.setState({showcaseIndex: index});
  }

  incrementShowcaseIndex() {
    const showcaseIndex = this.state.showcaseIndex;
    const slideshowLength = Images[this.state.showcaseItem].slideshow.length;
    const newShowcaseIndex = (showcaseIndex === (slideshowLength - 1)) ? 0 : showcaseIndex + 1;
    this.setState({showcaseIndex: newShowcaseIndex});
  }
  
  decrementShowcaseIndex() {
    const showcaseIndex = this.state.showcaseIndex;
    const slideshowLength = Images[this.state.showcaseItem].slideshow.length;
    const newShowcaseIndex = (showcaseIndex === 0) ? slideshowLength - 1 : showcaseIndex - 1;
    this.setState({showcaseIndex: newShowcaseIndex});
  }

  render () {
    const currentFilter = this.state.filterOptions[this.state.filterIndex];
    const visibleImages = Images.filter(function(image, index){
      return !!(currentFilter === 'All' || image.type === currentFilter)
    });

    return (
      <div className='container'>
        <Header setFilter={this.setFilter} filter={currentFilter} />
      {this.state.showcaseItem !== false &&   <Showcase {...this.state} setIndex={this.setShowcaseIndex} incrementIndex={this.incrementShowcaseIndex} decrementIndex={this.decrementShowcaseIndex} images={visibleImages} />}
        <Gallery setFilter={this.setFilter} setShowcaseItem={this.setShowcaseItem} filter={currentFilter} images={visibleImages} />
        <Footer />
      </div>
    )
  }
}

export default Container
