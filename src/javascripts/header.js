import React from 'react'
import { Link } from 'react-router';
import ButtonBarComponent from './buttonBar'
import SocialIcon from './socialIcon'
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
   const mobile = (this.props.windowWidth < 780);
   const small = (mobile||this.state.shrink);
   const style = (mobile) ? {padding: '0'} : this.getStyle();
   return (
      <div className={'header-content'}>
      <div className={((this.props.params.route === 'work' && !this.props.params.piece) && small) ? 'work shrink header u-clearfix' : (small) ? 'shrink header u-clearfix' : 'header u-clearfix'} style={style} >
        <div>
          <div className={'button-container title-container'}>
            <Link className={'button title'} to='/'>Zejian Shen</Link>
          </div>
          <ButtonBarComponent route={this.props.route} className={(small) ? 'buttonBar u-clearfix' : 'hidden'}  {...this.props} shrink={small} isHeader={true} />
          </div>
      <div className={'socialButtons'}>
        <div className={'social'} >
          <a href="https://vimeo.com/user424595"> 
            <SocialIcon icon={"vimeo"} />
          </a>
        </div>
        <div className={'social'} > 
					<a href="https://www.instagram.com/kingsansan/">
					  <SocialIcon icon={"instagram"} />			
          </a>
        </div>
        <div className={'social mail'} >
					<a href="mailto:zesansan@gmail.com">	
				 	  <SocialIcon icon={"email"} />
          </a>
        </div>
      	</div>
      </div>
      <ButtonBarComponent route={this.props.route} {...this.props} shrink={small} isHeader={false} />
      </div>
    )
 }

 componentDidMount() {
   window.addEventListener('scroll', this.toggleShrink);
 }

 componentWillUnmount() {
   window.removeEventListener('scroll', this.toggleShrink);
 }

 getStyle() {
   return {
     padding: (this.state.shrink || (this.props.windowWidth < 780)) ? '0' : ((window.document.body.scrollTop < 200) && (window.document.body.scrollTop > 150)) ? 200 - window.document.body.scrollTop + 'px 0 10px': '50px 0 10px' 
   };
 }
  
 toggleShrink() {
      const shouldShrink = window.document.body.scrollTop >= 200;
      if(shouldShrink) {
        this.setState({shrink: true});
      } else {
        this.setState({shrink: false});
      }
    }
}

export default Header
