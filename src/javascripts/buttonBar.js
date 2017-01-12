import React, {Component, PropTypes} from 'react'
import { Router, Route, Link, hashHistory } from 'react-router';
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props);
    const isHidden = !(this.props.isHeader && this.props.shrink || !this.props.isHeader && !this.props.shrink);
    return (
        <div className={isHidden ? 'hidden button-bar': this.props.isHeader ? 'header-bar' : 'button-bar'}>
          <Link to='/work' className={'button touch'}>Work</Link>
          {this.props.route === 'work' && <div onClick={this.props.setFilter} className={'button touch'}>{this.props.filter}</div>}
          <Link to='/about' className={'button intersect'}>About</Link>
          <div className={'button underline'}>Shop</div>
        </div>
      ) 
  }
};
export default ButtonBar
