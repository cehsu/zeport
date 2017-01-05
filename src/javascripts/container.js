import React from 'react'
import Header from 'javascripts/header'
import Footer from 'javascripts/footer'
import Gallery from 'javascripts/gallery'

import 'stylesheets/modules/container'

const Container = React.createClass({
  render () {
    return (
      <div className='container'>
        <Header />
        <Gallery />
        <Footer />
      </div>
    )
  }
})

export default Container
