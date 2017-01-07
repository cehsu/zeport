import React from 'react'
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
      <div className={this.state.shrink ? 'shrink header u-clearfix' : 'header u-clearfix'}>
        <div className={'header-content u-clearfix'}>
          <div className={'title'} >Zejian Shen</div>
          <ButtonBarComponent className={this.state.shrink ? 'buttonBar u-clearfix' : 'hidden'}  {...this.props} shrink={this.state.shrink} isHeader={true} />
          </div>
      <div className={'socialButtons'}>
      <i className="fa fa-instagram" aria-hidden="true"></i>
      </div>
          </div>
      <ButtonBarComponent {...this.props} shrink={this.state.shrink} isHeader={false} />
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
   const shouldShrink = window.document.body.scrollTop > 130;
   if(shouldShrink) {
     this.setState({shrink: true});
   } else {
     this.setState({shrink: false});
   }
 }
}

export default Header
