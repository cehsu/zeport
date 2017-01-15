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
          <Link to='/work' className={'button underline'}>Work</Link>
          <Link to='/about' onClick={()=>this.props.setShowcaseItem(30)} className={'button underline'}>About</Link>
          <div className={'button underline'}>Shop</div>
          </div>
          <div key={0} className={this.props.params.route === 'work' ? 'work button-subbar' : 'button-subbar'}>
          <ReactCSSTransitionGroup style={{width: '100%'}} transitionName='example' transitionEnterTimeout={100} transitionLeaveTimeout={100}>
          {this.props.params.route === 'work' && <div key={1} onClick={()=>this.props.setFilter('All')} className={'button underline filter'}>All</div>}
           {this.props.params.route === 'work' && <div key={2} onClick={()=>this.props.setFilter('Illustration')} className={'button underline filter'}>Illustration</div>}
           {this.props.params.route === 'work' && <div key={3} onClick={()=>this.props.setFilter('Comic')} className={'button underline filter'}>Comic</div>}
           {this.props.params.route === 'work' && <div key={4} onClick={()=>this.props.setFilter('Animation')} className={'button underline filter'}>Animation</div>}
           {this.props.params.route === 'work' && <div key={5} onClick={()=>this.props.setFilter('Design')} className={'button underline filter'}>Design</div>}
           {this.props.params.route === 'work' && <div key={6} onClick={()=>this.props.setFilter('Film')} className={'button underline filter'}>Film</div>}
           {this.props.params.route === 'work' && <div key={7} onClick={()=>this.props.setFilter('Photo')} className={'button underline filter'}>Photo</div>}
          </ReactCSSTransitionGroup>
        </div>
          </div>
      ) 
  }
};
export default ButtonBar
