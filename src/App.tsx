import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Servers from "./pages/Servers";
import ServerView from "./pages/ServerView";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    // fetch authentication status and store in hook if user is authenticated
    fetch(`/api/checkToken`)
      .then((res: Response) => res.status === 200 && setIsAuth(true))
      .catch((error) => console.log(error));
  }, []);

  // wrap route within private container
  const PrivateRoute: React.FC<any> = ({
    comp: Component,
    ...rest
  }: {
    comp: any;
  }) => (
    <Route
      {...rest}
      render={(props) =>
        // render component if user is authenticated
        isAuth ? <Component {...props} /> : <p>401 Unauthorized</p>
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Servers />} />
          <PrivateRoute
            exact
            path="/server/:serverId"
            comp={(props: any) => <ServerView {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
