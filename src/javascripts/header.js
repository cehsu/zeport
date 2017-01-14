import React from 'react'
import { Link } from 'react-router';
import ButtonBarComponent from './buttonBar'
import 'stylesheets/modules/header'
import 'stylesheets/utilities/clearfix'
import 'stylesheets/modules/gallery'

class Header extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     shrink: false
   }
   this.toggleShrink = this.toggleShrink.bind(this);
 }
  
 render() {
   return (
      <div>
      <div className={(this.props.params.route === 'work' && this.state.shrink) ? 'work shrink header u-clearfix' : (this.state.shrink) ? 'shrink header u-clearfix' : 'header u-clearfix'}>
        <div className={'header-content u-clearfix'}>
          <div className={'title'}>
            <Link className={'title-content'} to='/'>Zejian Shen</Link>
          </div>
          <ButtonBarComponent route={this.props.route} className={this.state.shrink ? 'buttonBar u-clearfix' : 'hidden'}  {...this.props} shrink={this.state.shrink} isHeader={true} />
          </div>
      <div className={'socialButtons'}>
          <a href='www.facebook.com/zesansan' className="social facebook">Facebook</a>
          <a href='www.instagram.com/zesansan' className="social instagram">Instagram</a>
          <a href='www.tumblr.com/kingsansan' className="social tumblr">Tumblr</a>
      </div>
          </div>
      <ButtonBarComponent route={this.props.route} {...this.props} shrink={this.state.shrink} isHeader={false} />
      </div>
    )
 }

 componentDidMount() {
   window.addEventListener('scroll', this.toggleShrink);
 }

 componentWillUnmount() {
   window.removeEventListener('scroll', this.toggleShrink);
 }

 toggleShrink() {
   const shouldShrink = window.document.body.scrollTop > 170;
   if(shouldShrink) {
     this.setState({shrink: true});
   } else {
     this.setState({shrink: false});
   }
 }
}

export default Header
