import React, { useState } from "react";
import { Button, Container, Form, Header, Image } from "semantic-ui-react";
import ManServer from "../images/man-server.svg";
import { login } from "../utils/axiosUtils";

interface IProps {
  setAuth: Function;
  history: any;
}

export interface IUserState {
  email: string;
  password: string;
}

const Login: React.FC<IProps> = (props: IProps) => {
  const [user, setUser] = useState({ email: "", password: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    } as { [K in keyof IUserState]: IUserState[K] });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { history, setAuth } = props;
    await login(user)
      .then(({ data }: { data: any }) => {
        if (data.success) {
          setAuth(true);
          history.push("/");
        } else {
          setUser({ email: "", password: "" });
        }
      })
      .catch((err: any) => console.log("err is", err.response.data));
  };

  return (
    <div>
      <Container>
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
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
