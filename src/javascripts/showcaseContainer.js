import React, {Component, PropTypes} from 'react'
import Showcase from 'javascripts/showcase'
import ShowcaseSlider from 'javascripts/showcaseSlider'
import ShowcaseDetails from 'javascripts/showcaseDetails'
import {setItem} from 'javascripts/showcase-functions'

class ShowcaseContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sliding: false,
			transition: '0.5s'
		};
		this.setIndex = this.setIndex.bind(this);
		this.incrementIndex = this.incrementIndex.bind(this);
		this.decrementIndex = this.decrementIndex.bind(this);
	}

	render() {
                const xOffset = -200 - (100*(this.props.params.number - 1));
		const showcaseNumber = (this.props.params.piece) ? (+this.props.params.piece + 1) : 0;
		const showcaseItem = this.props.images[showcaseNumber];
		const dimensions = showcaseItem.dimensions;
		const windowWidth = this.props.windowWidth;
		const showcaseIndex = (this.props.params.number) ? this.props.params.number - 1 : 0;
		const iframeWidth = (windowWidth < 640) ? "100%" : "640px";
		const iframeHeight = (windowWidth < 650) ? (windowWidth/640)* 340+"px" : "340px";
		const {itemHeight,itemWidth} = setItem(windowWidth, showcaseIndex, dimensions);
		const {setIndex, incrementIndex, decrementIndex} = this;

		return (
				<div className={'showcase-container'}>
				  <Showcase {...this.props} {...this.state} setIndex={setIndex} incrementIndex={incrementIndex} decrementIndex={decrementIndex} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex} iframeWidth={iframeWidth} iframeHeight={iframeHeight} itemHeight={itemHeight} itemWidth={itemWidth} />
				  <ShowcaseSlider {...this.props} {...this.state} xOffset={xOffset} setIndex={setIndex} incrementIndex={incrementIndex} decrementIndex={decrementIndex} showcaseNumber={showcaseNumber} showcaseIndex={showcaseIndex}/>
          <ShowcaseDetails showcaseItem={showcaseItem} />
				</div>)   
	}

	setIndex(newIndex, oldIndex, length) {
		if (!this.state.sliding){
			this.setState({sliding: true});
			if((newIndex - oldIndex) > 3){
				const tx = this.state.xOffset + ((oldIndex + (length - newIndex))*100);
				this.setState({xOffset: tx});
				if (this.state.xOffset > -300){
					setTimeout(
							function(){
								this.setState({transition: '0s', xOffset: this.state.xOffset - (length * 100)});
							}.bind(this), 550);
					setTimeout(
							function(){
								this.setState({transition: '0.5s', sliding: false});
							}.bind(this), 590);
				}
			} else if ((oldIndex - newIndex) > 3) {
				const tx = this.state.xOffset - ((newIndex + (length - oldIndex))*100);
				this.setState({xOffset: tx});
				if (this.state.xOffset < -200){
					setTimeout(
							function(){
								this.setState({transition: '0s', xOffset: this.state.xOffset + (length * 100)});
							}.bind(this), 550);
					setTimeout(
							function(){
								this.setState({transition: '0.5s', sliding: false});
							}.bind(this), 590);
				}
			} else {
				const tx = this.state.xOffset + ((oldIndex  - newIndex)*100);
				this.setState({xOffset: tx, sliding: false});
			}
		}
		setTimeout(function(){
			this.props.router.push('work/'+this.props.params.piece+'/'+(newIndex+1));
		}.bind(this),600);
	}

	incrementIndex(currentIndex, length) {
		const newIndex = (currentIndex === length - 1) ? 0 : (currentIndex + 1)
			const oldIndex = currentIndex;
		this.setIndex(newIndex, oldIndex, length);
	}

	decrementIndex(currentIndex, length) {
		const newIndex = (currentIndex  === 0) ? (length - 1) : (currentIndex - 1);
		const oldIndex = currentIndex;
		this.setIndex(newIndex, oldIndex, length);
	}
}

export default ShowcaseContainer
