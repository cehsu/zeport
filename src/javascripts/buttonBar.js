import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    const isHidden = !(this.props.isHeader && this.props.shrink || !this.props.isHeader && !this.props.shrink);
    return (
        <div className={isHidden ? 'hidden button-bar': this.props.isHeader ? 'header-bar' : 'button-bar'}>
          <div onClick={this.props.setFilter} className={'button touch'}>{this.props.filter}</div>
          <div className={'button intersect'}>About</div>
          <div className={'button underline'}>Shop</div>
        </div>
      ) 
  }
};
export default ButtonBar
