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
            if(nextState.params.piece) {
              window.scroll(0, 330);
            }
            if(nextState.params.route === "about") {
              window.scroll(0,250);
            }
          }}
          path='/(:route(/:piece(/:number)))' 
          component={Container}
          >
          </Route>
          </Router>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('#main'))
