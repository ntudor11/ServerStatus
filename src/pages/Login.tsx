import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Image,
} from "semantic-ui-react";
import MessageNotification from "../components/MessageNotification";
import ManServer from "../images/man-server.svg";
import { login } from "../utils/axiosUtils";

interface IProps {
  setIsAuth: Function;
  history: any;
  showNotification: boolean;
  handleNotification: Function;
}

export interface IUserState {
  email: string;
  password: string;
}

const Login: React.FC<IProps> = (props: IProps) => {
  // hook for user object
  const [user, setUser] = useState({ email: "", password: "" });
  // hook for notification status
  const [reqStatus, setReqStatus] = useState<any>({});
  const { handleNotification, showNotification } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    } as { [K in keyof IUserState]: IUserState[K] });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { history, setIsAuth } = props;
    await login(user)
      .then(({ data }: { data: any }) => {
        if (data.success) {
          setIsAuth(true);
          history.push("/servers");
        } else {
          setUser({ email: "", password: "" });
        }
      })
      .catch((err: any) => {
        setReqStatus({ ...err.response?.data, success: false });
        handleNotification();
      });
  };

  return (
    <div>
      <Container text>
        <Grid padded>
          <Grid.Column>
            <Image
              src={ManServer}
              size="large"
              centered
              className="mainServersImg"
            />
            <Header as="h1">Log In</Header>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={onChange}
                />
              </Form.Field>
              <Button primary type="submit" fluid>
                Submit
              </Button>
              <MessageNotification
                showNotification={showNotification}
                text={reqStatus?.error ?? ""}
                isNegative={reqStatus?.success === false ?? false}
              />
            </Form>
          </Grid.Column>
        </Grid>
        <Grid padded>
          <Grid.Column>
            <p>
              {`Don't have an account yet? `}
              <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
