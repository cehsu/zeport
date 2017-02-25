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
      windowWidth: 0,
      xOffset: (this.windowWidth > 700) ? -200 : -400
    } 
    this.setFilter = this.setFilter.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setOffset = this.setOffset.bind(this);
}

  setOffset(newOffset) {
    this.setState({xOffset: newOffset});
  }

  setFilter(newFilter) {
    this.setState({filter: newFilter});
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
        <Header windowWidth={this.state.windowWidth} params={this.props.params} setFilter={this.setFilter} filter={currentFilter} />
        {(this.props.params.piece||(this.props.params.route === "about")) &&   <ShowcaseContainer {...this.props} {...this.state} setOffset={this.setOffset} images={Images} />}
        <Gallery params={this.props.params} setOffset={this.setOffset} setFilter={this.setFilter} filter={currentFilter} images={visibleImages} windowWidth={this.state.windowWidth}/>
        <Footer />
        </div>
        )
  }
}

export default Container
