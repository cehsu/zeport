import React from 'react'
import Header from 'javascripts/header'
import Footer from 'javascripts/footer'
import Gallery from 'javascripts/gallery'
//import Showcase from 'javascripts/showcase'
import ShowcaseContainer from 'javascripts/showcaseContainer'
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
      windowWidth: 0
    } 
    this.setFilter = this.setFilter.bind(this);
    this.setShowcaseItem = this.setShowcaseItem.bind(this);
    this.setShowcaseIndex = this.setShowcaseIndex.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  setFilter(newFilter) {
    this.setState({filter: newFilter});
  }

  setShowcaseItem(index) {
    this.setState({showcaseItem: index, showcaseIndex: 0});
  }

  setShowcaseIndex(index) {
    this.setState({showcaseIndex: index});
  }

  updateDimensions() {
    var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    s = screen,
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth || s.width;
    this.setState({windowWidth: width});
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render () {
    const currentFilter = this.state.filter;
    const visibleImages = [];
    Images.forEach(function(image, index){
      if ((currentFilter === 'All' && image.type !== "About") || image.type === currentFilter) {
        visibleImages[index-1] = image;
      }
    });

    return (
        <div className='container'>
        <Header windowWidth={this.state.windowWidth} params={this.props.params} setShowcaseItem={this.setShowcaseItem} setFilter={this.setFilter} filter={currentFilter} />
        {(this.props.params.piece||(this.props.params.route === "about")) &&   <ShowcaseContainer {...this.props} {...this.state} setIndex={this.setShowcaseIndex} images={Images} />}
        <Gallery params={this.props.params} setFilter={this.setFilter} setShowcaseItem={this.setShowcaseItem} filter={currentFilter} images={visibleImages} />
        <Footer />
        </div>
        )
  }
}

export default Container
