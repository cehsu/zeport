import React, {Component, PropTypes} from 'react'
import { Router, Route, Link, hashHistory } from 'react-router';
import 'stylesheets/modules/buttonbar'
import 'stylesheets/utilities/clearfix'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isHidden = !(this.props.isHeader && this.props.shrink || !this.props.isHeader && !this.props.shrink);
    return (
        <div className={isHidden ? 'hidden button-bar': this.props.isHeader ? 'header-bar' : 'button-bar'}>
          <Link to='/work' className={'button touch'}>Work</Link>
          <Link to='/about' className={'button intersect'}>About</Link>
          <div className={'button underline'}>Shop</div>
          <div>
          {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('All')} className={'button touch filter'}>All</div>}
           {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('Illustration')} className={'button touch filter'}>Illustration</div>}
           {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('Comic')} className={'button touch filter'}>Comic</div>}
           {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('Animation')} className={'button touch filter'}>Animation</div>}
           {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('Film')} className={'button touch filter'}>Film</div>}
           {this.props.params.route === 'work' && <div onClick={()=>this.props.setFilter('Photo')} className={'button touch filter'}>Photo</div>}
          </div>
        </div>
      ) 
  }
};
export default ButtonBar
