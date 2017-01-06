import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class ButtonBar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      filterIndex: 0,
      filterOptions: ['All', 'Illustration', 'Animation', 'Design', 'Photo', 'Video']
    };
  }

  render() {

    return (
        <div className={'button-bar'}>
          <div onClick={this.props.setFilter} className={'button touch'}>{this.props.currentFilter}</div>
          <div className={'button intersect'}>About</div>
          <div className={'button underline'}>Shop</div>
        </div>
        )
  }

};
export default ButtonBar
