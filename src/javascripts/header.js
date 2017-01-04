import React from 'react'

import 'stylesheets/modules/header'
import 'stylesheets/utilities/clearfix'

const Header = React.createClass({
  getInitialState: function() {
    return {shrink: false}
  },
  render () {
    return (
      <div className={this.state.shrink ? 'shrink header u-clearfix' : 'header u-clearfix'}>
        <div className={this.state.shrink ? 'smaller header-content u-clearfix': 'header-content u-clearfix'}>Header</div>
      </div>
    )
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll: function(event) {
    if(window.document.body.scrollTop>100){
      this.setState({shrink: true});
    } else {
      this.setState({shrink: false});
    }
  }
})

export default Header
