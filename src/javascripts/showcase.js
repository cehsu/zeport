import React, {Component, PropTypes} from 'react'
import 'stylesheets/modules/gallery'
import 'stylesheets/utilities/clearfix'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.hideDrag = this.hideDrag.bind(this);
  }

  render() {
   if(this.props.showcaseItem !== false){
    const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
    return (
        <div>
          <img onDrag={this.hideDrag} src={image} />
          <div>{this.props.images[this.props.showcaseItem].name}</div>
          </div>
        )
    } else {
      return false;
    }
  }

  hideDrag(event) {
    if(this.props.showcaseItem !== false){
    const image = this.props.images[this.props.showcaseItem].slideshow[this.props.showcaseIndex]
     console.log("dragStart");
     // Set the drag's format and data. Use the event target's id for the data 
     event.dataTransfer.setData("text/plain", event.target.id);
      // Create an image and use it for the drag image
      // NOTE: change "example.gif" to an existing image or the image will not
      // be created and the default drag image will be used.
      var img = new Image(); 
       img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="; 
        event.dataTransfer.setDragImage(img, 100, 100);
      this.props.setIndex(event);
    }
  }


}

export default Showcase
