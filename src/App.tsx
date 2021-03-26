import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Servers from "./pages/Servers";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Servers />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
