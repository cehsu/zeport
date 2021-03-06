import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'stylesheets/modules/buttonbar';
import 'stylesheets/utilities/clearfix';


class ButtonBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isHidden = !((this.props.isHeader && this.props.shrink) || (!this.props.isHeader && !this.props.shrink));
    return (
      <div className={isHidden ? 'hidden button-bar' : this.props.isHeader ? 'header-bar' : 'button-bar'}>
        <div className={'button-container'}>
          <Link to="/work" className={(this.props.params.route === 'work') ? 'active-route button underline' : 'button underline'}>Work</Link>
          <Link to="/about" onClick={() => { this.props.setFilter('All'); }} className={(this.props.params.route === 'about') ? 'active-route button underline' : 'button underline'}>About</Link>
          <a href="http://zesansan.bigcartel.com/"><div className={'button underline'}>Shop</div></a>
        </div>
        <div key={0} className={(((this.props.params.route === 'work') && (!this.props.params.piece)) && !(this.props.isHeader)) ? 'work button-subbar' : 'button-subbar'}>
          <ReactCSSTransitionGroup style={{ width: '100%' }} transitionName="example" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={1} onClick={() => this.props.setFilter('All')} className={(this.props.filter === 'All') ? 'active-route button underline filter' : 'button underline filter'}>All</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={2} onClick={() => this.props.setFilter('Illustration')} className={(this.props.filter === 'Illustration') ? 'active-route button underline filter' : 'button underline filter'}>Illustration</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={3} onClick={() => this.props.setFilter('Comic')} className={(this.props.filter === 'Comic') ? 'active-route button underline filter' : 'button underline filter'}>Comic</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={4} onClick={() => this.props.setFilter('Animation')} className={(this.props.filter === 'Animation') ? 'active-route button underline filter' : 'button underline filter'}>Animation</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={5} onClick={() => this.props.setFilter('Design')} className={(this.props.filter === 'Design') ? 'active-route button underline filter' : 'button underline filter'}>Design</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={6} onClick={() => this.props.setFilter('Video')} className={(this.props.filter === 'Video') ? 'active-route button underline filter' : 'button underline filter'}>Video</div>}
            {(this.props.params.route === 'work' && !this.props.params.piece) && <div key={7} onClick={() => this.props.setFilter('Photography')} className={(this.props.filter === 'Photography') ? 'active-route button underline filter' : 'button underline filter'}>Photo</div>}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

ButtonBar.propTypes = {
  filter: React.PropTypes.string.isRequired,
  isHeader: React.PropTypes.bool.isRequired,
  params: React.PropTypes.object,
  setFilter: React.PropTypes.func.isRequired,
  shrink: React.PropTypes.bool.isRequired,
};

export default ButtonBar;
