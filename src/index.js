import 'stylesheets/base'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'
import Container from 'javascripts/container'
import  ReactGA from 'react-ga'

ReactGA.initialize('UA-93029761-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class App extends React.Component {
  render() {
    return (
        <Router  history={ hashHistory }>
        <Route 
	onUpdate={logPageView}
        onChange={(prevState, nextState) => {
          var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
          var h = window.scrollY;
          if((w < 700) && (h > 70)){
            if(nextState.params.piece) {
              var interval = ((h - 70)/ 10);
              var smooth = setInterval(function(){
                if(h>71) {
                  h-=interval;
                    window.scroll(0, h);
                } else {
                  clearInterval(smooth);
                }
              }, 25);
            }
            if(nextState.params.route === "about") {
              var interval = ((h-50)/10);
              var smooth = setInterval(function(){
                if(h>71) {
                  h-=interval;
                  window.scroll(0, h);
                } else {
                  clearInterval(smooth);
                }
              }, 25);
            }
          } else if (w > 700) {
            if(nextState.params.piece) {
              var interval = ((h - 200)/10);
              var smooth = setInterval(function(){
                if(h > 200) {
                  h-=interval;
                  window.scroll(0, h);
                } else {
                  clearInterval(smooth);
                }
              }, 25);
            }
            if(nextState.params.route === "about") {
              var interval = ((h-200)/10);
              var smooth = setInterval(function(){
                if(h > 200) {
                  h-=interval;
                  window.scroll(0,h);
                } else {
                  clearInterval(smooth);
                }
              }, 25);
            }
          }
        }
        }
        path='/(:route(/:piece(/:number)))' 
          component={Container}
        >
          </Route>
          </Router>
          );
        }
  }

  ReactDOM.render(<App />, document.querySelector('#main'))
