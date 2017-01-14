import React, {Component, PropTypes} from 'react'
import { Router, Route, Link, hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
          <div className={'button-container'}>
          <Link to='/work' className={'button touch'}>Work</Link>
          <Link to='/about' className={'button intersect'}>About</Link>
          <div className={'button underline'}>Shop</div>
          </div>
          <div key={0} className={this.props.params.route === 'work' ? 'work button-subbar' : 'button-subbar'}>
          <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={700} transitionLeaveTimeout={100}>
          {this.props.params.route === 'work' && <div key={1} onClick={()=>this.props.setFilter('All')} className={'button touch filter'}>All</div>}
           {this.props.params.route === 'work' && <div key={2} onClick={()=>this.props.setFilter('Illustration')} className={'button touch filter'}>Illustration</div>}
           {this.props.params.route === 'work' && <div key={3} onClick={()=>this.props.setFilter('Comic')} className={'button touch filter'}>Comic</div>}
           {this.props.params.route === 'work' && <div key={4} onClick={()=>this.props.setFilter('Animation')} className={'button touch filter'}>Animation</div>}
           {this.props.params.route === 'work' && <div key={5} onClick={()=>this.props.setFilter('Design')} className={'button touch filter'}>Design</div>}
           {this.props.params.route === 'work' && <div key={6} onClick={()=>this.props.setFilter('Film')} className={'button touch filter'}>Film</div>}
           {this.props.params.route === 'work' && <div key={7} onClick={()=>this.props.setFilter('Photo')} className={'button touch filter'}>Photo</div>}
          </ReactCSSTransitionGroup>
        </div>
          </div>
      ) 
  }
};
export default ButtonBar
