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
      filter: 'All',
      showcaseItem: false,
      showcaseIndex: 0,
    } 
    this.setFilter = this.setFilter.bind(this);
    this.setShowcaseItem = this.setShowcaseItem.bind(this);
    this.setShowcaseIndex = this.setShowcaseIndex.bind(this);
  }

  setFilter(newFilter) {
    console.log('setting filter');
    this.setState({filter: newFilter});
  }

  setShowcaseItem(index) {
    this.setState({showcaseItem: index, showcaseIndex: 0});
  }

  setShowcaseIndex(index) {
    this.setState({showcaseIndex: index});
  }

  render () {
    const currentFilter = this.state.filter;
    const visibleImages = Images.filter(function(image, index){
      return !!((currentFilter === 'All' && image.type !== "About") || image.type === currentFilter)
    });

    return (
      <div className='container'>
        <Header params={this.props.params} setFilter={this.setFilter} filter={currentFilter} />
      {(this.props.params.piece||(this.props.params.route === "about")) &&   <Showcase params={this.props.params} {...this.state} setIndex={this.setShowcaseIndex} images={visibleImages} />}
        <Gallery params={this.props.params} setFilter={this.setFilter} setShowcaseItem={this.setShowcaseItem} filter={currentFilter} images={visibleImages} />
        <Footer />
      </div>
    )
  }
}

export default Container
