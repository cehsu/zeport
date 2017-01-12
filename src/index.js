import 'stylesheets/base'

import React from 'react'
import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom'
import Container from 'javascripts/container'

class App extends React.Component {
  render() {
    return (
        <Router history={ hashHistory }>
          <Route path='/(:route(/:piece))' component={Container}></Route>
          </Router>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('#main'))
