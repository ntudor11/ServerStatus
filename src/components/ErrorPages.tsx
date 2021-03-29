import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Grid, Header, Image } from "semantic-ui-react";
import NotAuthImg from "../images/not-authorized.svg";
import NotFoundImg from "../images/not-found.svg";

const ErrorPageTemplate = (props: any) => {
  const { image, header, text, buttonText, buttonTo } = props;
  return (
    <div>
      <Container>
        <Image src={image} size="large" centered className="mainServersImg" />
        <Header as="h1">{header}</Header>
        <p>{text}</p>
        <Grid columns={2}>
          <Grid.Column>
            <Button basic primary as={NavLink} to={buttonTo}>
              {buttonText}
            </Button>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export const NotFound: React.FC = () => {
  return (
    <ErrorPageTemplate
      image={NotFoundImg}
      header="Not Found"
      text={`There is nothing to display here, at the moment (yet). Go back to safety.`}
      buttonText="Go back"
      buttonTo="/"
    />
  );
};

export const NotAuthorized: React.FC = () => {
  return (
    <ErrorPageTemplate
      image={NotAuthImg}
      header="401 Unauthorized"
      text={`It seems that you are not allowed to view this page. Login as{" "}<code>SysAdmin</code> in order to access it.`}
      buttonText="Log in"
      buttonTo="/"
    />
  );
};
