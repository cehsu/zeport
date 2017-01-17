import React from 'react'
import 'stylesheets/utilities/_reset'
import 'stylesheets/modules/footer'


const Footer = React.createClass({
  render () {
    return (
      <div className={'footer'}>
        <a href='mailto:zesansan@gmail.com?Subject=Hello%20Zejian'>
        zesansan@gmail.com
        </a>
      </div>
    )
  }
})

export default Footer
