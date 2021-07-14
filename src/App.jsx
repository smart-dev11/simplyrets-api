import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import PropertiesList from './page/PropertiesList';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/list" component={PropertiesList} />
        <Route path="*" render={() => <Redirect to="/list" />} />
      </Switch>
    </Router>
  )
}
