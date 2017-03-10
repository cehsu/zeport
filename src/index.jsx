import 'stylesheets/base';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Container from 'javascripts/container';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-93029761-1');

function logPageView() {
  ReactGA.set({ page: window.location.hash });
  ReactGA.pageview(window.location.hash);
};

const App = () => {
    return (
        <Router  history={ hashHistory }>
          <Route
            onUpdate={logPageView}
            onChange={(prevState, nextState) => {
              const w = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
              let h = window.scrollY;
              if ((w < 700) && (h > 70)) {
                if (nextState.params.piece) {
                  const interval = ((h - 70) / 10);
                  const smooth = setInterval(() => {
                    if (h > 71) {
                      h -= interval;
                      window.scroll(0, h);
                    } else {
                      clearInterval(smooth);
                    }
                  }, 25);
                }
                if (nextState.params.route === 'about') {
                  const interval = ((h - 50) / 10);
                  const smooth = setInterval(() => {
                    if (h > 71) {
                      h -= interval;
                      window.scroll(0, h);
                    } else {
                      clearInterval(smooth);
                    }
                  }, 25);
                }
              } else if (w > 700) {
                if (nextState.params.piece) {
                  const interval = ((h - 200) / 10);
                  const smooth = setInterval(() => {
                    if (h > 200) {
                      h -= interval;
                      window.scroll(0, h);
                    } else {
                      clearInterval(smooth);
                    }
                  }, 25);
                }
                if (nextState.params.route === 'about') {
                  const interval = ((h - 200) / 10);
                  const smooth = setInterval(() => {
                    if (h > 200) {
                      h -= interval;
                      window.scroll(0, h);
                    } else {
                      clearInterval(smooth);
                    }
                  }, 25);
                }
              }
            }
          }
            path="/(:route(/:piece(/:number)))"
            component={Container}
          >
          </Route>
        </Router>
    );
}

ReactDOM.render(<App />, document.querySelector('#main'));
