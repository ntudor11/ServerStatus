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
import { signup } from "../utils/axiosUtils";

interface IProps {
  setAuth: Function;
  history: any;
  showNotification: boolean;
  handleNotification: Function;
}

export interface IUserState {
  email: string;
  password: string;
  repeatPassword: string;
  userType: string;
}

const Signup: React.FC<IProps> = (props: IProps) => {
  // hook for user object
  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    userType: "",
  });
  // hook for notification status
  const [reqStatus, setReqStatus] = useState<any>({});
  const { handleNotification, showNotification } = props;

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    } as { [K in keyof IUserState]: IUserState[K] });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { history } = props;
    const { password, repeatPassword } = user;

    if (password === repeatPassword) {
      await signup(user)
        .then(({ data }: { data: any }) => {
          if (data.success) {
            setReqStatus({ error: "Success", success: true });
            handleNotification();
            history.push("/login");
          } else {
            setUser({
              email: "",
              password: "",
              repeatPassword: "",
              userType: "",
            });
          }
        })
        .catch((err: any) => {
          setReqStatus(err.response.data);
          handleNotification();
        });
    } else {
      setReqStatus({
        error: "The passwords you typed do not match.",
        success: false,
      });
      handleNotification();
    }
  };

  // shorthand variable for user types
  const userTypes = ["SysAdmin", "User", "Guest"];
  // map to render radio input fields
  const radioInputs = (array: any) =>
    array.map((item: any) => {
      return (
        <Form.Field
          label={item}
          control="input"
          type="radio"
          name="userType"
          value={item}
          checked={user.userType === item}
          onChange={onChange}
        />
      );
    });

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
            <Header as="h1">Sign Up</Header>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Repeat password"
                  type="password"
                  name="repeatPassword"
                  required
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Group inline grouped>
                <label>User Type</label>
                {radioInputs(userTypes)}
              </Form.Group>
              <Button primary type="submit" fluid>
                Submit
              </Button>
              <MessageNotification
                showNotification={showNotification}
                text={reqStatus?.error ?? ""}
                isNegative={reqStatus.success === false ?? false}
              />
            </Form>
          </Grid.Column>
        </Grid>
        <Grid padded>
          <Grid.Column>
            <p>
              {`Already have an account? `}
              <NavLink to="/login">Log In</NavLink>
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
