import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Servers from "./pages/Servers";
import ServerView from "./pages/ServerView";
import NavBar from "./components/NavBar";
import { NotAuthorized, NotFound } from "./components/ErrorPages";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  // reusable notification boolean
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    // fetch authentication status and store in hook if user is authenticated
    fetch(`/api/checkToken`)
      .then((res: Response) => res.status === 200 && setIsAuth(true))
      .catch((error) => console.log(error));
  }, []);

  // notification trigger
  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

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
        isAuth ? <Component {...props} /> : <NotAuthorized />
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Switch>
          {!isAuth ? (
            <>
              <Route
                exact
                path={["/", "/login"]}
                render={(props: any) => (
                  <Login
                    {...props}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    showNotification={showNotification}
                    handleNotification={handleNotification}
                  />
                )}
              />

              <Route
                exact
                path="/signup"
                render={(props: any) => (
                  <Signup
                    {...props}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    showNotification={showNotification}
                    handleNotification={handleNotification}
                  />
                )}
              />
            </>
          ) : (
            <PrivateRoute exact path="/" comp={() => <Servers />} />
          )}
          <PrivateRoute
            exact
            path="/server/:serverId"
            comp={(props: any) => (
              <ServerView
                {...props}
                showNotification={showNotification}
                handleNotification={handleNotification}
              />
            )}
          />
          {/* empty route for 404 page */}
          <Route exact render={() => <NotFound />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
