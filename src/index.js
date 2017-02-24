import 'stylesheets/base'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom'
import Container from 'javascripts/container'

class App extends React.Component {
  render() {
    return (
        <Router  history={ hashHistory }>
        <Route 
        onChange={(prevState, nextState) => {
          var w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
          var h = window.scrollY;
          if((w < 700) && (h > 60)){
            if(nextState.params.piece) {
              var interval = ((h -60)/ 10);
              var smooth = setInterval(function(){
                if(h>10) {
                  h-=interval
                    window.scroll(0, h);
                } else {
                  clearInterval(smooth);
                }
              }, 25);
            }
            if(nextState.params.route === "about") {
              var interval = ((h-5)/10);
              var smooth = setInterval(function(){
                if(h>10) {
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
