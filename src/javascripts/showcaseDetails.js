import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/showcase'
import 'stylesheets/utilities/clearfix'
  
class ShowcaseDetails extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const { showcaseItem } = this.props;
      const slideshow = showcaseItem.slideshow;
      const landscape = (((showcaseItem.type === 'Animation') || (showcaseItem.type === 'Film'))&&(slideshow[0].indexOf('gif')===-1));
      const {name, year, materials, team, description, client, clients, press} = showcaseItem;
      const allProperties = [];
      allProperties.push(name, year, materials, team, description, client, clients);
      const allDetails = allProperties.filter(function(item, index){ return item;});
      return (
          <div className={ (landscape) ? 'item-details landscape' : 'item-details'}> 
            {allDetails.map(function(detail, index){
              return <div key={index}>{detail}</div>
              })
            }
            {press && <div>Press: {showcaseItem.press.map(function(item, index, collection){
              if(index < (collection.length - 1)){
                return <span key={index}><a href={item[1]}>{item[0]}</a>, </span>
              } else {
                return <span key={index}><a href={item[1]}>{item[0]}</a></span> 
              }
            })}
            </div>}
          </div>
          )
    }
}

export default ShowcaseDetails
