import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logout } from "../utils/axiosUtils";

const NavBar = (props: any) => {
  const { isAuth, setIsAuth } = props;

  const logOut = (e: any) => {
    e.preventDefault();
    const { history } = props;
    logout();
    setIsAuth(false);
    history.push(`/`);
  };

  return (
    <Menu size="huge" pointing secondary id="navBar">
      <Menu.Item as={NavLink} exact to="/" name="home" />

      {isAuth && (
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logOut} />
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default withRouter(NavBar);
